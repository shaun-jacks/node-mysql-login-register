const { User } = require("../../../models/index");
const request = require("supertest");

let server;

describe("api/users", () => {
  beforeEach(async () => {
    server = await require("../../../server");
  });
  afterEach(async () => {
    await server.close();
  });

  describe("POST /", () => {
    it("Should respond with 400 if input form validation fails", async () => {
      reqBody = {
        username: "test0",
        email: "invalidEmail",
        password: "invalidPass"
      };
      const res = await request(server)
        .post("/api/users")
        .send(reqBody);
      expect(res.status).toBe(400);
    });

    it("Should respond with 400 if user already exists in db", async () => {
      let userBody = {
        username: "test1",
        email: "test@gmail.com",
        password: "Test12345!"
      };
      // Create new user
      const user = await User.create(userBody);
      // Create user that already exists
      const res = await request(server)
        .post("/api/users")
        .send(userBody);
      // Respond with Error
      expect(res.status).toBe(400);

      try {
        await User.destroy({
          force: true,
          where: {
            id: user.id
          }
        });
      } catch (err) {
        console.log("Error after deleting test user object: ", err);
      }
    });

    it("Should create a new user upon successful registration", async () => {
      const res = await request(server)
        .post("/api/users")
        .send({
          username: "test2",
          email: "test2@gmail.com",
          password: "Test12345!"
        });

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        username: "test2",
        email: "test2@gmail.com"
      });
      // Deleted test created instance from test db
      try {
        await User.destroy({
          force: true,
          where: res.body
        });
      } catch (err) {
        console.log("Error after deleting test user object: ", err);
      }
    });
  });
});
