const fs = require("fs-extra");

module.exports = { config: {
		      name: "تحميل-الكونفيغ",
		      aliases: ["تحميلconfig"],
		      version: "1.4",
		      author: "NTKhang", // تعريب: محمد تانجيرو \\
		      countDown: 5,
		      role: 2,
		      description: { ar: "إعادة تحميل ملف الكونفيغ"},
		      category: "owner",
		      guide: { ar: "{pn}"}
	                   },

	langs: { ar: { success: "تم إعادة تحميل ملف الكونفيغ بنجاح"}},

	onStart: async function ({ message, getLang }) {
		global.GoatBot.config = fs.readJsonSync(global.client.dirConfig);
		global.GoatBot.configCommands = fs.readJsonSync(global.client.dirConfigCommands);
		message.reply(getLang("success"));
	}
};
