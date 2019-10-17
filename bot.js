
//Avery Code
const fs = require('fs');
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./client_secret.json');
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
const readline = require('readline');
const { google } = require('googleapis');
// Configure logger settings

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});
//when turned on
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
    bot.sendMessage({
        to: "general",
        message: "Bish-bAsh-bosh, Kite.io has planeshifted into the server",
    });
});
//when somone sends a message
bot.on('message', function (user, userID, channelID, message, evt) {
    if (message.substring(0, 1) == "!") {
        var stuff = message.substring(1)
        var doc = new GoogleSpreadsheet('1oCgn7laejTuV0lqdxDqvi3qNhuW6JtSfwv26pmLrS94'); //Guaranteed?
        // Authenticate with the Google Spreadsheets API
        doc.useServiceAccountAuth(creds, function (err) {
            // Get all of the rows from the spreadsheet.
            doc.getRows(1, function (err, rows) {
                rows.map((row) => {
                    var input = message.substring(1).split(" ")
                    if (input[0].toLowerCase() == "player") {
                        if (input[1].toLowerCase() +" "+ input[2].toLowerCase() == row.playernamefirstlast.toLowerCase()) {
                            bot.sendMessage({
                                to: channelID,
                                message: row.charactersfullname + " " + row.totallevel + " " +
                                    row.highestclasslevel + " " + row.archetype + " " +
                                    row.ndhighestclasslevel + " " + row.archetype_2 + " " +
                                    row.rdhighestclasslevel + " " + row.archetype_3
                            });
                        };
                    }
                    
                    /*else if (input[1].toLowerCase() == "levelup" || input[1].toLowerCase() == "lvlup" || input[1].toLowerCase() == "lvlup") {
                        if (input[2].toLowerCase() == row.charactersfullname.toLowerCase()) {
                            logger.info("Nice NIce NICe")
                            if (input[3].toLowerCase() == row.archetype) {
                                row.totallevel = row.totallevel++
                                var holder = highestclasslevel.split(" ")  
                                row.highestclasslevel = holder[0] + holder[1]++ 
                            }
                            else if (input[3].toLowerCase() == row.archetype_2) {
                                row.totallevel = row.totallevel++
                                var holder = ndhighestclasslevel.split(" ")
                                row.ndhighestclasslevel = holder[0] + holder[1]++ 
                            }
                            else if (input[3].toLowerCase() == row.archetype_3) {
                                row.totallevel = row.totallevel++
                                var holder = rdhighestclasslevel.split(" ")
                                row.rdhighestclasslevel = holder[0] + holder[1]++ 
                            }

                        }
                        var appendRequest = Sheets.newAppendCellsRequest();
                        appendRequest.sheetId = "1oCgn7laejTuV0lqdxDqvi3qNhuW6JtSfwv26pmLrS94";
                        appendRequest.rows = ("A1:W107");
                        var result = Sheets.Spreadsheets.Values.append(valueRange, spreadsheetId, range, {
                            valueInputOption: valueInputOption
                        });
                    }
                    */

                });
            });
        });
    }
});