const fs = require("fs");
module.exports.config = {
                  name: "ردودللمطور",
            		  version: "1.3",
            		  author: "محمد تانجيرو",
            		  countDown: 5,
            		  role: 2,
            		  description: { ar: "ردود البوت على بعض الرسائل دون الحاجة إلى بادئة" },
            		  category: "no prefix",
            		  guide: { ar: "لا تحتاج للبادئة (.)" }
                        };
module.exports.onStart = function({ message, api, event, client, envGlobal, __GLOBAL }) { }
module.exports.onChat = async function({ message, api, event, client, envGlobal, __GLOBAL }) {
  var { threadID, messageID, reason, senderID } = event;
  let mhmd = event.body;

if (mhmd.includes ("هلاوات")) {
    return api.sendMessage("هلاوات",
  event.threadID,event.messageID)};
  
};
