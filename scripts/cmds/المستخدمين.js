const { getTime } = global.utils;

module.exports = { config: {
		      name: "المستخدمين",
	              aliases: ["العضو"],
		      version: "1.4",
		      author: "NTKhang", // تعريب: محمد تانجيرو \\
		      countDown: 5,
		      role: 2,
		      description: {ar: "إدارة المستخدمين في النظام"},
		      category: "owner",
		      guide: {ar: " {pn} [بحث] [اسم العضو]: البحث عن المستخدمين في بيانات البوت عن طريق الاسم\n\n"
				+ " {pn} [حظر] [الآيدي | @تاغ | رد] [السبب]: لحظر استخدام البوت عن العضو من خلال (الآيدي أو التاغ أو رد على رسالته) باستخدام الروبوت\n\n"
				+ " {pn} [الغاءحظر] [الآيدي | @تاغ | رد]: لإلغاء حظر استخدام البوت عن العضو "
		           } },

	langs: { ar: { noUserFound: "🌹 لا يوجد في بيانات البوت\nعضو باسم: %1",
		       userFound: "🌹 يـوجـد %1 عـضـو بـهـذا\nالاسـم في قاعـدة البيانـات:\n\n%3\n%4",
		       uidRequired: "Uid of user to ban cannot be empty, please enter uid or tag or reply message of 1 user by user ban <uid> <reason>",
		       reasonRequired: "🌹 يجب إدخال سبب الحظࢪ\nبعد تعيين العضو المراد حظࢪه",
		       userHasBanned: "العضو: %2\nالآيدي: [%1]\n🌹 تـم حـظـࢪه مـن قبـل ✅\n🌹السبب: %3\nالوفت: %4",
		       userBanned: "العضو: %2\nالآيدي: [%1]\n🌹 تـم حـظـࢪه بـنـجـاح ✅\n🌹السبب: %3\nالوفت: %4",
		       uidRequiredUnban: "Uid of user to unban cannot be empty",
		       userNotBanned: "العضو: %2\nالآيدي: [%1]\n🌹 غير محظوࢪ من طࢪف البوت",
		       userUnbanned: "العضو: %2\nالآيدي: [%1]\n🌹 تـم إلغـاء حظـࢪه بنجـاح ✅"
	       }     },

	onStart: async function ({ args, usersData, message, event, prefix, getLang }) {
		const type = args[0];
		switch (type) {
			// find user
			case "بحث": {
				const allUser = await usersData.getAll();
				const keyWord = args.slice(1).join(" ");
				const result = allUser.filter(item => (item.name || "").toLowerCase().includes(keyWord.toLowerCase()));
				const msg = result.reduce((i, user) => i += `\n╭Name: ${user.name}\n╰ID: ${user.userID}`, "");
				message.reply(result.length == 0 ? getLang("noUserFound", keyWord) : getLang("userFound", result.length, keyWord, msg));
				break;
			}
			// ban user
			case "حظر": {
				let uid, reason;
				if (event.type == "message_reply") {
					uid = event.messageReply.senderID;
					reason = args.slice(1).join(" ");
				}
				else if (Object.keys(event.mentions).length > 0) {
					const { mentions } = event;
					uid = Object.keys(mentions)[0];
					reason = args.slice(1).join(" ").replace(mentions[uid], "");
				}
				else if (args[1]) {
					uid = args[1];
					reason = args.slice(2).join(" ");
				}
				else return message.SyntaxError();

				if (!uid)
					return message.reply(getLang("uidRequired"));
				if (!reason)
					return message.reply(getLang("reasonRequired", prefix));
				reason = reason.replace(/\s+/g, ' ');

				const userData = await usersData.get(uid);
				const name = userData.name;
				const status = userData.banned.status;

				if (status)
					return message.reply(getLang("userHasBanned", uid, name, userData.banned.reason, userData.banned.date));
				const time = getTime("DD/MM/YYYY HH:mm:ss");
				await usersData.set(uid, {
					banned: {
						status: true,
						reason,
						date: time
					}
				});
				message.reply(getLang("userBanned", uid, name, reason, time));
				break;
			}
			// unban user
			case "الغاءحظر": {
				let uid;
				if (event.type == "message_reply") {
					uid = event.messageReply.senderID;
				}
				else if (Object.keys(event.mentions).length > 0) {
					const { mentions } = event;
					uid = Object.keys(mentions)[0];
				}
				else if (args[1]) {
					uid = args[1];
				}
				else
					return message.SyntaxError();
				if (!uid)
					return message.reply(getLang("uidRequiredUnban"));
				const userData = await usersData.get(uid);
				const name = userData.name;
				const status = userData.banned.status;
				if (!status)
					return message.reply(getLang("userNotBanned", uid, name));
				await usersData.set(uid, {
					banned: {}
				});
				message.reply(getLang("userUnbanned", uid, name));
				break;
			}
			default:
				return message.reply("🌹 استخـدام خاطـئ، أڪتـب:\n[.اوامر المستخدمين] لـمـعـࢪفـة\nكيفية استخدام الأمࢪ الصحيحة")
		}
	}
};
