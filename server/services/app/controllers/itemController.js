const { Item, Category, User, sequelize, Ingredients } = require("../models");

class Controller {
  static async getItem(req, res, next) {
    try {
      const { recommend } = req.query;
      let option = { include: [Category, Ingredients] };
      if (recommend !== "" && typeof recommend !== "undefined") {
        option.where = {
          isRecommended: recommend,
        };
      }
      const data = await Item.findAll(option);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getOneItem(req, res, next) {
    try {
      let id = +req.params.id;
      const data = await Item.findOne({
        where: {
          id,
        },
        include: [Ingredients, Category],
      });
      if (!data) {
        throw { name: "data not found" };
      }
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async addItem(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const {
        name,
        description,
        price,
        imgUrl,
        categoryId,
        userMongoId,
        ingredients1,
        ingredients2,
        ingredients3,
        ingredients4,
        ingredients5,
      } = req.body;
      const item = await Item.create(
        {
          name,
          description,
          price,
          imgUrl,
          authorId: 1,
          userMongoId,
          categoryId,
        },
        { transaction: t }
      );

      const bulk = [
        {
          itemId: item.id,
          name: ingredients1,
        },
      ];

      ingredients2 ? bulk.push({ itemId: item.id, name: ingredients2 }) : "";
      ingredients3 ? bulk.push({ itemId: item.id, name: ingredients3 }) : "";
      ingredients4 ? bulk.push({ itemId: item.id, name: ingredients4 }) : "";
      ingredients5 ? bulk.push({ itemId: item.id, name: ingredients5 }) : "";
      await Ingredients.bulkCreate(bulk, { transaction: t });

      await t.commit();
      res.status(201).json(item);
    } catch (error) {
      console.log(error);
      await t.rollback();
      next(error);
    }
  }

  static async deleteItem(req, res, next) {
    try {
      let id = +req.params.id;
      const item = await Item.findOne({
        where: {
          id,
        },
      });
      if (!item) {
        throw { name: "data not found" };
      }
      await Item.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({ message: `${item.name} success to delete` });
    } catch (error) {
      next(error);
    }
  }

  static async updateItem(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const id = req.params.id;
      const { name, description, price, imgUrl, categoryId, isRecommended } =
        req.body;
      const item = await Item.findOne({ where: { id } }, { transaction: t });
      if (!item) {
        throw { name: "data not found" };
      }
      await Item.update(
        { name, description, price, imgUrl, categoryId, isRecommended },
        { where: { id } }
      );
      res.status(200).json({ message: `${item.name} has been updated` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
