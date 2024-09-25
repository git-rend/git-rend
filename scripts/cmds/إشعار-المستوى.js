const deltaNext = global.GoatBot.configCommands.envCommands.rank.deltaNext;
const expToLevel = exp => Math.floor((1 + Math.sqrt(1 + 8 * exp / deltaNext)) / 2);
const { drive } = global.utils;
const fs = require("fs");

module.exports = { config: {
		      name: "إشعار-المستوى",
	              aliases: ["اشعار-المستوى","ارتفاع-المستوى"],
		      version: "1.4",
		      author: "NTKhang", // تعريب: محمد تانجيرو \\
		      countDown: 5,
		      role: 0,
		      description: { ar: "تشغيل أو إيقاف تشغيل إشعار إرتفاع المستوى"},
		      category: "rank",
		      guide: { ar: "{pn} [on | off]"},
		      envConfig: { deltaNext: 5 }
	                    },

	langs: { ar: { syntaxError: "استخدام خاطئ استخدم فقط:\n{pn} on أو off ✅",
		       turnedOn: "✅ تـم تشغيـل إشعـاࢪ إࢪتفـاع\nالمستوى في المجموعة بنجاح",
		       turnedOff: "✅ تـم إيقـاف إشعـاࢪ إࢪتفـاع\nالمستوى في المجموعة بنجاح",
		       onlyAdmin: "ليس لديك الصلاحية لاستخدام\nهذا الأمࢪ؛ فقط المسؤولون ✅",
		       notiMessage: "✅ لقد اࢪتفع مستواك بالبوت ✅\n🎉ا• %1 •ا🎉\n ༺ا-🌹━━━♡━━━🌹-ا༻\n           المستوى الجديد:\n     💙  ا[ %2 Lv ]ا 💙"
	       }     },

	onStart: async function ({ message, role, event, threadsData, args, getLang }) {
		if (role < 1)
			return message.reply(getLang("onlyAdmin"));
		if (!["on", "off"].includes(args[0]))
			return message.reply(getLang("syntaxError"));
		await threadsData.set(event.threadID, args[0] == "on", "settings.sendRankupMessage");
		return message.reply(args[0] == "on" ? getLang("turnedOn") : getLang("turnedOff"));
	},

	onChat: async function ({ threadsData, usersData, event, message, getLang }) {
		const threadData = await threadsData.get(event.threadID);
		const sendRankupMessage = threadData.settings.sendRankupMessage;
		if (!sendRankupMessage)
			return;
		const { exp } = await usersData.get(event.senderID);
		const currentLevel = expToLevel(exp);
		if (currentLevel > expToLevel(exp - 1)) {
			let customMessage = await threadsData.get(event.threadID, "data.rankup.message");
			let isTag = false;
			let userData;
			const formMessage = {};

			if (customMessage) {
				userData = await usersData.get(event.senderID);
				customMessage = customMessage
					// .replace(/{userName}/g, userData.name)
					.replace(/{oldRank}/g, currentLevel - 1)
					.replace(/{currentRank}/g, currentLevel);
				if (customMessage.includes("{userNameTag}")) {
					isTag = true;
					customMessage = customMessage.replace(/{userNameTag}/g, `@${userData.name}`);
				}
				else {
					customMessage = customMessage.replace(/{userName}/g, userData.name);
				}

				formMessage.body = customMessage;
			}
			else {
				const name = await usersData.getName(event.senderID);
				formMessage.body = getLang("notiMessage", name, currentLevel);
			}

			if (threadData.data.rankup?.attachments?.length > 0) {
				const files = threadData.data.rankup.attachments;
				const attachments = files.reduce((acc, file) => {
					acc.push(drive.getFile(file, "stream"));
					return acc;
				}, []);
				formMessage.attachment = (await Promise.allSettled(attachments))
					.filter(({ status }) => status == "fulfilled")
					.map(({ value }) => value);
			}

			if (isTag) {
				formMessage.mentions = [{
					tag: `@${userData.name}`,
					id: event.senderID
				}];
			}

			message.reply(formMessage);
		}
	}
};
