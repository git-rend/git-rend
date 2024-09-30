const fs = require("fs-extra");

module.exports = { config: {
		      name: "فيس",
		      aliases: ["كوكيز", "كوكيز-الفيس"],
		      version: "1.2",
		      author: "NTKhang", // تعريب: محمد تانجيرو \\
		      countDown: 5,
		      role: 2,
		      description: { ar: "الحصول على fbstate الحالي"},
		      category: "owner",
		      guide: { ar: " {pn}: الحصول على fbstate (appState)\n"
				 + " {pn} [كوكيز]: احصل على fbstate بتنسيق الكوكيز\n"
				 + " {pn} [سترينغ]: احصل على fbstate بتنسيق السترينغ\n",
		           } },

	langs: { ar: { success: "تم إرسال fbstate إليك، يرجى التحقق من رسالة البوت في الخاص"}},

	onStart: async function ({ message, api, event, args, getLang }) {
		let fbstate;
		let fileName;

		if (["كيوكيز","كوكي"].includes(args[0])) {
			fbstate = JSON.stringify(api.getAppState().map(e => ({
				name: e.key,
				value: e.value
			})), null, 2);
			fileName = "cookies.json";
		}
		else if (["سترينغ", "سترينغس"].includes(args[0])) {
			fbstate = api.getAppState().map(e => `${e.key}=${e.value}`).join("; ");
			fileName = "cookiesString.txt";
		}
		else {
			fbstate = JSON.stringify(api.getAppState(), null, 2);
			fileName = "appState.json";
		}

		const pathSave = `${__dirname}/tmp/${fileName}`;
		fs.writeFileSync(pathSave, fbstate);

		if (event.senderID != event.threadID)
			message.reply(getLang("success"));

		api.sendMessage({
			body: fbstate,
			attachment: fs.createReadStream(pathSave)
		}, event.senderID, () => fs.unlinkSync(pathSave));
	}
};
