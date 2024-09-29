const axios = require("axios");
const fs = require("fs-extra");
const execSync = require("child_process").execSync;
const dirBootLogTemp = `${__dirname}/tmp/rebootUpdated.txt`;

module.exports = { config: {
		      name: "تحديث",
		      version: "1.5",
		      author: "Chat GPT, NTKhang", // تعريب: محمد تانجيرو \\
		      role: 2,
		      description: { ar: "تحقق من أحدث إصدار من البوت وقم بتثبيته على  الجيثهاب (GitHub)"},
		      category: "owner",
		      guide: { ar: "{pn}"}
	                   },

	langs: {
		vi: { ar: { noUpdates: "✅ | أنت تستخدم أحدث إصدار من بوت أڪاني (v%1).",
			    updatePrompt: "💫 | أنت تستخدم الإصدار %1؛ وهناك نسخة جديدة %2، هل تريد تحديث بوت أكاني إلى الإصدار الأحدث؟"
				        + "\n\n⬆️ | سيتم تحديث الملفات التالية:"
				        + "\n%3%4"
				        + "\n💡 | تفاعل مع هذه الرسالة بأي إيموجي للتأكيد.",
			    fileWillDelete: "\n🗑️ | سيتم حذف الملفات | المجلدات التالية:\n%1",
			    andMore: " ... و %1 ملفات أخرى",
			    updateConfirmed: "🚀 | تم التأكيد؛ جاري التحديث ...",
			    updateComplete: "✅ | اكتمل التحديث، هل تريد إعادة تشغيل برنامج البوت الآن (أجب بـ \"نعم\" أو \"أجل\" للتأكيد)؟",
			    updateTooFast: "⭕ نظرًا لأنه تم إصدار آخر تحديث منذ %1 دقيقة و%2 ثانية، فلا يمكنك التحديث الآن، الرجاء المحاولة مرة أخرى بعد %3 دقيقة %4 ثانية لتجنب الأخطاء",
			    botWillRestart: "🔄 | سيتم إعادة تشغيل البوت الآن!"
		}
	},

	onLoad: async function ({ api }) {
		if (fs.existsSync(dirBootLogTemp)) {
			const threadID = fs.readFileSync(dirBootLogTemp, "utf-8");
			fs.removeSync(dirBootLogTemp);
			api.sendMessage("The chatbot has been restarted.", threadID);
		}
	},

	onStart: async function ({ message, getLang, commandName, event }) {
		// Check for updates
		const { data: { version } } = await axios.get("https://raw.githubusercontent.com/ntkhang03/Goat-Bot-V2/main/package.json");
		const { data: versions } = await axios.get("https://raw.githubusercontent.com/ntkhang03/Goat-Bot-V2/main/versions.json");

		const currentVersion = require("../../package.json").version;
		if (compareVersion(version, currentVersion) < 1)
			return message.reply(getLang("noUpdates", currentVersion));

		const newVersions = versions.slice(versions.findIndex(v => v.version == currentVersion) + 1);

		let fileWillUpdate = [...new Set(newVersions.map(v => Object.keys(v.files || {})).flat())]
			.sort()
			.filter(f => f?.length);
		const totalUpdate = fileWillUpdate.length;
		fileWillUpdate = fileWillUpdate
			.slice(0, 10)
			.map(file => ` - ${file}`).join("\n");

		let fileWillDelete = [...new Set(newVersions.map(v => Object.keys(v.deleteFiles || {}).flat()))]
			.sort()
			.filter(f => f?.length);
		const totalDelete = fileWillDelete.length;
		fileWillDelete = fileWillDelete
			.slice(0, 10)
			.map(file => ` - ${file}`).join("\n");

		// Prompt user to update
		message.reply(
			getLang(
				"updatePrompt",
				currentVersion,
				version,
				fileWillUpdate + (totalUpdate > 10 ? "\n" + getLang("andMore", totalUpdate - 10) : ""),
				totalDelete > 0 ? "\n" + getLang(
					"fileWillDelete",
					fileWillDelete + (totalDelete > 10 ? "\n" + getLang("andMore", totalDelete - 10) : "")
				) : ""
			), (err, info) => {
				if (err)
					return console.error(err);

				global.GoatBot.onReaction.set(info.messageID, {
					messageID: info.messageID,
					threadID: info.threadID,
					authorID: event.senderID,
					commandName
				});
			});
	},

	onReaction: async function ({ message, getLang, Reaction, event, commandName }) {
		const { userID } = event;
		if (userID != Reaction.authorID)
			return;

		const { data: lastCommit } = await axios.get('https://api.github.com/repos/ntkhang03/Goat-Bot-V2/commits/main');
		const lastCommitDate = new Date(lastCommit.commit.committer.date);
		// if < 5min then stop update and show message
		if (new Date().getTime() - lastCommitDate.getTime() < 5 * 60 * 1000) {
			const minutes = Math.floor((new Date().getTime() - lastCommitDate.getTime()) / 1000 / 60);
			const seconds = Math.floor((new Date().getTime() - lastCommitDate.getTime()) / 1000 % 60);
			const minutesCooldown = Math.floor((5 * 60 * 1000 - (new Date().getTime() - lastCommitDate.getTime())) / 1000 / 60);
			const secondsCooldown = Math.floor((5 * 60 * 1000 - (new Date().getTime() - lastCommitDate.getTime())) / 1000 % 60);
			return message.reply(getLang("updateTooFast", minutes, seconds, minutesCooldown, secondsCooldown));
		}

		await message.reply(getLang("updateConfirmed"));
		// Update chatbot
		execSync("node update", {
			stdio: "inherit"
		});
		fs.writeFileSync(dirBootLogTemp, event.threadID);

		message.reply(getLang("updateComplete"), (err, info) => {
			if (err)
				return console.error(err);

			global.GoatBot.onReply.set(info.messageID, {
				messageID: info.messageID,
				threadID: info.threadID,
				authorID: event.senderID,
				commandName
			});
		});
	},

	onReply: async function ({ message, getLang, event }) {
		if (['نعم', 'أجل'].includes(event.body?.toLowerCase())) {
			await message.reply(getLang("botWillRestart"));
			process.exit(2);
		}
	}
};

function compareVersion(version1, version2) {
	const v1 = version1.split(".");
	const v2 = version2.split(".");
	for (let i = 0; i < 3; i++) {
		if (parseInt(v1[i]) > parseInt(v2[i]))
			return 1;
		if (parseInt(v1[i]) < parseInt(v2[i]))
			return -1;
	}
	return 0;
}
