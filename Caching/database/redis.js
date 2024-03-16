var redis= require('redis');
const conn=redis.createClient({
    host:'localhost',
    user:'root',
   port:6379
})
module.exports=conn;