const mysql = require('mysql');
require("dotenv").config();

const connection = mysql.createConnection({
     connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'user_authentication'
  });
   
connection.connect((err)=>{
    if (err) throw err;
    console.log("connection created")
 });

  module.exports={
    connection
  }