const fs = require("fs");
module.exports.config = {
                name: "ردودصوتية",
	            	version: "1.3",
            		author: "محمد تانجيرو",
            		countDown: 5,
            		role: 0,
	            	description: { ar: "ردود مبرمجة مصحوبة بملفات صوثية" },
	            	category: "no prefix",
	            	guide: { ar: "الكلمات المبرمجة" }
                         };
module.exports.onStart = function({ message, api, event, client, envGlobal, __GLOBAL }) {}
module.exports.onChat = function({ message, api, event, client, envGlobal, __GLOBAL }) {
  var { threadID, messageID } = event;
  let mhmd = event.body;

  if ( mhmd.toString() == "أكاني" || mhmd.toString() == "اكاني" || mhmd.toString() == "akane" || mhmd.toString() == "Akane") {
    var arama = {body: "🌹 أرا أرا، أكاني في الخدمة",
    attachment: fs.createReadStream(`${__dirname}/audios/arama.mp3`)}
    api.sendMessage(arama, threadID, messageID);
    api.setMessageReaction("🫶", messageID, (err) => {}, true)
        };
	
  if (mhmd.toString() == "باي" || mhmd.toString() == "بيباي" || mhmd.toString() == "بيبااي" || mhmd.toString() == "بيباااي" || mhmd.toString() == "بايباي" || mhmd.toString() == "بايو" || mhmd.toString() == "سايونارا" || mhmd.toString() == "سيونارا" || mhmd.toString() == "سيونرا" || mhmd.toString() == "سايونرا") {
    var arasa = {body: "بيباااي، سايونارا 👋",
    attachment: fs.createReadStream(`${__dirname}/audios/arasa.mp3`)}
    api.sendMessage(arasa, threadID, messageID);
    api.setMessageReaction("🫶", messageID, (err) => {}, true)
        };
}
