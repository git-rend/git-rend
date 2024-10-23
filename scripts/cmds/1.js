module.exports.config = {
		              name: "1",
		              version: "1.4",
		              author: "محمد تانجيرو",
		              countDown: 5,
		              role: 2,
		              description: { ar: "يزوجك بشخص من الغروب بشكل عشوائي" },
		              category: "box chat",
		              guide: { ar: "{pn}" }
	                      },

module.exports.onStart = async function({ api, event, usersData }) {
  const axios = require("axios");
  const fs = require("fs-extra");
  var TOKEN = "6628568379%7Cc1e620fa708a1d5696fb991c1bde5662";
	const { threadID, messageID, senderID } = event;
	const pre = global.GoatBot.config.prefix;
  var data = await usersData.get(senderID);
  var money = data.money
	
  if (money < 200) api.sendMessage(`انت لا تملك المال الكافي، قم بكتابة هذا الامر لتحصل على بعض المال ${pre}كهف - ${pre}هدية - ${pre}عمل`, threadID, messageID) //thay số tiền cần trừ vào 0, xóa money = 0
  else {
  var lovePercent = Math.floor(Math.random() * 101);
        

        //let loz = await api.getThreadInfo(event.threadID);
        //var ids = event.participantIDs;
        //var id = ids[Math.floor(Math.random() * ids.length)];

        const userInfo = await api.getUserInfo(senderID);
        const senderGender = userInfo[senderID].gender === 2 ? "boy" : "girl";
	const boys = [];
    const girls = [];
    for (let userID of event.participantIDs) {
      const user = await api.getUserInfo(userID);
      if (user[userID].gender === 2) boys.push(userID); // Gender 2 = Male
      if (user[userID].gender === 1) girls.push(userID); // Gender 1 = Female
    }
	  if (senderGender === "boy") {
      if (girls.length === 0) return api.sendMessage("🌹 للأسف لا يمڪن تزويجك\nلا توجـد بنـات في المجموعـة", threadID, messageID);
      let chosenPartner = girls[Math.floor(Math.random() * girls.length)];
      var namee = (await usersData.getName(senderID));
      var name = (await usersData.getName(chosenPartner));
  var arraytag = [];
        arraytag.push({id: senderID, tag: namee});
        arraytag.push({id: chosenPartner, tag: name});
	  
} else {
      if (boys.length === 0) return api.sendMessage("🌹 للأسف لا يمڪن تزويجك\nلا يوجـد أولاد فـي المجموعـة", threadID, messageID);
      let chosenPartner = boys[Math.floor(Math.random() * boys.length)];
      var namee = (await usersData.getName(senderID));
      var name = (await usersData.getName(chosenPartner));
      var arraytag = [];
        arraytag.push({id: senderID, tag: namee});
        arraytag.push({id: chosenPartner, tag: name});
	  };
        
      
        usersData.set(senderID, options = {money: money - 200, data: data.data})
  
        let Avatar = (await axios.get( `https://graph.facebook.com/${chosenPartner}/picture?height=720&width=720&access_token=${TOKEN}`, { responseType: "arraybuffer" } )).data; 
            fs.writeFileSync( __dirname + "/cache/1.png", Buffer.from(Avatar, "utf-8") );
        let Avatar2 = (await axios.get( `https://graph.facebook.com/${senderID}/picture?height=720&width=720&access_token=${TOKEN}`, { responseType: "arraybuffer" } )).data;
            fs.writeFileSync( __dirname + "/cache/2.png", Buffer.from(Avatar2, "utf-8") );
        var imglove = [];
              imglove.push(fs.createReadStream(__dirname + "/cache/1.png"));
              imglove.push(fs.createReadStream(__dirname + "/cache/2.png"));
        var msg = {body: `✨💙 🤭 لدينا زوجان هنا 💙✨\n       نسبة الرووومنسية: ${lovePercent} %\n`+namee+" "+"💓"+" "+name, mentions: arraytag, attachment: imglove}
        return api.sendMessage(msg, threadID, messageID);
        //fs.unlinkSync(__dirname + '/cache/1.png');
        //fs.unlinkSync(__dirname + '/cache/2.png');
      }
}
