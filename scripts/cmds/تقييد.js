module.exports = {
	config: {
		name: "تقييد",
		aliases: ["الادمن-فقط"],
		version: "1.3",
		author: "NTKhang",
		countDown: 5,
		role: 1,
		description: {
			ar: "تقييد استخدام البوت في هذه المجموعة، فقط المسؤولين يمكنهم استخدامه"
		},
		category: "box chat",
		guide: {
			ar: "   {pn} [تشغيل | ايقاف]: تشغيل/إيقاف التقييد، يمكن لمسؤولي المجموعة فقط استخدام البوت"
				+ "\n   {pn} [اشعار] [تشغيل | ايقاف]: بتشغيل/إيقاف اشعار التقييد، عندما لا يكون المستخدم مسؤولاً في المجموعة"
		}
	},

	langs: {
		ar: {
			turnedOn: "🌹✨ ---- تنبيه ---- ✨🌹\n\nتم تقييد استخدام البوت في\n هذه المجموعة، ولن يتمكن\n  أحد من استخدامه 🤭❌\nفـقـــط الـمــســـؤولـــون 🙆‍♀️",
			turnedOff: "🌹✨ ---- تنبيه ---- ✨🌹\n\nتم إلغاء تقييد استخدام البوت\nفي هذه المجموعة، وسيتمكن\nكل الأعضاء من استخدامه ✅",
			turnedOnNoti: "🌹✨ ---- تنبيه ---- ✨🌹\n\nتم تفعيل إشعار تقييد البوت\nفـي هـذه المـجـمــوعـة ✅",
			turnedOffNoti: "🌹✨ ---- تنبيه ---- ✨🌹\n\nتم إلغـاء تفعيـل إشعـار تقييـد\nالبوت في هذه المجموعة ✅",
			syntaxError: "{pn} تشغيل: لتفعيل التقييد ✅\n{pn} ايقاف: لإيقاف تفعيله ❌"
		}
	},

	onStart: async function ({ args, message, event, threadsData, getLang }) {
		let isSetNoti = false;
		let value;
		let keySetData = "data.onlyAdminBox";
		let indexGetVal = 0;

		if (args[0] == "الاشعار") {
			isSetNoti = true;
			indexGetVal = 1;
			keySetData = "data.hideNotiMessageOnlyAdminBox";
		}

		if (args[indexGetVal] == "تشغيل")
			value = true;
		else if (args[indexGetVal] == "ايقاف")
			value = false;
		else
			return message.reply(getLang("syntaxError"));

		await threadsData.set(event.threadID, isSetNoti ? !value : value, keySetData);

		if (isSetNoti)
			return message.reply(value ? getLang("turnedOnNoti") : getLang("turnedOffNoti"));
		else
			return message.reply(value ? getLang("turnedOn") : getLang("turnedOff"));
	}
};
