const { drive, getStreamFromURL, getExtFromUrl, getTime } = global.utils;
const checkUrlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

module.exports = { config: {
		      name: "ضبط-المستوى",
	              aliases: ["ضبط_المستوى"],
		      version: "1.2",
		      author: "NTKhang", // تعريب: محمد تانجيرو \\
		      countDown: 0,
		      role: 1,
		      description: {ar: "ضبط إعدادات المستوى"},
		      category: "owner",
		      guide: {ar: " {pn} [النص] [المحتوى]: ضبط الرسالة التي تظهر عند ارتفاع مستوى الأعضاء\n"
				+ " يمكنك استخدام القيم التالية:\n"
				+ " + {userName}: لإدخال اسم العضو (الذي ارتفع مستواه) في الرسالة\n"
				+ " + {userNameTag}: لعمل تاغ للعضو (الذي ارتفع مستواه) في الرسالة\n"
				+ " + {oldRank}: لعرض المستوى القديم (للعضو الذي ارتفع مستواه) في الرسالة\n"
				+ " + {currentRank}: لعرض المستوى الجديد (للعضو الذي ارتفع مستواه) في الرسالة\n"
				+ " {pn} [ملف | صورة | صوت | فيديو] [رابط الملف]: الملف المرفق عند ارتفاع مستوى العضو في المجموعة\n"
		           } },

	langs: { ar: { changedMessage: "🌹 غيࢪت الࢪسالة المࢪفقة عند\nاࢪتفـاع مستـوى الأعضـاء إلـى:\n%1",
		       missingAttachment: "🌹 يجب إࢪفاق ملف لضبطه\nكملف مرفق لاࢪتفاع المستوى",
	               changedAttachment: "🌹 غيـࢪت الملـف المࢪفـق\nعند اࢪتفـاع مستـوى الأعضـاء"
	       }     },

	onStart: async function ({ args, message, event, threadsData, getLang }) {
		const { body, threadID, senderID } = event;
		switch (args[0]) {
			case "النص": {
				const newContent = body.slice(body.indexOf("text") + 5);
				await threadsData.set(threadID, newContent, "data.rankup.message");
				return message.reply(getLang("changedMessage", newContent));
			}
			case "ملف":
			case "صورة":
			case "صوت":
			case "فيديو": {
				const attachments = [...event.attachments, ...(event.messageReply?.attachments || [])].filter(item => ["photo", 'png', "animated_image", "video", "audio"].includes(item.type));
				if (!attachments.length && !(args[1] || '').match(checkUrlRegex))
					return message.reply(getLang("missingAttachment", attachments.length));
				const { data } = await threadsData.get(threadID);
				if (!data.rankup)
					data.rankup = {};
				if (!data.rankup.attachments)
					data.rankup.attachments = [];

				for (const attachment of attachments) {
					const { url } = attachment;
					const ext = getExtFromUrl(url);
					const fileName = `${getTime()}.${ext}`;
					const infoFile = await drive.uploadFile(`setrankup_${threadID}_${senderID}_${fileName}`, await getStreamFromURL(url));
					data.rankup.attachments.push(infoFile.id);
				}
				await threadsData.set(threadID, {
					data
				});
				return message.reply(getLang("changedAttachment"));
			}
		}
	}
};

