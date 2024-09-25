function sleep(time) { return new Promise((resolve) => setTimeout(resolve, time))}

module.exports = { config: {
		      name: "تصفية",
		      version: "1.6",
		      author: "NTKhang", // تعريب: محمد تانجيرو \\
		      countDown: 5,
		      role: 1,
		      description: { ar: "تصفية أعضاء المجموعة حسب عدد الرسائل أو الحسابات المقفلة"},
		      category: "box chat",
		      guide: { ar: " {pn} [عدد الرسائل | المقفلة]"}
	                   },

	langs: { ar: { needAdmin: "🌹 يـجـب رفـعـي مـسـؤولـة\nحتى أستطيع تصفية الأعضاء",
		       confirm: "🌹 هـل أنـت متـأڪد مـن أنڪ\nتࢪيـد طࢪد ڪل الأعضـاء الذيـن\nلـديهـم أقـل مـن %1 ࢪسـالـة ؟!\n\nتـفـاعـل مـع هـذه الـࢪسـالـة بـأي\nإيـمـوجـي تࢪيـد؛ لتأڪيد الطـࢪد",
		       kickByBlock: "✅ تم طࢪد %1 عضو، من الذين\nلديـهم حسابات مقفـلة؛ بنجـاح.",
		       kickByMsg: "✅ تم طࢪد %1 عضو، من الذين\nلديهم أقل من %2 ࢪسالة؛ بنجاح.",
		       kickError: "🌹 حــدث خــطـأ مــا ولــم\nأســتــطــع طــࢪد %1 عــضــو.\nا❐ا %2",
		       noBlock: "🌹 لا تـوجـد حسـابات مـقفـلة.",
		       noMsg: "🌹 لا يوجد أعضاء لديهم أقل من\n%1 ࢪسالة، يبدو أن الڪل أحياء ✅"
	       }     },

	onStart: async function ({ api, args, threadsData, message, event, commandName, getLang }) {
		const threadData = await threadsData.get(event.threadID);
		if (!threadData.adminIDs.includes(api.getCurrentUserID()))
			return message.reply(getLang("needAdmin"));

		if (!isNaN(args[0])) {
			message.reply(getLang("confirm", args[0]), (err, info) => {
				global.GoatBot.onReaction.set(info.messageID, {
					author: event.senderID,
					messageID: info.messageID,
					minimum: Number(args[0]),
					commandName
				});
			});
		}
		else if (args[0] == "المقفلة") {
			const threadData = await api.getThreadInfo(event.threadID);
			const membersBlocked = threadData.userInfo.filter(user => user.type !== "User");
			const errors = [];
			const success = [];
			for (const user of membersBlocked) {
				if (user.type !== "User" && !threadData.adminIDs.some(id => id == user.id)) {
					try {
						await api.removeUserFromGroup(user.id, event.threadID);
						success.push(user.id);
					}
					catch (e) {
						errors.push(user.name);
					}
					await sleep(700);
				}
			}

			let msg = "";
			if (success.length > 0)
				msg += `${getLang("kickByBlock", success.length)}\n`;
			if (errors.length > 0)
				msg += `${getLang("kickError", errors.length, errors.join("\n"))}\n`;
			if (msg == "")
				msg += getLang("noBlock");
			message.reply(msg);
		}
		else
			message.SyntaxError();
	},

	onReaction: async function ({ api, Reaction, event, threadsData, message, getLang }) {
		const { minimum = 1, author } = Reaction;
		if (event.userID != author)
			return;
		const threadData = await threadsData.get(event.threadID);
		const botID = api.getCurrentUserID();
		const membersCountLess = threadData.members.filter(member =>
			member.count < minimum
			&& member.inGroup == true
			// ignore bot and admin box
			&& member.userID != botID
			&& !threadData.adminIDs.some(id => id == member.userID)
		);
		const errors = [];
		const success = [];
		for (const member of membersCountLess) {
			try {
				await api.removeUserFromGroup(member.userID, event.threadID);
				success.push(member.userID);
			}
			catch (e) {
				errors.push(member.name);
			}
			await sleep(700);
		}

		let msg = "";
		if (success.length > 0)
			msg += `${getLang("kickByMsg", success.length, minimum)}\n`;
		if (errors.length > 0)
			msg += `${getLang("kickError", errors.length, errors.join("\n"))}\n`;
		if (msg == "")
			msg += getLang("noMsg", minimum);
		message.reply(msg);
	}
};
