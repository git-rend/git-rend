const fs = require("fs-extra");
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");

function getDomain(url) {
	const regex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n]+)/im;
	const match = url.match(regex);
	return match ? match[1] : null;
}

module.exports = { config: {
		      name: "حدث",
		      aliases: ["ايفنت"],
	              version: "1.9",
		      author: "NTKhang", // تعريب: محمد تانجيرو \\
		      countDown: 5,
		      role: 2,
		      description: { ar: "إدارة ملفات أوامر الأحداث الخاصة بالبوت"},
		      category: "owner",
		      guide: { ar: " {pn} [تحميل] [اسم الايفنت]\n"
				 + " {pn} [تحميل-الكل]\n"
				 + " {pn} [تثبيت] [الرابط] [اسم الحذث]: تنزيل وتحميل الايفنت (الحدث)، الرابط هو المسار إلى الملف (raw)\n"
				 + " {pn} [تثبيت] [الكود] [اسم الحذث]: تنزيل وتحميل الايفنت (الحدث)، الكود هو كود الملف (raw)"
		           } },

	langs: { ar: { missingFileName: "⚠️ | الرجاء إدخال اسم الايفنت (الحدث) الذي تريد إعادة تحميله",
		       loaded: "✅ | تم تحميل الايفنت (الحدث) \"%1\" بنجاح",
		       loadedError: "❌ | فشل تحميل الايفنت (الحدث) %1\nالخطأ: %2: %3",
		       loadedSuccess: "✅ | تم تحميل الايفنت (الحدث) \"%1\" بنجاح",
		       loadedFail: "❌ | فشل تحميل الايفنت (الحدث)\n%2",
		       missingCommandNameUnload: "⚠️ | الرجاء إدخال اسم الايفنت (الحدث) الذي تريد إلغاء تحميله",
		       unloaded: "✅ | تم إلغاء تحميل الايفنت (الحدث) \"%1\" بنجاح",
	               unloadedError: "❌ | فشل الغاء تحميل الايفنت (الحدث) \"%1\"\n الخطأ\n%2: %3",
		       missingUrlCodeOrFileName: "⚠️ | الرجاء إدخال الرابط أو الكود واسم ملف الايفنت (الحدث) الذي تريد تثبيته",
		       missingUrlOrCode: "⚠️ | الرجاء إدخال الرابط أو كود ملف الايفنت (الحدث) الذي تريد تثبيته",
		       missingFileNameInstall: "⚠️ | الرجاء إدخال اسم الملف لحفظ الايفنت (الحدث) (يجب أن ينتهي بـ: .js)",
		       invalidUrlOrCode: "⚠️ | غير قادر على الحصول على رمز الايفنت (الحدث)",
		       alreadExist: "⚠️ | اسم الايفنت (الحدث) موجود بالفعل، هل أنت متأكد من أنك تريد الكتابة فوق الملف القديم؟\nتفاعل مع هذه الرسالة للتأكيد والمتابعة",
		       installed: "✅ | تم تثبيت الايفنت (الحدث) \"%1\" بنجاح، وتم حفظ الايفنت (الحدث) في %2",
		       installedError: "❌ | فشل تثبيت الايفنت (الحدث) \"%1\"\nالخطأ\n%2: %3",
		       missingFile: "⚠️ | لم يتم حفظ الملف \"%1\"",
		       invalidFileName: "⚠️ | اسم الملف غير صالح",
		       unloadedFile: "✅ | تم تفريغ الملف \"%1\" بنجاح"
	       }     },

	onStart: async ({ args, message, api, threadModel, userModel, dashBoardModel, globalModel, threadsData, usersData, dashBoardData, globalData, commandName, event, getLang }) => {
		const { configCommands } = global.GoatBot;
		const { log, loadScripts } = global.utils;

		if (args[0] == "تحميل" && args.length == 2) {
			if (!args[1])
				return message.reply(getLang("missingFileName"));
			const infoLoad = loadScripts("events", args[1], log, configCommands, api, threadModel, userModel, dashBoardModel, globalModel, threadsData, usersData, dashBoardData, globalData, getLang);
			infoLoad.status == "success" ?
				message.reply(getLang("loaded", infoLoad.name)) :
				message.reply(getLang("loadedError", infoLoad.name, infoLoad.error, infoLoad.message));
		}
		else if ((args[0] || "").toLowerCase() == "تحميل-الكل" || (args[0] == "load" && args.length > 2)) {
			const allFile = args[0].toLowerCase() == "loadall" ?
				fs.readdirSync(path.join(__dirname, "..", "events"))
					.filter(file =>
						file.endsWith(".js") &&
						!file.match(/(eg)\.js$/g) &&
						(process.env.NODE_ENV == "development" ? true : !file.match(/(dev)\.js$/g)) &&
						!configCommands.commandEventUnload?.includes(file)
					)
					.map(item => item = item.split(".")[0]) :
				args.slice(1);
			const arraySucces = [];
			const arrayFail = [];
			for (const fileName of allFile) {
				const infoLoad = loadScripts("events", fileName, log, configCommands, api, threadModel, userModel, dashBoardModel, globalModel, threadsData, usersData, dashBoardData, globalData, getLang);
				infoLoad.status == "success" ?
					arraySucces.push(fileName) :
					arrayFail.push(`${fileName} => ${infoLoad.error.name}: ${infoLoad.error.message}`);
			}
			let msg = "";
			if (arraySucces.length > 0)
				msg += getLang("loadedSuccess", arraySucces.length) + '\n';
			if (arrayFail.length > 0)
				msg += (msg ? '\n' : '') + getLang("loadedFail", arrayFail.length, "❗" + arrayFail.join("\n❗ "));
			message.reply(msg);
		}
		else if (args[0] == "تفريغ") {
			if (!args[1])
				return message.reply(getLang("missingCommandNameUnload"));
			const infoUnload = global.utils.unloadScripts("events", args[1], configCommands, getLang);
			infoUnload.status == "success" ?
				message.reply(getLang("unloaded", infoUnload.name)) :
				message.reply(getLang("unloadedError", infoUnload.name, infoUnload.error.name, infoUnload.error.message));
		}
		else if (args[0] == "تثبيت") {
			let url = args[1];
			let fileName = args[2];
			let rawCode;

			if (!url || !fileName)
				return message.reply(getLang("missingUrlCodeOrFileName"));

			if (url.endsWith(".js")) {
				const tmp = fileName;
				fileName = url;
				url = tmp;
			}

			if (url.match(/(https?:\/\/(?:www\.|(?!www)))/)) {
				if (!fileName || !fileName.endsWith(".js"))
					return message.reply(getLang("missingFileNameInstall"));

				const domain = getDomain(url);
				if (!domain)
					return message.reply(getLang("invalidUrl"));

				if (domain == "pastebin.com") {
					const regex = /https:\/\/pastebin\.com\/(?!raw\/)(.*)/;
					if (url.match(regex))
						url = url.replace(regex, "https://pastebin.com/raw/$1");
					if (url.endsWith("/"))
						url = url.slice(0, -1);
				}
				else if (domain == "github.com") {
					const regex = /https:\/\/github\.com\/(.*)\/blob\/(.*)/;
					if (url.match(regex))
						url = url.replace(regex, "https://raw.githubusercontent.com/$1/$2");
				}

				rawCode = (await axios.get(url)).data;

				if (domain == "savetext.net") {
					const $ = cheerio.load(rawCode);
					rawCode = $("#content").text();
				}
			}
			else {
				if (args[args.length - 1].endsWith(".js")) {
					fileName = args[args.length - 1];
					rawCode = event.body.slice(event.body.indexOf('install') + 7, event.body.indexOf(fileName) - 1);
				}
				else if (args[1].endsWith(".js")) {
					fileName = args[1];
					rawCode = event.body.slice(event.body.indexOf(fileName) + fileName.length + 1);
				}
				else
					return message.reply(getLang("missingFileNameInstall"));
			}
			if (!rawCode)
				return message.reply(getLang("invalidUrlOrCode"));
			if (fs.existsSync(path.join(__dirname, "..", "events", fileName)))
				return message.reply(getLang("alreadExist"), (err, info) => {
					global.GoatBot.onReaction.set(info.messageID, {
						commandName,
						messageID: info.messageID,
						type: "install",
						author: event.senderID,
						data: {
							fileName,
							rawCode
						}
					});
				});
			else {
				const infoLoad = loadScripts("events", fileName, log, configCommands, api, threadModel, userModel, dashBoardModel, globalModel, threadsData, usersData, dashBoardData, globalData, getLang, rawCode);
				infoLoad.status == "success" ?
					message.reply(getLang("installed", infoLoad.name, path.join(__dirname, fileName).replace(process.cwd(), ""))) :
					message.reply(getLang("installedError", infoLoad.name, infoLoad.error.name, infoLoad.error.message));
			}
		}
		else
			message.SyntaxError();
	},

	onReaction: async function ({ Reaction, message, event, api, threadModel, userModel, dashBoardModel, globalModel, threadsData, usersData, dashBoardData, globalData, getLang }) {
		const { author, messageID, data: { fileName, rawCode } } = Reaction;
		if (event.userID != author)
			return;
		const { configCommands } = global.GoatBot;
		const { log, loadScripts } = global.utils;
		const infoLoad = loadScripts("cmds", fileName, log, configCommands, api, threadModel, userModel, dashBoardModel, globalModel, threadsData, usersData, dashBoardData, globalData, getLang, rawCode);
		infoLoad.status == "success" ?
			message.reply(getLang("installed", infoLoad.name, path.join(__dirname, '..', 'events', fileName).replace(process.cwd(), ""), () => message.unsend(messageID))) :
			message.reply(getLang("installedError", infoLoad.name, infoLoad.error.name, infoLoad.error.message, () => message.unsend(messageID)));
	}
};
