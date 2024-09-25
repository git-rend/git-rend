module.exports = { config: {
		      name: "محظورات",
		      aliases: ["كلمات-سيئة","كلمات_سيئة","كلام_محظور","كلام-محظور"],
		      version: "1.4",
		      author: "NTKhang", //"نعريب: "محمد تانجيرو\\
		      countDown: 5,
		      role: 1,
		      description: { ar: "تشغيل / إيقاف / إضافة / إزالة تحذير الكلمات السيئة، إذا خالف أحد الأعضاء سيتم تحذيره، وفي المرة الثانية سيتم طرده من مربع الدردشة"},
		      category: "box chat",
		      guide: { ar: " {pn} [اضافة] [الكلمات]: إضافة الكلمات المحظورة (يمكنك إضافة كلمات متعددة مفصولة بفواصل \"،\" أو سلاشات عمودية \"|\")\n"
				 + " {pn} [حذف] [الكلمات]: حذف الكلمات المحظورة (يمكنك حذف كلمات متعددة مفصولة بفواصل \"،\" أو سلاشات عمودية \"|\")\n"
				 + " {pn} [قائمة] <hide | leave blank>: turn off warning (add \"hide\" to hide banned words)\n"
				 + " {pn} [ازالةتحذير] [الآيدي | @تاغ]: إزالة تحذير واحد لعضو واحد\n"
				 + " {pn} [on]: تشغيل التحذير\n"
				 + " {pn} [off]: إيقاف التحذير"
                           } },

	langs: { ar: { onText: "on",
	               offText: "off",
		       onlyAdmin: "⚠️ | Only admins can add banned words to the list",
		       missingWords: "🌹 لم تدخل أي ڪلمات لحظࢪها\nأكتب: {pn} اضافة [الكلمة]",
		       addedSuccess: "تمت إضافة كلمة %1 بنجاح ✅",
		       alreadyExist: "🌹 %1 كلمة محظورة من قبل:\n%2",
		       tooShort: "⚠️ | %1 banned words cannot be added to the list because they are shorter than 2 characters: %2",
		       onlyAdmin2: "⚠️ | Only admins can delete banned words from the list",
		       missingWords2: "⚠️ | You haven't entered the words to delete",
		       deletedSuccess: "✅ | Deleted %1 banned words from the list",
		       notExist: "❌ | %1 banned words do not exist in the list before: %2",
		       emptyList: "⚠️ | The list of banned words in your group is currently empty",
		       badWordsList: "📑 | The list of banned words in your group: %1",
		       onlyAdmin3: "⚠️ | Only admins can %1 this feature",
		       turnedOnOrOff: "✅ | Banned words warning has been %1",
		       onlyAdmin4: "⚠️ | Only admins can delete banned words warning",
		       missingTarget: "⚠️ | You haven't entered user ID or tagged user",
		       notWarned: "⚠️ | User %1 has not been warned for banned words",
		       removedWarn: "✅ | User %1 | %2 has been removed 1 banned words warning",
		       warned: "⚠️ | Banned words \"%1\" have been detected in your message, if you continue to violate you will be kicked from the group.",
		       warned2: "⚠️ | Banned words \"%1\" have been detected in your message, you have violated 2 times and will be kicked from the group.",
		       needAdmin: "Bot needs admin privileges to kick banned members",
		       unwarned: "✅ | Removed banned words warning of user %1 | %2"
               }     },

	onStart: async function ({ message, event, args, threadsData, usersData, role, getLang }) {
		if (!await threadsData.get(event.threadID, "data.badWords"))
			await threadsData.set(event.threadID, {
				words: [],
				violationUsers: {}
			}, "data.badWords");

		const badWords = await threadsData.get(event.threadID, "data.badWords.words", []);

		switch (args[0]) {
			case "اضافة": {
				if (role < 1)
					return message.reply(getLang("onlyAdmin"));
				const words = args.slice(1).join(" ").split(/[،|]/);
				if (words.length === 0)
					return message.reply(getLang("missingWords"));
				const badWordsExist = [];
				const success = [];
				const failed = [];
				for (const word of words) {
					const oldIndex = badWords.indexOf(word);
					if (oldIndex === -1) {
						badWords.push(word);
						success.push(word);
					}
					else if (oldIndex > -1) {
						badWordsExist.push(word);
					}
					else
						failed.push(word);
				}
				await threadsData.set(event.threadID, badWords, "data.badWords.words");
				message.reply(
					success.length > 0 ? getLang("addedSuccess", success.length) : ""
						+ (badWordsExist.length > 0 ? getLang("alreadyExist", badWordsExist.length, badWordsExist.map(word => hideWord(word)).join(", ")) : "")
						+ (failed.length > 0 ? getLang("tooShort", failed.length, failed.join(", ")) : "")
				);
				break;
			}
			case "حذف":
			case "ازالة":
			case "إزالة":
			case "مسح": {
				if (role < 1)
					return message.reply(getLang("onlyAdmin2"));
				const words = args.slice(1).join(" ").split(/[،|]/);
				if (words.length === 0)
					return message.reply(getLang("missingWords2"));
				const success = [];
				const failed = [];
				for (const word of words) {
					const oldIndex = badWords.indexOf(word);
					if (oldIndex > -1) {
						badWords.splice(oldIndex, 1);
						success.push(word);
					}
					else
						failed.push(word);
				}
				await threadsData.set(event.threadID, badWords, "data.badWords.words");
				message.reply(
					(success.length > 0 ? getLang("deletedSuccess", success.length) : "")
					+ (failed.length > 0 ? getLang("notExist", failed.length, failed.join(", ")) : "")
				);
				break;
			}
			case "قائمة":
			case "القائمة":
			case "الكل": {
				if (badWords.length === 0)
					return message.reply(getLang("emptyList"));
				message.reply(getLang("badWordsList", args[1] === "hide" ? badWords.map(word => hideWord(word)).join(", ") : badWords.join(", ")));
				break;
			}
			case "on": {
				if (role < 1)
					return message.reply(getLang("onlyAdmin3", getLang("onText")));
				await threadsData.set(event.threadID, true, "settings.badWords");
				message.reply(getLang("turnedOnOrOff", getLang("onText")));
				break;
			}
			case "off": {
				if (role < 1)
					return message.reply(getLang("onlyAdmin3", getLang("offText")));
				await threadsData.set(event.threadID, false, "settings.badWords");
				message.reply(getLang("turnedOnOrOff", getLang("offText")));
				break;
			}
			case "unwarn": {
				if (role < 1)
					return message.reply(getLang("onlyAdmin4"));
				let userID;
				if (Object.keys(event.mentions)[0])
					userID = Object.keys(event.mentions)[0];
				else if (args[1])
					userID = args[1];
				else if (event.messageReply)
					userID = event.messageReply.senderID;
				if (isNaN(userID))
					return message.reply(getLang("missingTarget"));
				const violationUsers = await threadsData.get(event.threadID, "data.badWords.violationUsers", {});
				if (!violationUsers[userID])
					return message.reply(getLang("notWarned", userID));
				violationUsers[userID]--;
				await threadsData.set(event.threadID, violationUsers, "data.badWords.violationUsers");
				const userName = await usersData.getName(userID);
				message.reply(getLang("unwarned", userID, userName));
			}
		}
	},

	onChat: async function ({ message, event, api, threadsData, prefix, getLang }) {
		if (!event.body)
			return;
		const threadData = global.db.allThreadData.find(t => t.threadID === event.threadID) || await threadsData.create(event.threadID);
		const isEnabled = threadData.settings.badWords;
		if (!isEnabled)
			return;
		const allAliases = [...(global.GoatBot.commands.get("badwords").config.aliases || []), ...(threadData.data.aliases?.["badwords"] || [])];
		const isCommand = allAliases.some(a => event.body.startsWith(prefix + a));
		if (isCommand)
			return;
		const badWordList = threadData.data.badWords?.words;
		if (!badWordList || badWordList.length === 0)
			return;
		const violationUsers = threadData.data.badWords?.violationUsers || {};

		for (const word of badWordList) {
			if (event.body.match(new RegExp(`\\b${word}\\b`, "gi"))) {
				if ((violationUsers[event.senderID] || 0) < 1) {
					message.reply(getLang("warned", word));
					violationUsers[event.senderID] = violationUsers[event.senderID] ? violationUsers[event.senderID] + 1 : 1;
					await threadsData.set(event.threadID, violationUsers, "data.badWords.violationUsers");
					return;
				}
				else {
					await message.reply(getLang("warned2", word));
					api.removeUserFromGroup(event.senderID, event.threadID, (err) => {
						if (err)
							return message.reply(getLang("needAdmin"), (e, info) => {
								let { onEvent } = global.GoatBot;
								onEvent.push({
									messageID: info.messageID,
									onStart: ({ event }) => {
										if (event.logMessageType === "log:thread-admins" && event.logMessageData.ADMIN_EVENT == "add_admin") {
											const { TARGET_ID } = event.logMessageData;
											if (TARGET_ID == api.getCurrentUserID())
												api.removeUserFromGroup(event.senderID, event.threadID, () => onEvent = onEvent.filter(item => item.messageID != info.messageID));
										}
									}
								});
							});
					});
				}
			}
		}
	}
};


function hideWord(str) {
	return str.length == 2 ?
		str[0] + "*" :
		str[0] + "*".repeat(str.length - 2) + str[str.length - 1];
}
