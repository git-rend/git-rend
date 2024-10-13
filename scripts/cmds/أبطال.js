module.exports.config = {
                  name: "أبطال",
                  aliases: ["ابطال"],
		  version: "1.3",
		  author: "محمد تانجيرو",
		  countDown: 60,
		  role: 0,
		  description: { ar: "تاخذ رصيد مقابل العمل" },
		  category: "money",
		  guide: { ar: "{pn}" }
			 };

module.exports.langs = { "ar": { antitheft: "لا تسࢪق عمل الآخࢪين 😏\nاعمل بنفسك يا نصاب 🙎‍♀️",
				 isnan: "✨ أدخل ࢪقم من 1 لـ 10 🙄",
				 wrongnumber: "✨ الࢪقم الذي أدخلته غيࢪ\nموجود في القائمة 🙄🫠",
	                         cooldown: "🌹 مازالـت إصاباتـك لـم تشـف \nبعـد من قتـالك الأخيـࢪ، عد بعد:\n   ا[ %1 دقيقة و %2 ثانية ]ا",
		       }       }; 
module.exports.onReply = async ({ event, api, message, Reply, usersData, getLang }) => {
    const { threadID, messageID, senderID } = event;
    const userData = await usersData.get(senderID) || {};
if (Reply.author != senderID) 
return message.reply(getLang("antitheft"));

var coinsmhmd1 = Math.floor(Math.random() * 20000) + 5000;
var coinsmhmd2 = Math.floor(Math.random() * 19000) + 4000;
var coinsmhmd3 = Math.floor(Math.random() * 18000) + 3000;
var coinsmhmd4 = Math.floor(Math.random() * 17000) + 2000;
var coinsmhmd5 = Math.floor(Math.random() * 16000) + 1000;
  
var mhmd1 = ['تحكمت بجنود العدو وأعطيتهم\nمن قوتك، وجعلتهم جنودك،\nوقمت بتحجير عدوك، وبعدها\nقمت بتفتيته حتى لا يرجع.'];
var work1 = mhmd1[Math.floor(Math.random() * mhmd1.length)]; 

var mhmd2 = ['حولت نفسك إلى رجل جليدي،\nوقمت بتجميد عدوك، وبعد ذلك\nكسرته إلى قطع جليدية صغيرة.'];
var work2 = mhmd2[Math.floor(Math.random() * mhmd2.length)]; 

var mhmd3 =[`كاد العدو أن يقضي عليك، ولكن\nأنت وحش شبيه بالقرد استطاع\nجلدك أن يتحمل الضربات وقتلته\nقفزت بعد ذلك عاليا للابتعاد من\nردة فعله الأخيرة قبل موته.`];
var work3 = mhmd3[Math.floor(Math.random() * mhmd3.length)]; 

var mhmd4 = ['قام العدو بتقطيع جسدك، ولكن\nأنت لديك القدرة على الشفاء\nمن الجروح، فقمت بشفاء نفسك\nوقطعته بمخالبك المعدنية بقوة.'];
var work4 = mhmd4[Math.floor(Math.random() * mhmd4.length)]; 

var mhmd5 = ['قمتِ بالتحكم بالطقس وأنشأتِ\nعواصف قوية وبرق،ثم قضيتِ\nعلى عدوكِ، وخرجتِ من منطقة\nالعدو بقدرة الطيران التي عندكِ.'];
var work5 = mhmd5[Math.floor(Math.random() * mhmd5.length)];

var msg = "";
    switch(Reply.type) {
        case "اختيار": {
            switch(event.body) {
                case "1": msg = `✨أنت البطل أبوكاليبس الآن🗿\n\n${work1}\n\nأجرك مقابل عملك البطولي هو:\n           ا[ ${coinsmhmd1} $ ]ا`; await usersData.set(senderID, {money: userData.money + coinsmhmd1, data: userData.data}); break;            
                case "2": msg = `✨أنت البطل آيس مان الآن❄\n\n${work2}\n\nأجرك مقابل عملك البطولي هو:\n           ا[ ${coinsmhmd2} $ ]ا`; await usersData.set(senderID, {money: userData.money + coinsmhmd2, data: userData.data}); break;
                case "3": msg = `✨أنت البطل ذا بيست الآن🦧\n\n${work3}\n\nأجرك مقابل عملك البطولي هو:\n           ا[ ${coinsmhmd3} $ ]ا`; await usersData.set(senderID, {money: userData.money + coinsmhmd3, data: userData.data}); break;
                case "4": msg = `✨أنت البطل وولفرين الآن🎯\n\n${work4}\n\nأجرك مقابل عملك البطولي هو:\n           ا[ ${coinsmhmd4} $ ]ا`; await usersData.set(senderID, {money: userData.money + coinsmhmd4, data: userData.data}); break;
                case "5": msg = `✨أنت البطل ستورم الآن🌀\n\n${work5}\n\nأجرك مقابل عملك البطولي هو:\n           ا[ ${coinsmhmd5} $ ]ا` ; await usersData.set(senderID, {money: userData.money + coinsmhmd5, data: userData.data}); break;
                default: break;
            };
            const choose = parseInt(event.body);
            if (isNaN(event.body)) return message.reply(getLang("isnan"));
            if (choose > 10 || choose < 1) return message.reply(getLang("wrongnumber"));
            api.unsendMessage(Reply.messageID);
            if (msg == "⚡️Chưa update...") {
                msg = "⚡️التحديث قريبا...";
            };
            return api.sendMessage(`${msg}`, threadID, async () => {
            userData.data.heroes = Date.now();
	    await usersData.set(senderID, { data: userData.data });
        });

    };
}
}; 
module.exports.onStart = async ({ args, commandName, event, api, usersData, globalData, getLang }) => {
    const { threadID, messageID, senderID } = event;
    const cooldown = 1800000;
    let data = (await usersData.get(senderID)) || {};
    if (typeof data !== "undefined" && cooldown - (Date.now() - data.data.heroes) > 0) {
        var time = cooldown - (Date.now() - data.data.heroes),
            minutes = Math.floor(time / 60000),
            seconds = ((time % 60000) / 1000).toFixed(0); 
        return api.sendMessage(getLang("cooldown", minutes, (seconds < 10 ? "0" + seconds : seconds)), threadID, messageID);
    }
    else {    
    return api.sendMessage("🌸 تمثل دورا من أدوار الأبطال\nالخارقين من كرتون x-man:\n༺ا-🌹━━━♡━━━🌹-ا༻\n\n✨ 1 =≻ ⚔️ أبوكاليبس 🗿\n✨ 2 =≻ ⚔️ آيس مان ❄\n✨ 3 =≻ ⚔️ ذا بيست 🦧\n✨ 4 => ⚔️ وولفرين 🎯\n✨ 5 =≻ ⚔️ ستورم 🌀\n\n༺ا-🌹━━━♡━━━🌹-ا༻\n    🌸 رد على الرسالة برقم\n      البطل من 1 إلى 5 🌸", threadID, (error, info) => {
        data.data.heroes = Date.now();
        global.GoatBot.onReply.set(info.messageID, {
            type: "اختيار",
            commandName,
            author: event.senderID,
            messageID: info.messageID
          })  
        }, messageID)
    }
}
