module.exports.config = {
		name: "2",
		version: "1.4",
		author: "محمد تانجيرو",
		countDown: 5,
		role: 2,
		description: {
			ar: "يزوجك بشخص من الغروب بشكل عشوائي"
		},
		category: "box chat",
		guide: {
			ar: "{pn}"
		}
	},

module.exports.onStart = async function({ api, args, event, message, usersData }) {
  const axios = require("axios");
  const fs = require("fs-extra");
  const { senderID, messageID, threadID } = event;
  const pre = global.GoatBot.config.prefix;
  var data = await usersData.get(senderID);
  var money = data.money
  if (money < 200) api.sendMessage(`انت لا تملك المال الكافي، قم بكتابة هذا الامر لتحصل على بعض المال - ${pre}هدية - ${pre}عمل`, threadID, messageID)
  else { 
     switch (args[0]) {
	case "بنت": {
           var tile = Math.floor(Math.random() * 101);
           var emoji = event.participantIDs;
           var id = emoji[Math.floor(Math.random() * emoji.length)];
           var namee = (await usersData.get(senderID)).name;
           var name = (await usersData.get(id)).name;
           var arraytag = [];
               arraytag.push({id: senderID, tag: namee});
               arraytag.push({id: id, tag: name});
           usersData.set(senderID, options = {money: money - 200, data: data.data})
           let Avatar = (await axios.get( `https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" } )).data; 
           fs.writeFileSync( __dirname + "/cache/1.png", Buffer.from(Avatar, "utf-8") );
           let Avatar2 = (await axios.get( `https://graph.facebook.com/${senderID}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" } )).data;
           fs.writeFileSync( __dirname + "/cache/2.png", Buffer.from(Avatar2, "utf-8") );
           var imglove = [];
               imglove.push(fs.createReadStream(__dirname + "/cache/1.png"));
               imglove.push(fs.createReadStream(__dirname + "/cache/2.png"));
           var msg = {body: `✨💙 🤭 لدينا زوجان هنا 💙✨\n       نسبة الرومنسية: ${tile} %\n`+namee+" "+"💓"+" "+name, mentions: arraytag, attachment: imglove}
           return api.sendMessage(msg, threadID, messageID);
           //fs.unlinkSync(__dirname + '/cache/1.png');
           //fs.unlinkSync(__dirname + '/cache/2.png');
        break;
	           }
	case "ولد": {
           var tile = Math.floor(Math.random() * 101);
           var emoji = event.participantIDs;
           var id = emoji[Math.floor(Math.random() * emoji.length)];
           var namee = (await usersData.get(senderID)).name;
           var name = (await usersData.get(id)).name;
           var arraytag = [];
               arraytag.push({id: senderID, tag: namee});
               arraytag.push({id: id, tag: name});
           usersData.set(senderID, options = {money: money - 200, data: data.data})
           let Avatar = (await axios.get( `https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" } )).data; 
           fs.writeFileSync( __dirname + "/cache/1.png", Buffer.from(Avatar, "utf-8") );
           let Avatar2 = (await axios.get( `https://graph.facebook.com/${senderID}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" } )).data;
           fs.writeFileSync( __dirname + "/cache/2.png", Buffer.from(Avatar2, "utf-8") );
           var imglove = [];
               imglove.push(fs.createReadStream(__dirname + "/cache/1.png"));
               imglove.push(fs.createReadStream(__dirname + "/cache/2.png"));
           var msg = {body: `✨💙 🤭 لدينا زوجان هنا 💙✨\n       نسبة الرومنسية: ${tile} %\n`+namee+" "+"💓"+" "+name, mentions: arraytag, attachment: imglove}
           return api.sendMessage(msg, threadID, messageID);
           //fs.unlinkSync(__dirname + '/cache/1.png');
           //fs.unlinkSync(__dirname + '/cache/2.png');
        break;
	           }
	default: {
	   return message.reply ("زوجيني بنت أو زوجيني ولد")} 
    }
  } 
}
