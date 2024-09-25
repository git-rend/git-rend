const fs = require("fs-extra");
const { config } = global.GoatBot;
const { client } = global;

module.exports = {
	config: {
		name: "تقييدالكل",
		aliases: ["المطور-فقط"],
		version: "1.5",
		author: "NTKhang",
		countDown: 5,
		role: 2,
		description: {
			ar: "تقييد استخدام البوت في هذه المجموعة، فقط المطور يمكنه استخدامه"
		},
		category: "owner",
		guide: {
			ar: "   {pn} [تشغيل | ايقاف]: turn on/off the mode only admin can use bot"
				+ "\n   {pn} [اشعار] [تشغيل | ايقاف]: بتشغيل/إيقاف اشعار التقييد، عندما لا يكون المطور هو المستخدم في المجموعة"
		}
	},

	langs: {
		ar: {
			turnedOn: "🌹✨ ---- تنبيه ---- ✨🌹\n\nتـم تقـييـد استـخـدام البـوت\nفــي كـل الـمـجـمـوعــات ✅\n\nفقط المطور يمكنه استخدامه",
			turnedOff: "🌹✨ ---- تنبيه ---- ✨🌹\n\nتم الغاء تقييد استخدام البوت\nفــي كــل الـمـجـمـوعــات ✅\n\nيمكن للجميع استخدامه الآن",
			turnedOnNoti: "🌹✨ ---- تنبيه ---- ✨🌹\n\nتم تفعيـل إشعـار التقييـد ✅",
			turnedOffNoti: "🌹✨ ---- تنبيه ---- ✨🌹\n\nتم إلغاء تفعيل إشعار التقييد✅",
			syntaxError: "استـخـدم الامـر بهـذا الشكـل:\n{pn} تشغيل: للتشغيل ✅\n{pn} ايقاف: للإيقاف ❌"
		}
	},

	onStart: function ({ args, message, getLang }) {
		let isSetNoti = false;
		let value;
		let indexGetVal = 0;

		if (args[0] == "اشعار") {
			isSetNoti = true;
			indexGetVal = 1;
		}

		if (args[indexGetVal] == "تشغيل")
			value = true;
		else if (args[indexGetVal] == "ايقاف")
			value = false;
		else
			return message.reply(getLang("syntaxError"));

		if (isSetNoti) {
			config.hideNotiMessage.adminOnly = !value;
			message.reply(getLang(value ? "turnedOnNoti" : "turnedOffNoti"));
		}
		else {
			config.adminOnly.enable = value;
			message.reply(getLang(value ? "turnedOn" : "turnedOff"));
		}

		fs.writeFileSync(client.dirConfig, JSON.stringify(config, null, 2));
	}
};
