const jwt = require("jsonwebtoken");
const db = require("../../../models/index");

describe("user.generateAuthToken", () => {
  it("should return a valid JWT", async () => {
    // Create new user
    const user = await db.User.create({
      username: "testuser",
      email: "testemail",
      password: "testpass"
    });
    const payload = { id: user.id, username: user.username };
    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, process.env.jwtPrivateKey);
    expect(decoded).toMatchObject(payload);
    await user.destroy({ force: true });
  });
});
