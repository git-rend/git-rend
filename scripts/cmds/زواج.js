module.exports.config = {
		  name: "زواج",
		  version: "1.4",
		  author: "محمد تانجيرو",
		  countDown: 5,
		  role: 0,
		  description: { ar:" زواج اثنين من الغروب بشكل عشوائي"},
		  category: "box chat",
		  guide: { ar: "{pn}"}
	                },

module.exports.onStart = async function({ api, event, usersData }) {
        const axios = require("axios");
        const fs = require("fs-extra");
        var TOKEN = "6628568379%7Cc1e620fa708a1d5696fb991c1bde5662";
	const { senderID } = event;
	const pre = global.GoatBot.config.prefix;
	var data = await usersData.get(senderID);
        var money = (await usersData.get(senderID)).money;
	if (money < 200) api.sendMessage(`انت لا تملك المال الكافي، قم بكتابة هذا الامر لتحصل على بعض المال - ${pre}هدية - ${pre}عمل`, event.threadID, event.messageID) //thay số tiền cần trừ vào 0, xóa money = 0
        
  else {
        var ids = event.participantIDs;
        var id1 = ids[Math.floor(Math.random() * ids.length)];
	var id2 = ids[Math.floor(Math.random() * ids.length)];
        var tile = Math.floor(Math.random() * 101);
        var name1 = (await usersData.get(id1)).name;
        var name2 = (await usersData.get(id2)).name;

        var arraytag = [];
        arraytag.push({id: id1, tag: name1});
        arraytag.push({id: id2, tag: name2});
      
        usersData.set(event.senderID, options = {money: money - 200, data: data.data})
  
        let Avatar1 = (await axios.get( `https://graph.facebook.com/${id1}/picture?height=720&width=720&access_token=${TOKEN}`, { responseType: "arraybuffer" } )).data; 
            fs.writeFileSync( __dirname + "/cache/1.png", Buffer.from(Avatar1, "utf-8") );
        let Avatar2 = (await axios.get( `https://graph.facebook.com/${id2}/picture?height=720&width=720&access_token=${TOKEN}`, { responseType: "arraybuffer" } )).data;
            fs.writeFileSync( __dirname + "/cache/2.png", Buffer.from(Avatar2, "utf-8") );
        var imglove = [];
              imglove.push(fs.createReadStream(__dirname + "/cache/1.png"));
              imglove.push(fs.createReadStream(__dirname + "/cache/2.png"));
        var msg = {body: `✨💙 🤭 لدينا زوجان هنا 💙✨\n       نسبة الرومنسية: ${tile} %\n`+name1+" "+"💓"+" "+name2, mentions: arraytag, attachment: imglove}
        return api.sendMessage(msg, event.threadID, event.messageID);
      }
  }
