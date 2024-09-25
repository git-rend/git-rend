const { findUid } = global.utils;
const regExCheckURL = /^(http|https):\/\/[^ "]+$/;

module.exports = { config: {
		      name: "آيدي",
	              aliases: ["ايدع","آيدع","ايدي"],
		      version: "1.3",
		      author: "NTKhang", // تعريب + تعديل: محمد تانجيرو \\ 
		      countDown: 5,
		      role: 0,
		      description: { ar: "معرفة الآيدي الخاص بك، أو الشخص الي تعمل له تاغ، أو الي ترد على رسالة من رسائله"},
		      category: "info",
		      guide: { ar: "{pn} [فارغة | @تاغ | رد على رسالة]"}
	                    },
	langs: { ar: { syntaxError: "🌹 أتࢪك بعد الأمࢪ فاࢪغا أو اعمل\nتاغ حقيقي أو ࢪد على ࢪسالة ✅"}},

	onStart: async function ({ message, event, args, Reply, getLang, usersData }) {
		if (event.messageReply) {
			const usernamer = await usersData.getName(event.messageReply.senderID);
			return message.reply(`الاسم: ${usernamer}:\n ${event.messageReply.senderID}`);}
		if (!args[0]) {
			const username = await usersData.getName(event.senderID);
			return message.reply(`الاسم: ${username}:\n ${event.senderID}`);}
		if (args[0].match(regExCheckURL)) {
			let msg = '';
			for (const link of args) {
				try {
					const uid = await findUid(link);
					msg += `${link} => ${uid}\n`;
				}
				catch (e) {
					msg += `${link} (ERROR) => ${e.message}\n`;
				}
			}
			message.reply(msg);
			return;
		}

		let msg = "";
		const { mentions } = event;
		for (const id in mentions)
			msg += `الاسم: ${mentions[id].replace("@", "")}:\n${id}\n`;
		message.reply(msg || getLang("syntaxError"));
	}
};
