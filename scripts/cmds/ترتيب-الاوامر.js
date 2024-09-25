module.exports = { config: {
		      name: "ترتيب-الاوامر",
                      aliases: ["ترتيب-القائمة","ترتيب"],
		      version: "1.2",
		      author: "NTKhang", // تعريب: محمد تانجيرو \\
		      countDown: 5,
		      role: 0,
		      description: { ar: "ترتيب قائمة الأوامر حسب الفئة أو حسب الاسم"},
		      category: "image",
		      guide: { ar: "{pn} [الاسم | الفئة]"}
	                   },

	langs: { ar: { savedName: "✅ تـم تغييـࢪ تࢪتيـب الأوامـࢪ\nوسيظهࢪ تࢪتيبها حسب الاسم.",
		       savedCategory: "✅ تـم تغييـࢪ تࢪتيـب الأوامـࢪ\nوسيظهࢪ تࢪتيبها حسب الفئات."
	       }     },

	onStart: async function ({ message, event, args, threadsData, getLang }) {
		if (args[0] == "الاسم") {
			await threadsData.set(event.threadID, "name", "settings.sortHelp");
			message.reply(getLang("savedName"));
		}
		else if (args[0] == "الفئة") {
			threadsData.set(event.threadID, "category", "settings.sortHelp");
			message.reply(getLang("savedCategory"));
		}
		else
			message.SyntaxError();
	}
};
