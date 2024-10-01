const fs = require("fs");
module.exports.config = {
	          name: "تفاعل-البوت",
                  aliases: ["التفاعلات"],
                  version: "2.1.1",
                  author: "محمد تانجيرو", 
	          countdown: "5",
	          role: 0,
                  description: { ar: "تفاعلات البوت مع الرسائل"},
	          category: "no prefix",
                  guide: { ar: "لا تحتاج استخدام الأمر"}
                         };

module.exports.onStart = function({ api, event, client, __GLOBAL }) {};
module.exports.onChat = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	let react = event.body;
	if(react.includes("تعطي") || react.includes("زب") || react.includes("طيز") || react.includes("بزول") ||  react.includes("بزاز") || react.includes("سوة") || react.includes("🖕") || react.includes("🤢") || react.includes("بغل") || react.includes("خنزير") || react.includes("حمار") || react.includes("حيوان") || react.includes("نعال") || react.includes("زمال") || react.includes("كسمج") || react.includes(" كس") || react.includes("كسمك") || react.includes("كواد") || react.includes("فرخ") || react.includes("كحبة") || react.includes("قحبة") || react.includes("كحبه") || react.includes("قحبه") || react.includes("كلب") || react.includes("نيك")) {
		var msg = {
				body: ""
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("❌", event.messageID, (err) => {}, true)
          };
    if(react.includes("ريم") || react.includes("حب") || react.includes("احبك") || react.includes("بوت") || react.includes("سلام عليكم") || react.includes("غوجو") || react.includes("مطور") || react.includes("محمد") || react.includes("صباح") || react.includes("تصبح") ||  react.includes("ثباح") || react.includes("صباحو") || react.includes("هلا") || react.includes("هلاوات") || react.includes("شلونكم") || react.includes("حمد") || react.includes("روع") || react.includes("قلب")) {
      var heart = {
				body: ""
			}
			api.sendMessage(heart, threadID, messageID);
    api.setMessageReaction("💙", event.messageID, (err) => {}, true)
          };
    if(react.includes("معع") || react.includes("خروف") || react.includes("معز") || react.includes("🐐")) {
      var sad = {
				body: ""
			}
			api.sendMessage(sad, threadID, messageID);
    api.setMessageReaction("🐐", event.messageID, (err) => {}, true)
	       	};
  
    if(react.includes("هه") || react.includes("hh") ||   react.includes("😜") || react.includes("😆") || react.includes("😃") || react.includes("😅") || react.includes("😁") || react.includes("😄") || react.includes("😛") ||react.includes("😂") || react.includes(":)") || react.includes("🙂") || react.includes("😹") || react.includes("🤣") || react.includes("😀") || react.includes("😸") || react.includes("😺") ||  react.includes("😝")) {
       var msg = {
         body: "" 
       } 
       api.sendMessage(msg, threadID, messageID); 
    api.setMessageReaction("😹", event.messageID, (err) => {}, true)
         };
    if(react.includes("حزن") || react.includes("مات") || react.includes("توفي") || react.includes("صدم") || react.includes("اف") || react.includes("أف") || react.includes("احزان") || react.includes("رحم") || react.includes("جرح") || react.includes("اخ") || react.includes("ضايج") || react.includes("زعلان") || react.includes("زعل") || react.includes("أسر") || react.includes("اسر") || react.includes("ضجر") || react.includes("كئيب") || react.includes(" 😥") || react.includes("😰") || react.includes("😨") || react.includes("😢") || react.includes("موت") || react.includes("😔") || react.includes("😞") || react.includes("شغل") ||  react.includes("تعب") ||  react.includes("عيان") || react.includes("عييت") || react.includes("😭")) {
      var sad = {
				body: ""
			}
			api.sendMessage(lab, threadID, messageID);
    api.setMessageReaction("😥", event.messageID, (err) => {}, true)
          };
    if(react.includes("افويسد") || react.includes("Love") || react.includes("love") || react.includes("lab") || react.includes("😊") || react.includes("😗") || react.includes("😙") || react.includes("😘") || react.includes("🐢") || react.includes("😍") || react.includes("🤭") || react.includes("🥰") || react.includes("😇") || react.includes("🤡")) {
      var lab = {
				body: ""
			}
			api.sendMessage(lab, threadID, messageID);
    api.setMessageReaction("🙄", event.messageID, (err) => {}, true)
               };
    if(react.includes("🐸")) {
    var lab = { body: "أكره الضفادع 🥲" }
      
			api.sendMessage(lab, threadID, messageID);
    api.setMessageReaction("👎", event.messageID, (err) => {}, true)
    }  
                                                                                                                                                      }
