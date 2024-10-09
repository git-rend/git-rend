module.exports.config = {
		name: "تجربة",
		version: "1.4",
		author: "محمد تانجيرو",
		countDown: 5,
		role: 2,
		description: {
			ar: "يزوجك بشخص من الغروب بشكل عشوائي"
		},
		category: "box chat",
		guide: {
			ar: "{pn} [ولد | بنت]"
		}
	},

module.exports.onStart = async function({ api, args, event, usersData, threadsData }) {
        const axios = require("axios");
        const fs = require("fs-extra");
        var TOKEN = "6628568379%7Cc1e620fa708a1d5696fb991c1bde5662";
	const { senderID, threadID } = event;
	const pre = global.GoatBot.config.prefix;
        var data = await usersData.get(senderID);
        var money = data.money
	if( money < 200) api.sendMessage(`انت لا تملك المال الكافي، قم بكتابة هذا الامر لتحصل على بعض المال - ${pre}هدية - ${pre}عمل`, event.threadID, event.messageID)
	  switch (args[0]) {
			case "ولد":
			case "بولد": {
         //thay số tiền cần trừ vào 0, xóa money = 0
        //else {
        var tile = Math.floor(Math.random() * 101);
	const threadData = await threadsData.get(threadID);
	const listboys = await threadsData.get(threadID, "data.listboys", []);
		const valuesMember = Object.values(threadData.members).filter(item => item.inGroup);
	const boy = valuesMember.find(item => item.gender == "MALE");
        //const Boys = Boy.participantIDs;//var sex = await data[id].gender;
        //var boys = sex == 1 /*event.participantIDs*/;
        var id = boy[Math.floor(Math.random() * boy.length)];

        var namee = (await usersData.get(event.senderID)).name;
        var name = (await usersData.get(id)).name;

        var arraytag = [];
        arraytag.push({id: event.senderID, tag: namee});
        arraytag.push({id: id, tag: name});
      
        usersData.set(event.senderID, options = {money: money - 200, data: data.data})
  
        let Avatar = (await axios.get( `https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=${TOKEN}`, { responseType: "arraybuffer" } )).data; 
            fs.writeFileSync( __dirname + "/cache/1.png", Buffer.from(Avatar, "utf-8") );
        let Avatar2 = (await axios.get( `https://graph.facebook.com/${event.senderID}/picture?height=720&width=720&access_token=${TOKEN}`, { responseType: "arraybuffer" } )).data;
            fs.writeFileSync( __dirname + "/cache/2.png", Buffer.from(Avatar2, "utf-8") );
        var imglove = [];
              imglove.push(fs.createReadStream(__dirname + "/cache/1.png"));
              imglove.push(fs.createReadStream(__dirname + "/cache/2.png"));
        var msg = {body: `✨💙 🤭 لدينا زوجان هنا 💙✨\n       نسبة الرومنسية: ${tile} %\n`+namee+" "+"💓"+" "+name, mentions: arraytag, attachment: imglove}
        return api.sendMessage(msg, event.threadID, event.messageID);
        //fs.unlinkSync(__dirname + '/cache/1.png');
        //fs.unlinkSync(__dirname + '/cache/2.png');
       break;
      }
      case "بنت":
			case "ببنت": {
        if( money < 200) api.sendMessage(`انت لا تملك المال الكافي، قم بكتابة هذا الامر لتحصل على بعض المال - ${pre}هدية - ${pre}عمل`, event.threadID, event.messageID) //thay số tiền cần trừ vào 0, xóa money = 0
        else {
        var tile = Math.floor(Math.random() * 101);
        var sex = await data[id].gender;
        var boys = sex == 2 /*event.participantIDs*/;
        var id = boys[Math.floor(Math.random() * boys.length)];

        var namee = (await usersData.get(event.senderID)).name;
        var name = (await usersData.get(id)).name;

        var arraytag = [];
        arraytag.push({id: event.senderID, tag: namee});
        arraytag.push({id: id, tag: name});
      
        usersData.set(event.senderID, options = {money: money - 200, data: data.data})
  
        let Avatar = (await axios.get( `https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=${TOKEN}`, { responseType: "arraybuffer" } )).data; 
            fs.writeFileSync( __dirname + "/cache/1.png", Buffer.from(Avatar, "utf-8") );
        let Avatar2 = (await axios.get( `https://graph.facebook.com/${event.senderID}/picture?height=720&width=720&access_token=${TOKEN}`, { responseType: "arraybuffer" } )).data;
            fs.writeFileSync( __dirname + "/cache/2.png", Buffer.from(Avatar2, "utf-8") );
        var imglove = [];
              imglove.push(fs.createReadStream(__dirname + "/cache/1.png"));
              imglove.push(fs.createReadStream(__dirname + "/cache/2.png"));
        var msg = {body: `✨💙 🤭 لدينا زوجان هنا 💙✨\n       نسبة الرومنسية: ${tile} %\n`+namee+" "+"💓"+" "+name, mentions: arraytag, attachment: imglove}
        return api.sendMessage(msg, event.threadID, event.messageID);
        //fs.unlinkSync(__dirname + '/cache/1.png');
        //fs.unlinkSync(__dirname + '/cache/2.png');
      }; break;
      }
         default: { return api.sendMessage("زوجيني بنت أو زوجيني ولد", event.threadID, event.messageID)}
    }
}
