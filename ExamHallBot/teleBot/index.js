var express = require('express');
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

const { Axios } = require("axios");
const TelegramBot = require("node-telegram-bot-api");


const token="6059957668:AAG473rD3Q_unv7VAoWVxsgy_TMxQUfPi5s";
const bot=new TelegramBot(token,{polling:true});
bot.on("message",async(msg)=>{
    const chatId=msg.chat.id;
    const regno=msg.text;
    //const message="helloo";
    const MongoClient = require("mongodb").MongoClient;

// Server path
const url = 'mongodb://127.0.0.1:27017';


console.log(url)
MongoClient.connect(url)
.then(
   function(db)
   {
    
      var dbo=db.db('Dictionary')
    
      var query={regno:regno}
      dbo.collection("Words").find(query).toArray()
      .then(function(result){
            console.log(result)
        //const m=result[0].hallno;
         
        bot.sendMessage(chatId," Your hall location for"+regno+" is "+result[0].hallno);
         
      })
      .catch(function(err){
            console.log(err)
      })
     
      })
.catch(function(err){
      console.log(err)
})
    
   // bot.sendMessage(chatId,userinput);

   
});