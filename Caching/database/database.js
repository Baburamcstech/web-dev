var mysql=require('mysql')
const connection=mysql.createConnection({
    host:'localhost',
    database:'Caching',
    user:'root',
    password:'Babus@2005'
})
module.exports=connection;