const { ObjectId } = require("mongodb");
const { getDb } = require("../config");

class User {
  static getCollection() {
    const collection = getDb().collection("users");
    return collection;
  }
  static async findAll() {
    try {
     
      const collection = this.getCollection();
      
      const users = await collection
        .find(
          {},
          {
            projection: {
              password: 0,
            },
          }
        )
        .toArray();
        console.log("masuk ke model");
      return users;
    } catch (error) {
      throw error;
    }
  }

  static async insertOne(payload) {
    try {
      const collection = this.getCollection();
      const user = await collection.insertOne(payload);
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async findOne(id) {
    try {
      const collection = this.getCollection();

      const user = await collection.findOne(
        { _id: ObjectId(id) },
        {
          projection: {
            password: 0,
          },
        }
      );
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const collection = this.getCollection();
      const user = await collection.deleteOne({ _id: ObjectId(id) });
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;
