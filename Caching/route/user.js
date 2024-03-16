const express = require("express");
const connection = require('../database/database');
const dotenv = require('dotenv');
const axios= require('axios');
const router = express.Router();
const redis = require('redis');

let redisClient;
(async ()=>{
  redisClient = redis.createClient({
    host:'redis-server',
    port:6379
  });
  redisClient.on("error",(error)=> console.error(`Error : ${error}`));
  console.log("redis connected!!")
    // await redisClient.connect()
})();
var foo=0,bar=0;
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  let results;
  let isCached = false;
  try {
    const cacheResults = await redisClient.get(id);

    if (cacheResults) {
      isCached = true;
      results = JSON.parse(cacheResults);
      return res.json({ status: "success", result: results });
    } else {
      const user = 'select * from Cach1 where keyValue=?';

      // Use a Promise to wrap the database query
      const queryPromise = new Promise((resolve, reject) => {
        connection.query(user, [id], (err, dbResults) => {
          if (err) {
            console.log(`Got error ${err}`);
            reject(err);
          } else {
            console.log(dbResults);
            resolve(dbResults);
          }
        });
      });

      // Await the database query before setting the Redis key
      const dbResults = await queryPromise;
      await redisClient.set(id, JSON.stringify(dbResults));
      return res.json({ status: "success", result: dbResults });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
