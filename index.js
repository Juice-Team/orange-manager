const express = require('express');
const app = express()
const low = require("lowdb");
const readline = require('readline');
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("./files/info.json");
const db = low(adapter);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
console.log(`Open your browser at localhost:3000 to start the orange-manager.`)
app.get('/', (req,res)=>{
rl.question('appname? ', (answer) => {

let me = db.get('server').find({getname: answer}).value()
res.setHeader("Content-Type", "text/html");
res.write(`<style>body {
  font-family: Arial;
  padding: 20px;	
  color:orange;
  background: black;
}
button{
color:orange;
  background: black;
}</style>`)
 res.write(`<h1>ORANGE-MANAGER</h1><br> <hr> <br>`)
 res.write(`<h3>NAME: ${me.appname}</h3>`)
 res.write(`<h3>INFO: ${me.info}</h3>`)
  res.write(`<button onclick="location.href = '${me.link}';"> Download</button>`)
  console.log(me)
  rl.close();
});

});
app.listen(3000)
