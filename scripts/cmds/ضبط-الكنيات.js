async function checkShortCut(nickname, uid, usersData) {
	try {
		/\{userName\}/gi.test(nickname) ? nickname = nickname.replace(/\{userName\}/gi, await usersData.getName(uid)) : null;
		/\{userID\}/gi.test(nickname) ? nickname = nickname.replace(/\{userID\}/gi, uid) : null;
		return nickname;
	}
	catch (e) {
		return nickname;
	}
}

module.exports = { config: {
		      name: "ضبط-الكنيات",
	              aliases: ["ضبط3","ضبط-الكنيات"],
		      version: "1.5",
		      author: "NTKhang", // تعريب: محمد تانجيرو \\
		      countDown: 5,
		      role: 0,
		      description: { ar: "تغيير الكنية لجميع الأعضاء في الدردشة أو الأعضاء الي تعمل لهم تاغ"},
		      category: "box chat",
		      guide: { ar: { body: " {pn} [الكنية]: تغيير كنيتك\n"
					 + " {pn} [@تاغ] [الكنية]: تغيير كنية الأعضاء الي عملت لهم تاغ\n"
					 + " {pn} [الكل] [الكنية]: تغيير كنية جميع الأعضاء في المجموعة\n"
					 + "\n\nمع القيم التالية:"
					 + " + {userName}: اسم العضو"
			                 + " + {userID}: آيدي العضو"
					 + " مثال: (أنظر الصورة)",
	                             attachment: { [`${__dirname}/assets/guide/setname_1.png`]: "https://i.ibb.co/gFh23zb/guide1.png",
		                                   [`${__dirname}/assets/guide/setname_2.png`]: "https://i.ibb.co/BNWHKgj/guide2.png"
			   } }     }             },

	langs: { ar: { error: "حدث خطأ، حاول إيقاف ميزة رابط الدعوة في المجموعة وحاول مرة أخرى لاحقًا"}},

	onStart: async function ({ args, message, event, api, usersData, getLang }) {
		const mentions = Object.keys(event.mentions);
		let uids = [];
		let nickname = args.join(" ");

		if (args[0] === "الكل" || mentions.includes(event.threadID)) {
			uids = (await api.getThreadInfo(event.threadID)).participantIDs;
			nickname = args[0] === "الكل" ? args.slice(1).join(" ") : nickname.replace(event.mentions[event.threadID], "").trim();
		}
		else if (mentions.length) {
			uids = mentions;
			const allName = new RegExp(
				Object.values(event.mentions)
					.map(name => name.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")) // fix error when name has special characters
					.join("|")
				, "g"
			);
			nickname = nickname.replace(allName, "").trim();
		}
		else {
			uids = [event.senderID];
			nickname = nickname.trim();
		}

		try {
			const uid = uids.shift();
			await api.changeNickname(await checkShortCut(nickname, uid, usersData), event.threadID, uid);
		}
		catch (e) {
			return message.reply(getLang("error"));
		}

		for (const uid of uids)
			await api.changeNickname(await checkShortCut(nickname, uid, usersData), event.threadID, uid);
	}
};
