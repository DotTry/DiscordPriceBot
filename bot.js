//First of all, we need to load the dependencies we downloaded!
var logger = require("winston"); //What is winston?
var Discordbot = require('discord.io');

var Discordie = require('discordie');
const Events = Discordie.Events;
const client = new Discordie();

/*** API SHIT **/
var request = require('request');

/*var _GDAX = require('./src/classes/GDAX');
var _CoinMarketCap = require('/src/classes/CoinMarketCap');
var _commander = require('commander');
var _commander2 = _interopRequireDefault(_commander);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_commander2.default.version('1.0.0');
var GDAX_MAP = {
  BTC: 'Bitcoin',
  ETH: 'Ethereum',
  LTC: 'Litecoin'
};*/

/*client.connect()

client.Dispatcher.on(Events.GATEWAY_READY, e => {
    console.log('Connected as: ' + client.User.Username);
});

client.Dispatcher.on(Events.MESSAGE_CREATE, e => {
    if(e.message.content == 'PING'){
        e.message.channel.sendMessage('PONG');
    }
});*/
var help = ['COMMANDS: `.eth`, `.ltc`, `.btc`, `.btc/eth/ltc<gdax,bfx>`, `.price <ticker>`, `.p <bfx/gdax>`'];

//Let's change some settings!
logger.remove(logger.transports.Console);   
logger.add(logger.transports.Console, {
    colorize : true
});
logger.level = 'debug';

var auth = require("./auth.json"); //json variable

//Here we create our bot variable, this is what we're going to use to communicate to discord.
var bot = new Discordbot.Client({ //Object construct
        //email : auth.email, //<-- This is the email from your auth file.
        //password : auth.password,//<-- This is the password from your auth file.
        token: "MzMwMzY3MTA2OTA0NDg5OTg0.DDf96A.GSrCoOXUktFNFCd94cHa7ofuZuw",
        autorun : true,
        game: "with myself."

    });
    
bot.on("ready", function (rawEvent) { //init commands
    logger.info("Connected!");
    logger.info("Logged in as: ");
    logger.info(bot.username + " - (" + bot.id + ")");

});

/***TRASH*/
bot.on('presence', function() { 
    bot.setPresence({
	game:{
		name:"With Myself"
	}
    });
    
});
bot.setPresence({
	game:{
		name:"With Myself"
	}
    });

//bot.user.setGame("with my self");

