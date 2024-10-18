module.exports.config = {
		name: "2",
		version: "1.4",
		author: "محمد تانجيرو",
		countdown: 5,
		role: 2,
		description: { ar: "الزواج عشوائيا ببنت أو ولد على حسب اختيارك" },
		category: "box chat",
		guide: { ar: "{pn} [ولد | بنت]" }
	                 },

module.exports.onStart = async function({ api, args, event, usersData, threadsData }) {
  const axios = require("axios");
  const fs = require("fs-extra");
  var TOKEN = "6628568379%7Cc1e620fa708a1d5696fb991c1bde5662";
  const { senderID, threadID, messageID } = event;
  const pre = global.GoatBot.config.prefix;
  var data = await usersData.get(senderID);
  var money = data.money
  if( money < 200) api.sendMessage("انت لا تملك المال الكافي، قم بكتابة هذا الامر لتحصل على بعض المال - ${pre}هدية - ${pre}عمل", threadID, messageID);
  var LovePercent = Math.floor(Math.random() * 101);
  const threadData = await threadsData.get(threadID);
  //const threadInfo = await api.getThreadInfo(event.threadID);
  const allMembers =/*threadInfo*/event.participantIDs;
  const Boys = [];
  const Girls = [];
  for (let memberID of allMembers) {
  const memberInfo = await api.getUserInfo(memberID);
  const member = memberInfo[memberID];
  if (member.gender === 2) { Boys.push(`${memberID}`) }
  else 
  if (member.gender === 1) { Girls.push(`${memberID}`)}}
  const Boyslist = Boys.length > 0 ? Boys.join(',') : "لا يوجد أولاد";
  const Girlslist = Girls.length > 0 ? Girls.join(',') : "لا توجد بنات";
 
     switch (args[0]) {
	   case "ولد":
	   case "بولد": {
                var id = Boyslist[Math.floor(Math.random() * Boyslist.length)];
                var Girlname = (await usersData.get(event.senderID).name);
                var Boyname = (await usersData.get(id).name);

                var arraytag = [];
                arraytag.push({id: event.senderID, tag: Girlname});
                arraytag.push({id: id, tag: Boyname});
      
                usersData.set(event.senderID, options = {money: money - 200, data: data.data})
        
                let Avatargirl = (await axios.get( `https://graph.facebook.com/${event.senderID}/picture?height=720&width=720&access_token=${TOKEN}`, { responseType: "arraybuffer" } )).data;
                fs.writeFileSync( __dirname + "/cache/1.png", Buffer.from(Avatargirl, "utf-8") );
                let Avatarboy = (await axios.get( `https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=${TOKEN}`, { responseType: "arraybuffer" } )).data; 
                fs.writeFileSync( __dirname + "/cache/2.png", Buffer.from(Avatarboy, "utf-8"));
        
                var Image = [];
                Image.push(fs.createReadStream(__dirname + "/cache/1.png"));
                Image.push(fs.createReadStream(__dirname + "/cache/2.png"));
        
                var msg = {body: `✨💙 🤭 لدينا زوجان هنا 💙✨\n       نسبة الرومنسية: ${LovePercent} %\n`+Girlname+" "+"💓"+" "+Boyname, mentions: arraytag, attachment: Image}
                return api.sendMessage(msg, event.threadID, event.messageID);
                //fs.unlinkSync(__dirname + '/cache/1.png');
                //fs.unlinkSync(__dirname + '/cache/2.png');
                break}
		     
           case "بنت":
	   case "ببنت": {
                var id = Girlslist[Math.floor(Math.random() * Girlslist.length)];
                var Boyname = (await usersData.getName(event.senderID));
                var Girlname = (await usersData.getName(id));

                var arraytag = [];
                arraytag.push({id: event.senderID, tag: Boyname});
                arraytag.push({id: id, tag: Girlname});
      
                usersData.set(event.senderID, options = {money: money - 200, data: data.data})
        
                let Avatarboy = (await axios.get( `https://graph.facebook.com/${event.senderID}/picture?height=720&width=720&access_token=${TOKEN}`, { responseType: "arraybuffer" } )).data;
                fs.writeFileSync( __dirname + "/cache/1.png", Buffer.from(Avatarboy, "utf-8") );
                let Avatargirl = (await axios.get( `https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=${TOKEN}`, { responseType: "arraybuffer" } )).data; 
                fs.writeFileSync( __dirname + "/cache/2.png", Buffer.from(Avatargirl, "utf-8"));
        
                var Image = [];
                Image.push(fs.createReadStream(__dirname + "/cache/1.png"));
                Image.push(fs.createReadStream(__dirname + "/cache/2.png"));
        
                var msg = {body: `✨💙 🤭 لدينا زوجان هنا 💙✨\n       نسبة الرومنسية: ${LovePercent} %\n`+Boyname+" "+"💓"+" "+Girlname, mentions: arraytag, attachment: Image}
                return api.sendMessage(msg, threadID, messageID);
                //fs.unlinkSync(__dirname + '/cache/1.png');
                //fs.unlinkSync(__dirname + '/cache/2.png');
                break}
		     
           default: { return api.sendMessage("🌹 تـم تحديـث الأمـࢪ، يمڪنڪ\nالآن الـزواج من ولـد أو بنـت على\nحـسـب ࢪغبـتـڪ، فـقـط اڪـتـب:\n[.زوجيني ولد] أو [.زوجيني بنت]", threadID, messageID) }
    }
}
