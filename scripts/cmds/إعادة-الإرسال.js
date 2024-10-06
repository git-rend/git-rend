module.exports = { config: {
		      name: "الرسائل-المحذوفة",
	              aliases: ["إعادة-إرسال-الرسائل-المحذوفة","إعادة الرسائل"],
		      version: "5.0",
		      author: "Sadman Anik",  // تعريب: محمد تانجيرو \\
		      countDown: 0,
		      role: 2,
		      description: { ar: "إعادة إرسال الرسائل المحذوفة"},
		      category: "Admins",
		      guide: { ar :"{pn} [on | off]"},
	              envConfig: { deltaNext: 5 }
	                   },
  

	onStart: async function ({ api, message, event, threadsData, args }) {
let resend = await threadsData.get(event.threadID, "settings.reSend");
		
			//console.log(resend)
    if(resend === undefined){
      await threadsData.set(event.threadID, true, "settings.reSend");
    }
    //console.log(await threadsData.get(event.threadID, "settings.reSend"))
		if (!["on", "off"].includes(args[0]))
			return message.reply("🌹 استعمل: on أو off")
		await threadsData.set(event.threadID, args[0] === "mam", "settings.reSend");
    console.log(await threadsData.get(event.threadID, "settings.reSend"))
    if(args[0] == "on"){
      if(!global.reSend.hasOwnProperty(event.threadID)){
    global.reSend[event.threadID] = []
    }
    global.reSend[event.threadID] = await api.getThreadHistory(event.threadID, 100, undefined)
}
		return message.reply(`🌹 لقد قمت بـ: ${args[0] === "on" ? "تشغيل" : "إيقاف"} إعادة إرسال الرسائل المحذوفة بنجاح ✅`);
	},

onChat: async function ({ api, threadsData, usersData, event, message }) {
  if(event.type !== "message_unsend"){
		let resend = await threadsData.get(event.threadID, "settings.reSend");
		if (!resend)
			return;
  
		if(!global.reSend.hasOwnProperty(event.threadID)){
    global.reSend[event.threadID] = []
    }
    global.reSend[event.threadID].push(event)

  if(global.reSend.length >50){
    global.reSend.shift()
      }
    }
  }
	}
