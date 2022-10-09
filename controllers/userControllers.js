const db = require("../services");

class UserController {
  async addUser(req, res) {
    const user = await db.createUser(req.body);
    res.status(201);
    res.json({ message: "success", user });
  }

  async login(req, res) {
    const { email, password } = req.body;
    const { user, token } = await db.login(email, password);
    res.json({ user, token });
  }

  async logout(req, res) {
    res.json({ message: "success" });
  }

  async getUser(req, res) {
    const { id } = req.params;
    const user = await db.getUser(id);
    res.json({ user });
  }

  async updateUser(req, res) {
    const { id } = req.params;

    const user = await db.updateUser(id, req.body);
    res.json({ message: "success", user });
  }
}

module.exports = new UserController();
