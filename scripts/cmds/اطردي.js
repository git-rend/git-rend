module.exports = { config: {
		      name: "اطردي",
		      aliases: ["طرد","اطرد"],
	              version: "1.3",
		      author: "NTKhang", // تعريب: محمد تانجيرو \\
		      countDown: 5,
		      role: 1,
		      description: { ar: "طرد العضو (الي تعمل له تاغ أو الي ترد على رسالته) من المجموعة"},
		      category: "box chat",
		      guide: {ar: " {pn} [رد | @تاغ]"}
	                    },

	langs: {ar: { needAdmin: "🌹 يـجـب رفـعـي مسـؤولـة\nحتى أستطيـع طـرد الأعضـاء"}},

	onStart: async function ({ message, event, args, threadsData, api, getLang }) {
		const adminIDs = await threadsData.get(event.threadID, "adminIDs");
		if (!adminIDs.includes(api.getCurrentUserID()))
			return message.reply(getLang("needAdmin"));
		async function kickAndCheckError(uid) {
			try {
				await api.removeUserFromGroup(uid, event.threadID);
			}
			catch (e) {
				message.reply(getLang("needAdmin"));
				return "ERROR";
			}
		}
		if (!args[0]) {
			if (!event.messageReply)
				return message.SyntaxError();
			await kickAndCheckError(event.messageReply.senderID);
		}
		else {
			const uids = Object.keys(event.mentions);
			if (uids.length === 0)
				return message.SyntaxError();
			if (await kickAndCheckError(uids.shift()) === "ERROR")
				return;
			for (const uid of uids)
				api.removeUserFromGroup(uid, event.threadID);
		}
	}
};
