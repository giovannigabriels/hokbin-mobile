const connectionDb = (req, res, next) => {
  req.db = db;
  next();
};
module.exports = connectionDb;
