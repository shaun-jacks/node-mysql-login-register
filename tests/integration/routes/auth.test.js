const { User } = require("../../../models/index");
const request = require("supertest");
const bcrypt = require("bcryptjs");

let server;

describe("api/auth", () => {
  beforeEach(async () => {
    server = await require("../../../server");
  });
  afterEach(async () => {
    await server.close();
  });

  describe("POST /", () => {
    it("Should respond with 400 if input form validation fails", async () => {
      reqBody = {
        email: "invalidEmail",
        password: "invalidPass"
      };
      const res = await request(server)
        .post("/api/auth")
        .send(reqBody);

      expect(res.status).toBe(400);
    });

    it("Should respond with 400 if user does not exist", async () => {
      // Now login with non existent user
      const res = await request(server)
        .post("/api/auth")
        .send({
          email: "testNonExistentUser",
          password: "Testing12345!"
        });

      expect(res.status).toBe(400);
    });

    it("Should respond with 400 if invalid password", async () => {
      // Create user in test database to test invalid username or pass
      let user = await User.build({
        username: "testLoginUserPassInvalid",
        email: "testLoginUserPassInvalid@gmail.com",
        password: "Testing12345!"
      });
      // Hash password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      user = await user.save();

      // Now use invalid login credentials
      const res = await request(server)
        .post("/api/auth")
        .send({
          email: user.username,
          password: "Testing123456!"
        });

      await user.destroy({ force: true });

      expect(res.status).toBe(400);
    });

    it("Should respond with 200 login successful", async () => {
      // Create user in test database to test for successful login
      let user = await User.build({
        username: "testLoginSuccess",
        email: "testLoginSuccess@gmail.com",
        password: "Testing12345!"
      });
      // Hash password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);

      user = await user.save();

      // Now call login api to simulate successful login
      const res = await request(server)
        .post("/api/auth")
        .send({
          email: user.email,
          password: "Testing12345!"
        });

      expect(res.status).toBe(200);

      await user.destroy({ force: true });
    });
  });
});
