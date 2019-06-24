// // TODO: Test auth middleware
const { User } = require("../../../models/index");
const auth = require("../../../middleware/auth");

describe("auth middleware", () => {
  it("should populate req.user with payload of JWT", async () => {
    // Create new user
    const user = await User.build({
      username: "testuser",
      email: "testemail",
      password: "testpass"
    });
    const payload = { id: user.id, username: user.username };
    const token = user.generateAuthToken();
    const req = {
      header: jest.fn().mockReturnValue(token)
    };
    const res = {};
    const next = jest.fn();
    auth(req, res, next);
    expect(req.user).toMatchObject(payload);
  });
});
