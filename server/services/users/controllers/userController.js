const { hash } = require("../helpers/bcrypt");
const User = require("../models/user");

class Controller {
  static async findAll(req, res, next) {
    try {
      const users = await User.findAll(req.db);
      res.status(200).json(users);
    } catch (error) {
      console.log(error, "errornya");
      next(error);
    }
  }

  static async addUser(req, res, next) {
    try {
      const { username, email, role, phoneNumber, address } = req.body;
      let { password } = req.body;
      password = hash(password);
      const user = await User.insertOne({
        username,
        email,
        password,
        role,
        phoneNumber,
        address,
      });
      res.status(201).json({ username: username, email: email });
    } catch (error) {
      next(error);
    }
  }

  static async findOne(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findOne(id);
      if (!user) {
        throw { name: `data not found` };
      }
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findOne(id);
      if (!user) {
        throw { name: `data not found` };
      }
      await User.delete(id);
      res.status(200).json({ message: `User with Id ${id} success to delete` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
