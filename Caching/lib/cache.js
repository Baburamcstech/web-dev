const env = require('dotenv');
const redis = require('redis');
const getRedisUrl = () =>{
    console.log(process.env.REDIS_URL);
    if(process.env.REDIS_URL){
        return process.env.REDIS_URL
    }
    return error("REDIS_URL is not defined");
}
module.exports = getRedisUrl