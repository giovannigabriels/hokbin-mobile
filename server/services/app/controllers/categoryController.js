const { Category } = require("../models");

class Controller {
  static async getCategory(req, res, next) {
    try {
      const data = await Category.findAll();
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json(`internal server error`);
    }
  }

  static async addCategory(req, res, next) {
    try {
      const { name } = req.body;
      const category = await Category.create({
        name,
      });
      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      let id = +req.params.id;
      const category = await Category.findOne({
        where: {
          id,
        },
      });
      if (!category) {
        throw { name: "data not found" };
      }
      await Category.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({ message: `${category.name} success to delete` });
    } catch (error) {
      next(error);
    }
  }

  static async getOneCategory(req, res, next) {
    try {
      let id = +req.params.id;
      const data = await Category.findOne({
        where: {
          id,
        },
      });
      if (!data) {
        throw { name: "data not found" };
      }
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async updateCategory(req, res, next) {
    try {
      const id = req.params.id;
      const { name } = req.body;
      const item = await Category.findOne({ where: { id } });
      if (!item) {
        throw { name: "data not found" };
      }
      await Category.update({ name }, { where: { id } });
      res.status(200).json({ message: `${item.name} has been updated` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