//In this function we're going to add our commands.
bot.on("message", function (user, userID, channelID, message, rawEvent) {
    if (message.substring(0, 1) == ".") {
        var argument = message.substring(1).split(" ");
        var command = argument[0].toLowerCase();
        argument = argument.splice(1);

        if (command == "ping") {//If the user posts '!ping' we'll do something!
            bot.sendMessage({ //We're going to send a message!
                to : channelID,
                message : "Pong!"
            });
        }
        
        if (command == "10") {//If the user posts '!ping' we'll do something!
            bot.sendMessage({ //We're going to send a message!
                to : channelID,
                message : "*SELL SELL SELL*"
            });
        }
        
        else if (command == "ans") {//If the user posts '!ping' we'll do something!
           var msg = "`ANS: ";
           var url = 'https://coinmarketcap-nexuist.rhcloud.com/api/ans';
           request(url, function (err, response, body) {
               if(err || body.charAt(0) == '<'){
                  console.log('error')
                } else {
                  var weather = JSON.parse(body)
                  console.log(weather.price.usd)

                  msg +="$"+ weather.price.usd + "`";
                  
                  /*Send message*/
                  bot.sendMessage({ //We're going to send a message!
                        to : channelID,
                        message : msg
                    });
                }
           })
           
        }
        
        else if (command == "bts") {//If the user posts '!ping' we'll do something!
           var msg = "`Bitshares: ";
           var url = 'https://coinmarketcap-nexuist.rhcloud.com/api/bts';
           request(url, function (err, response, body) {
               if(err || body.charAt(0) == '<'){
                  console.log('error')
                } else {
                  var weather = JSON.parse(body)
                  console.log(weather.price.usd)

                  msg +="$"+ weather.price.usd + "`";
                  
                  /*Send message*/
                  bot.sendMessage({ //We're going to send a message!
                        to : channelID,
                        message : msg
                    });
                }
           })
           
        }
        
        /*Simple read....
        if (command == "eth") {//If the user posts '!ping' we'll do something!
            var msg = "`ETH: ";
           var url = 'https://api.cryptowat.ch/markets/gdax/ethusd/price';
            if(argument[0]=='bfx')
            var url = 'https://api.cryptowat.ch/markets/bitfinex/ethusd/price';
            else if(argument[0]=='gdax')
            var url = 'https://api.cryptowat.ch/markets/gdax/ethusd/price';
            
           request(url, function (err, response, body) {
               if(err){
                  console.log('error')
                } else {
                  var weather = JSON.parse(body)
                  console.log(weather.result.price)

                  msg +="$"+ weather.result.price + "`";

                  bot.sendMessage({ //We're going to send a message!
                        to : channelID,
                        message : msg
                    });
                }
           })
        }
        
        if (command == "btc") {//If the user posts '!ping' we'll do something!
            var msg = "`BTC: ";
           var url = 'https://api.cryptowat.ch/markets/gdax/btcusd/price';
           if(argument[0]=='bfx')
            var url = 'https://api.cryptowat.ch/markets/bitfinex/btcusd/price';
            else if(argument[0]=='gdax')
            var url = 'https://api.cryptowat.ch/markets/gdax/btcusd/price';
            else if(argument[0]=='polo')
            var url = 'https://api.cryptowat.ch/markets/poloniex/btcusd/price';
            
           request(url, function (err, response, body) {
               
               if(err){
                  console.log('error')
                } else {
                  var weather = JSON.parse(body)
                  console.log(weather.result.price)

                  msg +="$"+ weather.result.price + "`";

                  bot.sendMessage({ //We're going to send a message!
                        to : channelID,
                        message : msg
                    });
                }
           })
        }
        
        if (command == "ltc") {//If the user posts '!ping' we'll do something!
            var msg = "`LTC: ";
           var url = 'https://api.cryptowat.ch/markets/gdax/ltcusd/price';
            if(argument[0]=='bfx')
            var url = 'https://api.cryptowat.ch/markets/bitfinex/ltcusd/price';
            else if(argument[0]=='gdax')
            var url = 'https://api.cryptowat.ch/markets/gdax/ltcusd/price';
           request(url, function (err, response, body) {
               if(err){
                  console.log('error')
                } else {
                  var weather = JSON.parse(body)
                  console.log(weather.result.price)

                  msg +="$"+ weather.result.price + "`";
                  
                  bot.sendMessage({ //We're going to send a message!
                        to : channelID,
                        message : msg
                    });
                }
           })
        }*/
        
        else if (command == "price") {//If the user posts '!ping' we'll do something!
        if(!argument[0])
            argument[0] = "btc";
            var msg = "**`" + argument[0].toUpperCase() + ": ";
            //console.log(argument.toUpperCase());
           var url =  'https://coinmarketcap-nexuist.rhcloud.com/api/' + argument[0];
           request(url, function (err, response, body) {
               var data = JSON.parse(body);
               if(data.error){
                  //console.log(user)
                  console.log('error no entry' + command);
                  bot.sendMessage({ //We're going to send a message!
                        to : channelID,
                        message : "*Nothing Found*"
                    });
                } else {
                  var weather = JSON.parse(body)
                  //console.log(weather.price.usd)

                  msg +="$"+ weather.price.usd + "`**";
                  
                  /*Send message*/
                  bot.sendMessage({ //We're going to send a message!
                        to : channelID,
                        message : msg
                    });
                }
           })
        }
        
        else if (command == "prices") {//If the user posts '!ping' we'll do something!
        /*Do API request and parse into a message*/
        var url = "https://api.cryptowat.ch/markets/gdax/btcusd/price";
        
        if(argument[0]=='bfx')
            var url = 'https://api.cryptowat.ch/markets/bitfinex/btcusd/price';
        else if(argument[0]=='gdax')
            var url = 'https://api.cryptowat.ch/markets/gdax/btcusd/price';
        else if(argument[0]=='polo')
            var url = 'https://api.cryptowat.ch/markets/poloniex/btcusd/price';
        else
            argument[0]='gdax';
            
        var wholemsg = "**```Prices in USD ("+argument[0].toUpperCase()+"):\n====================  \n";
            request.get('https://api.cryptowat.ch/markets').on('response', function(response){
                //console.log(response.body)
            } )
            
            //var url = `https://api.cryptowat.ch/markets/gdax/btcusd/price`
            request(url, function (err, response, body) {
                if(err){
                  console.log('error')
                } else {
                  var weather = JSON.parse(body)

                  var string1 = wholemsg + "BTC - $"+ weather.result.price + "\n";
                }
                
                    //Second thread=======================
                    url = `https://api.cryptowat.ch/markets/gdax/ethusd/price`
                    request(url, function (err, response, body) {
                    if(err){
                      console.log('error')
                    } else {
                      var weather = JSON.parse(body)
    
                      var string2 = string1 + "ETH - $"+ weather.result.price + "\n";
                    }
                    
                        //Third Thread----------------------
                        url = `https://api.cryptowat.ch/markets/gdax/ltcusd/price`
                        request(url, function (err, response, body) {
                        if(err){
                          console.log('error')
                        } else {
                          var weather = JSON.parse(body)
        
                          var string3 = string2 + "LTC - $"+ weather.result.price + "\n";
                        }
                        
                        //Everything done, output msg.
                        bot.sendMessage({ //We're going to send a message!
                                to : channelID,
                                message : string3 + "```**"
                        });
                
                
                    })//end of thread 3
                    
                
                
                })//end of thread 2

                
            })//end of thread1
        }
        
        /*Same as .prices but this is to have emojiis*/
        else if (command == "p") {//If the user posts '!ping' we'll do something!
        /*Do API request and parse into a message*/
        var url = "https://api.cryptowat.ch/markets/gdax/btcusd/price";
        
        if(argument[0]=='bfx')
            var url = 'https://api.cryptowat.ch/markets/bitfinex/btcusd/price';
        else if(argument[0]=='gdax')
            var url = 'https://api.cryptowat.ch/markets/gdax/btcusd/price';
        else if(argument[0]=='polo')
            var url = 'https://api.cryptowat.ch/markets/poloniex/btcusd/price';
        else
            argument[0]='gdax';
            
        //var wholemsg = "`Prices in USD ("+argument[0].toUpperCase()+"):`\n";
        //Try 2 cleaner
        var wholemsg = "";
            request.get('https://api.cryptowat.ch/markets').on('response', function(response){
                //console.log(response.body)
            } )
            
            //var url = `https://api.cryptowat.ch/markets/gdax/btcusd/price`
            request(url, function (err, response, body) {
                if(err){
                  console.log('error')
                } else {
                  var weather = JSON.parse(body)

                  var string1 = wholemsg + "<:BTC:338428982498426893> **- $"+ weather.result.price + "**\n";
                }
                
                    //Second thread=======================
                    if(argument[0]=='bfx')
                        url = 'https://api.cryptowat.ch/markets/bitfinex/ethusd/price';
                    else if(argument[0]=='gdax')
                        url = 'https://api.cryptowat.ch/markets/gdax/ethusd/price';
                    else if(argument[0]=='polo')
                        url = 'https://api.cryptowat.ch/markets/poloniex/ethusd/price';
                    else
                    url = `https://api.cryptowat.ch/markets/gdax/ethusd/price`
                    request(url, function (err, response, body) {
                    if(err){
                      console.log('error')
                    } else {
                      var weather = JSON.parse(body)
    
                      var string2 = string1 + "<:ETH:338428982808805388> **- $"+ weather.result.price + "**\n";
                    }
                    
                        //Third Thread----------------------
                        if(argument[0]=='bfx')
                        url = 'https://api.cryptowat.ch/markets/bitfinex/ltcusd/price';
                        else if(argument[0]=='gdax')
                            url = 'https://api.cryptowat.ch/markets/gdax/ltcusd/price';
                        else if(argument[0]=='polo')
                            url = 'https://api.cryptowat.ch/markets/poloniex/ltcusd/price';
                        else
                        url = `https://api.cryptowat.ch/markets/gdax/ltcusd/price`
                        request(url, function (err, response, body) {
                        if(err){
                          console.log('error')
                        } else {
                          var weather = JSON.parse(body)
        
                          var string3 = string2 + "<:LTC:338428982703816705> **- $"+ weather.result.price + "**\n";
                        }
                        
                        //Everything done, output msg.
                        //string3 += "    __**("+argument[0].toUpperCase()+")**__          \n"
                        bot.sendMessage({ //We're going to send a message!
                                to : channelID,
                                message : string3
                        });
                    })//end of thread 3
                })//end of thread 2
            })//end of thread1
        }
        
        
        /*Let's try to do prices with change summary*/
        
        else if (command == "help") {//If the user posts '!ping' we'll do something!
        /*Do API request and parse into a message*/
           bot.sendMessage({ //We're going to send a message!
                        to : channelID,
                        message : help
            });
            

        }
        
        else if (command == "pin") {//If the user posts '!ping' we'll do something!
        /*Do API request and parse into a message*/
            console.log(argument);
            bot.sendMessage({ //We're going to send a message!
                        to : channelID,
                        message : "```diff\n+100\n```"
            });

        }
        
        else if (command == "tip") {//If the user posts '!ping' we'll do something!
        /*Do API request and parse into a message*/
            var address = "ETH: <0x4c3CCcE0F1F09BB7F2ea34A7101932F9C186209c>"
            bot.sendMessage({ //We're going to send a message!
                        to : channelID,
                        message : "```markdown\n"+address+"\n```"
            });

        }
        
        else if (command == "btc") {//If the user posts '!ping' we'll do something!
            var msg = "```diff\n BTC: ";
           var url = 'https://api.cryptowat.ch/markets/gdax/btcusd/price';
           
           
           
           
           
           
           
           if(argument[0]=='bfx')
            var url = 'https://api.cryptowat.ch/markets/bitfinex/btcusd/price';
           request(url, function (err, response, body) {
               if(err){ console.log('error')} 
               else {
                  var weather = JSON.parse(body)
                  msg +="$"+ weather.result.price + " \n";
                  
                  /*Thread 2*/
                  var url = 'https://api.cryptowat.ch/markets/gdax/btcusd/summary';
                  request(url, function (err, response, body) {
                    if(err){ console.log('error')} 
                       else {
                        var weather = JSON.parse(body)
                        var change = weather.result.price.change.absolute.toString();
                        var percent = (weather.result.price.change.percentage*100).toString();
                        if( change.substring(0,1) == "-")
                            msg+= "" + change.substring(0,1) + "$"+ change.substring(1,7) + " (" + percent.substring(0,7)+ "%) - 24 HR\n```"
                        else
                            msg+= "+" + "$"+ change.substring(0,7) + " (" + percent.substring(0,7)+ "%) - 24 HR\n```"
                        
                        /*Send message*/
                        bot.sendMessage({ //We're going to send a message!
                         to : channelID,
                         message : msg
                        });
                        }
                    })
                }
           })
        }
        //end
        
        else if (command == "eth") {//If the user posts '!ping' we'll do something!
            var msg = "```diff\n ETH: ";
           var url = 'https://api.cryptowat.ch/markets/gdax/ethusd/price';
           if(argument[0]=='bfx')
            var url = 'https://api.cryptowat.ch/markets/bitfinex/ethusd/price';
           request(url, function (err, response, body) {
               if(err){ console.log('error')} 
               else {
                  var weather = JSON.parse(body)
                  msg +="$"+ weather.result.price + " \n";
                  
                  /*Thread 2*/
                  var url = 'https://api.cryptowat.ch/markets/gdax/ethusd/summary';
                  request(url, function (err, response, body) {
                    if(err){ console.log('error')} 
                       else {
                        var weather = JSON.parse(body)
                        var change = weather.result.price.change.absolute.toString();
                        var percent = (weather.result.price.change.percentage*100).toString();
                        if( change.substring(0,1) == "-")
                            msg+= "" + change.substring(0,1) + "$"+ change.substring(1,7) + " (" + percent.substring(0,7)+ "%) - 24 HR\n```"
                        else
                            msg+= "+" + "$"+ change.substring(0,7) + " (" + percent.substring(0,7)+ "%) - 24 HR\n```"
                        
                        /*Send message*/
                        bot.sendMessage({ //We're going to send a message!
                         to : channelID,
                         message : msg
                        });
                        }
                    })
                }
           })
        }
        //end
        
        else if (command == "ltc") {//If the user posts '!ping' we'll do something!
            var msg = "```diff\n LTC: ";
           var url = 'https://api.cryptowat.ch/markets/gdax/ltcusd/price';
           if(argument[0]=='bfx')
            var url = 'https://api.cryptowat.ch/markets/bitfinex/ltcusd/price';
           request(url, function (err, response, body) {
               if(err){ console.log('error')} 
               else {
                  var weather = JSON.parse(body)
                  msg +="$"+ weather.result.price + " \n";
                  
                  /*Thread 2*/
                  var url = 'https://api.cryptowat.ch/markets/gdax/ltcusd/summary';
                  request(url, function (err, response, body) {
                    if(err){ console.log('error')} 
                       else {
                        var weather = JSON.parse(body)
                        var change = weather.result.price.change.absolute.toString();
                        var percent = (weather.result.price.change.percentage*100).toString();
                        if( change.substring(0,1) == "-")
                            msg+= "" + change.substring(0,1) + "$"+ change.substring(1,7) + " (" + percent.substring(0,7)+ "%) - 24 HR\n```"
                        else
                            msg+= "+" + "$"+ change.substring(0,7) + " (" + percent.substring(0,7)+ "%) - 24 HR\n```"
                        
                        /*Send message*/
                        bot.sendMessage({ //We're going to send a message!
                         to : channelID,
                         message : msg
                        });
                        }
                    })
                }
           })
        }
        //end
        
        else {
            var msg = "**`" + command.toUpperCase() + ": ";
            //console.log(argument.toUpperCase());
           var url =  'https://coinmarketcap-nexuist.rhcloud.com/api/' + command.toLowerCase();
           request(url, function (err, response, body) {
                console.log("body: " + body)
                if(body.charAt(0) != '<')
                    var data = JSON.parse(body);
               if(data.error){
                  console.log(data.error)
                  //search coinmarketcap THREAD: 2
                  var url =  'https://api.coinmarketcap.com/v1/ticker/' + command.toLowerCase();
                  request(url, function (err, response, body) {
                       var data = JSON.parse(body);
                       //console.log(data);
                       if(data.error || command.length < 3){
                          //console.log(user)
                          console.log('error no entry' + command);
                          bot.sendMessage({ //We're going to send a message!
                                to : channelID,
                                message : "*Nothing Found*"
                            });
                        } else {
                          var weather = JSON.parse(body)
                          //console.log(weather.price.usd)
                          //redo message
                          msg = "**` " + weather[0].symbol + ": ";
                          msg +="$"+ weather[0].price_usd + "`/`"+ weather[0].price_btc+"BTC`**";
                          
                          bot.sendMessage({ //We're going to send a message!
                                to : channelID,
                                message : msg
                            });
                        }
                   })
                    
                    
                } else {
                  var weather = JSON.parse(body)
                  //console.log(weather.price.usd)

                  msg +="$"+ weather.price.usd + "`**";
                  
                  bot.sendMessage({ //We're going to send a message!
                        to : channelID,
                        message : msg
                    });
                }
           })
        }
    }

});



/*1.Parse(!command) 2.Match and perform message */
