module.exports.config = {
		  name: "زوجيني",
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
	const { senderID, messageID, threadID, participantIDs } = event;
	const pre = global.GoatBot.config.prefix;
	var userdata = await usersData.get(senderID);
        var money = userdata.money;
	if (money < 200) api.sendMessage(`انت لا تملك المال الكافي، قم بكتابة هذا الامر لتحصل على بعض المال - ${pre}هدية - ${pre}عمل`, threadID, messageID)
        else {
        var id1 = senderID;
	var id2 = participantIDs[Math.floor(Math.random() * participantIDs.length)];
        var romance = Math.floor(Math.random() * 101);
        var name1 = await usersData.getName(id1);
        var name2 = await usersData.getName(id2);

        var tags = [];
            tags.push({id: id1, tag: name1});
            tags.push({id: id2, tag: name2});
      
        usersData.set(senderID, options = {money: money - 200, data: userdata.data})
  
        let Avatar1 = (await axios.get( `https://graph.facebook.com/${id1}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" } )).data; 
            fs.writeFileSync( __dirname + "/cache/1.png", Buffer.from(Avatar1, "utf-8") );
        let Avatar2 = (await axios.get( `https://graph.facebook.com/${id2}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" } )).data;
            fs.writeFileSync( __dirname + "/cache/2.png", Buffer.from(Avatar2, "utf-8") );
        var images = [];
            images.push(fs.createReadStream(__dirname + "/cache/1.png"));
            images.push(fs.createReadStream(__dirname + "/cache/2.png"));
        var msg = {body: `✨💙 🤭 لدينا زوجان هنا 💙✨\n       نسبة الرومنسية: ${romance} %\n`+name1+" "+"💓"+" "+name2, mentions: tags, attachment: images}
        return api.sendMessage(msg, threadID, messageID);
      }
  }
