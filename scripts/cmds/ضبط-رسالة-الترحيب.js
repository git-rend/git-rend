const { drive, getStreamFromURL, getExtFromUrl, getTime } = global.utils;

module.exports = { config: {
		      name: "ضبط-رسالة-الترحيب",
		      aliases: ["ضبط1","ضبط-الترحيب"],
		      version: "1.7",
		      author: "NTKhang", // تعريب: محمد تانجيرو \\
		      countDown: 5,
		      role: 1,
		      description: { ar: "قم بتحرير محتوى رسالة الترحيب عندما ينضم عضو جديد إلى الدردشة الجماعية الخاصة بك"},
		      category: "custom",
		      guide: { ar: { body: " {pn} [نص] [محتوى الࢪسالة | مسح]: تحرير محتوى النص أو إعادة تعيينه إلى الوضع الافتراضي، مع بعض الاختصارات:"
					 + " {userName}: اسم العضو الجديد"
					 + " {userNameTag}: اسم العضو الجديد (بالتاغ)"
					 + " {boxName}: اسم المجموعة"
					 + " {multiple}: واحد أو جماعة"
					 + " {session}: ترحيب على حسب الوقت"
					 + " مثال:"
					 + " {pn} كلام ترحيبي {userName}, أهلا بك في مجموعة: {boxName}, {multiple}"
					 + " رد (تعليق) أو إرسال رسالة مع الملف والمحتوى {pn} file: لإضافة مرفقات الملفات إلى رسالة الترحيب (صورة, فيديو, صوت)"
					 + " مثال:"
					 + " {pn} [ملف] [مسح]: حذف المرفق",
				attachment: {
					[`${__dirname}/assets/guide/setwelcome/setwelcome_en_1.png`]: "https://i.ibb.co/vsCz0ks/setwelcome-en-1.png"
				}
			}
		}
	},

	langs: { ar: { turnedOn: "تم تفعيل رسالة الترحيب",
		       turnedOff: "تم إيقاف تشغيل رسالة الترحيب",
		       missingContent: "الرجاء إدخال محتوى رسالة الترحيب",
		       edited: "تم تعديل محتوى رسالة الترحيب الخاصة بمجموعتك إلى:\n%1",
		       reseted: "تمت إعادة تعيين محتوى رسالة الترحيب",
		       noFile: "لا توجد ملفات مرفقة لحذفها",
		       resetedFile: "تمت إعادة تعيين مرفقات الملفات بنجاح",
		       missingFile: "الرجاء الرد على هذه الرسالة مع صورة / فيديو / ملف صوتي",
		       addedFile: "تمت إضافة %1 من المرفقات إلى رسالة الترحيب بمجموعتك"
	       }     },

	onStart: async function ({ args, threadsData, message, event, commandName, getLang }) {
		const { threadID, senderID, body } = event;
		const { data, settings } = await threadsData.get(threadID);

		switch (args[0]) {
			case "نص": {
				if (!args[1])
					return message.reply(getLang("missingContent"));
				else if (args[1] == "reset")
					delete data.welcomeMessage;
				else
					data.welcomeMessage = body.slice(body.indexOf(args[0]) + args[0].length).trim();
				await threadsData.set(threadID, {
					data
				});
				message.reply(data.welcomeMessage ? getLang("edited", data.welcomeMessage) : getLang("reseted"));
				break;
			}
			case "ملف": {
				if (args[1] == "reset") {
					const { welcomeAttachment } = data;
					if (!welcomeAttachment)
						return message.reply(getLang("noFile"));
					try {
						await Promise.all(data.welcomeAttachment.map(fileId => drive.deleteFile(fileId)));
						delete data.welcomeAttachment;
					}
					catch (e) { }
					await threadsData.set(threadID, {
						data
					});
					message.reply(getLang("resetedFile"));
				}
				else if (event.attachments.length == 0 && (!event.messageReply || event.messageReply.attachments.length == 0))
					return message.reply(getLang("missingFile"), (err, info) => {
						global.GoatBot.onReply.set(info.messageID, {
							messageID: info.messageID,
							author: senderID,
							commandName
						});
					});
				else {
					saveChanges(message, event, threadID, senderID, threadsData, getLang);
				}
				break;
			}
			case "on":
			case "off": {
				settings.sendWelcomeMessage = args[0] == "on";
				await threadsData.set(threadID, { settings });
				message.reply(settings.sendWelcomeMessage ? getLang("turnedOn") : getLang("turnedOff"));
				break;
			}
			default:
				message.SyntaxError();
				break;
		}
	},

	onReply: async function ({ event, Reply, message, threadsData, getLang }) {
		const { threadID, senderID } = event;
		if (senderID != Reply.author)
			return;

		if (event.attachments.length == 0 && (!event.messageReply || event.messageReply.attachments.length == 0))
			return message.reply(getLang("missingFile"));
		saveChanges(message, event, threadID, senderID, threadsData, getLang);
	}
};

async function saveChanges(message, event, threadID, senderID, threadsData, getLang) {
	const { data } = await threadsData.get(threadID);
	const attachments = [...event.attachments, ...(event.messageReply?.attachments || [])].filter(item => ["photo", 'png', "animated_image", "video", "audio"].includes(item.type));
	if (!data.welcomeAttachment)
		data.welcomeAttachment = [];

	await Promise.all(attachments.map(async attachment => {
		const { url } = attachment;
		const ext = getExtFromUrl(url);
		const fileName = `${getTime()}.${ext}`;
		const infoFile = await drive.uploadFile(`setwelcome_${threadID}_${senderID}_${fileName}`, await getStreamFromURL(url));
		data.welcomeAttachment.push(infoFile.id);
	}));

	await threadsData.set(threadID, {
		data
	});
	message.reply(getLang("addedFile", attachments.length));
}
