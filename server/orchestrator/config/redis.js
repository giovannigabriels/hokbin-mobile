const Redis = require("ioredis");
const redis = new Redis({
  port: 14473, // Redis port
  host: "redis-14473.c276.us-east-1-2.ec2.cloud.redislabs.com", // Redis host
  username: "default", // needs Redis >= 6
  password: process.env.PASSWORD_REDIS,
});

module.exports = redis;
