const db = require("../services");

class UserController {
  async addUser(req, res) {
    const user = await db.add(req.body);
    res.json({ message: "success", user });
  }

  async login(req, res) {
    const { email, password } = req.body;
    const token = await db.login(email, password);

    res.json({ token });
  }

  async getUser(req, res) {
    const { id } = req.params;
    const user = await db.getUser(id);
    res.json({ user });
  }

  async updateUser(req, res) {
    const { id } = req.params;

    const user = await db.updateUser(id, req.body);
    res.json({ message: "updated", user });
  }
}

module.exports = new UserController();
