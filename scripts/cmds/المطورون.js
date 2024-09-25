const { config } = global.GoatBot;
const { writeFileSync } = require("fs-extra");

module.exports = { config: {
		      name: "المطورون",
		      version: "1.6",
		      author: "NTKhang",
		      countDown: 5,
		      role: 2,
		      description: { ar: "إضافة، حذف، أو رؤية قائمة المطورين" },
		      category: "box chat",
		      guide: { ar: ' {pn} [اضافة] [الآيدي | @تاغ]: إضافة عضو إلى قائمة مطوري البوت\n'
			         + ' {pn} [حذف] [الآيدي | @تاغ]: حذف عضو من قائمة مطوري البوت\n'
			         + ' {pn} [القائمة | قائمة]: قائمة مطوري البوت'
	                   } },

	langs: { ar: { added: "✅ تم إضافة %1 عضو إلى قائمة\nمطوࢪي البوت، الأعضاء هم:\n%2",
		       alreadyAdmin: "\n\n🌹 %1 عـضـو مـوجـود مـسـبـقـا\nفي قـائـمـة مـطـوࢪي الـبـوت ✅:\n%2",
		       missingIdAdd: "أدخل آيدي المستخـدم أو تـاغ\nله بعد ڪلمة (اضافة) لإضافته\nإلى قائمـة مطـوࢪي البـوت ✅",
		       removed: "✅ تم حذف %1 عضو من قائمة\nمطـوࢪي البـوت، الأعضـاء هـم:\n%2",
		       notAdmin: "🌹 %1 عـضـو غير مـوجـود فـي\n قـائـمـة مـطـوࢪي الـبـوت ✅:\n%2",
		       missingIdRemove: "أدخل آيدي المستخـدم أو تـاغ\nله بعد ڪلمة (اضافة) لحذفـه\nمن قائمـة مطـوࢪي البـوت ✅",
		       listAdmin: "✅_ قائمة مطوࢪي البوت _✅\n%1"
	       }     },

	onStart: async function ({ message, args, usersData, event, getLang }) {
		switch (args[0]) {
			case "اضافة": {
				if (args[1]) {
					let uids = [];
					if (Object.keys(event.mentions).length > 0)
						uids = Object.keys(event.mentions);
					else if (event.messageReply)
						uids.push(event.messageReply.senderID);
					else
						uids = args.filter(arg => !isNaN(arg));
					const notAdminIds = [];
					const adminIds = [];
					for (const uid of uids) {
						if (config.adminBot.includes(uid))
							adminIds.push(uid);
						else
							notAdminIds.push(uid);
					}

					config.adminBot.push(...notAdminIds);
					const getNames = await Promise.all(uids.map(uid => usersData.getName(uid).then(name => ({ uid, name }))));
					writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));
					return message.reply(
						(notAdminIds.length > 0 ? getLang("added", notAdminIds.length, getNames.map(({ uid, name }) => `❒ الاسم: ${name}\n❒ آيدي: (${uid})`).join("\n")) : "")
						+ (adminIds.length > 0 ? getLang("alreadyAdmin", adminIds.length, adminIds.map(uid => `❒ آيدي: (${uid})`).join("\n")) : "")
					);
				}
				else
					return message.reply(getLang("missingIdAdd"));
			}
			case "حذف": {
				if (args[1]) {
					let uids = [];
					if (Object.keys(event.mentions).length > 0)
						uids = Object.keys(event.mentions)[0];
					else
						uids = args.filter(arg => !isNaN(arg));
					const notAdminIds = [];
					const adminIds = [];
					for (const uid of uids) {
						if (config.adminBot.includes(uid))
							adminIds.push(uid);
						else
							notAdminIds.push(uid);
					}
					for (const uid of adminIds)
						config.adminBot.splice(config.adminBot.indexOf(uid), 1);
					const getNames = await Promise.all(adminIds.map(uid => usersData.getName(uid).then(name => ({ uid, name }))));
					writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));
					return message.reply(
						(adminIds.length > 0 ? getLang("removed", adminIds.length, getNames.map(({ uid, name }) => `❒ الاسم: ${name}\n❒ آيدي: (${uid})`).join("\n")) : "")
						+ (notAdminIds.length > 0 ? getLang("notAdmin", notAdminIds.length, notAdminIds.map(uid => `❒ آيدي: (${uid})`).join("\n")) : "")
					);
				}
				else
					return message.reply(getLang("missingIdRemove"));
			}
			case "القائمة":
			case "قائمة": {
				const getNames = await Promise.all(config.adminBot.map(uid => usersData.getName(uid).then(name => ({ uid, name }))));
				return message.reply(getLang("listAdmin", getNames.map(({ uid, name }) => `❒ الاسم: ${name}\n❒ آيدي: (${uid})`).join("\n")));
			}
			default:
				return message.SyntaxError();
		}
	}
};
