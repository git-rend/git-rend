const fs = require("fs-extra");
const { utils } = global;

module.exports = { config: {
		      name: "البادئة",
	              aliases: ["prefix","PREFIX","Prefix","بريفيكس"],
		      version: "1.4",
		      author: "NTKhang", // تعريب: محمد تانجيرو \\
		      countDown: 5,
		      role: 0,
		      description: "قم بتغيير البادئة الخاصة بالبوت في المجموعة الخاصة بك أو نظام البوت بأكمله (المطور فقط)",
		      category: "config",
		      guide: { ar: " {pn} [البادئة الجديدة]: قم بتغيير البادئة الجديدة في المجموعة الخاص بك\n"
				 + " مثال:\n"
				 + " {pn} #\n"
				 + " {pn} [البادئة الجديدة] [البوت]: تغيير البادئة الجديدة للبوت في النظام (المطور فقط)\n"
				 + " مثال:\n"
				 + " {pn} # [البوت]\n"
				 + " {pn} [مسح]: قم بتغيير البادئة في مجموعتك إلى الوضع الافتراضي\n"
		           } },

	langs: { ar: { reset: "تمت إعادة تعيين البادئة الخاصة بك إلى الوضع الافتراضي: %1",
		       onlyAdmin: "يمكن للمطور فقط تغيير بادئة البوت في النظام",
		       confirmGlobal: "يرجى الرد على هذه الرسالة لتأكيد تغيير بادئة البوت في النظام",
		       confirmThisThread: "يرجى التفاتعل مع هذه الرسالة بأي إيموجي لتأكيد تغيير البادئة في المجموعة الخاصة بك",
		       successGlobal: "تم تغيير بادئة البوت في النظام إلى: %1",
		       successThisThread: "تم تغيير البادئة في المجموعة الخاص بك إلى: %1",
		       myPrefix: "🌐 بادئة البوت في النظام: %1\n🛸 بادئة البوت في المجموعة: %2"
	       }     },

	onStart: async function ({ message, role, args, commandName, event, threadsData, getLang }) {
		if (!args[0])
			return message.SyntaxError();

		if (args[0] == 'حذف' | args[0] == 'مسح') {
			await threadsData.set(event.threadID, null, "data.prefix");
			return message.reply(getLang("reset", global.GoatBot.config.prefix));
		}

		const newPrefix = args[0];
		const formSet = {
			commandName,
			author: event.senderID,
			newPrefix
		};

		if (args[1] === "البوت")
			if (role < 2)
				return message.reply(getLang("onlyAdmin"));
			else
				formSet.setGlobal = true;
		else
			formSet.setGlobal = false;

		return message.reply(args[1] === "البوت" ? getLang("confirmGlobal") : getLang("confirmThisThread"), (err, info) => {
			formSet.messageID = info.messageID;
			global.GoatBot.onReaction.set(info.messageID, formSet);
		});
	},

	onReaction: async function ({ message, threadsData, event, Reaction, getLang }) {
		const { author, newPrefix, setGlobal } = Reaction;
		if (event.userID !== author)
			return;
		if (setGlobal) {
			global.GoatBot.config.prefix = newPrefix;
			fs.writeFileSync(global.client.dirConfig, JSON.stringify(global.GoatBot.config, null, 2));
			return message.reply(getLang("successGlobal", newPrefix));
		}
		else {
			await threadsData.set(event.threadID, newPrefix, "data.prefix");
			return message.reply(getLang("successThisThread", newPrefix));
		}
	},

	onChat: async function ({ event, message, getLang }) {
		if (event.body && event.body.toLowerCase() === "prefix" | event.body && event.body.toLowerCase() === "البادئة" | event.body && event.body.toLowerCase() === "Prefix" | event.body && event.body.toLowerCase() === "PREFIX")
			return () => {
				return message.reply(getLang("myPrefix", global.GoatBot.config.prefix, utils.getPrefix(event.threadID)));
			};
	}
};
