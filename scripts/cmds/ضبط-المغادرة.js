const { drive, getStreamFromURL, getExtFromUrl, getTime } = global.utils;

module.exports = { config: {
		      name: "ضبط-المغادرة",
		      aliases: ["ضبط4"],
		      version: "1.7",
		      author: "NTKhang", // تعريب: محمد تانجيرو \\
		      countDown: 5,
		      role: 0,
		      description: { ar: "تحرير المحتوى/تشغيل/إيقاف تشغيل ترك رسالة عندما يغادر العضو الدردشة الجماعية"},
		      category: "custom",
		      guide: { ar: { body: " {pn} on: قم بتشغيل رسالة المغادرة\n"
					 + " {pn} off: قم بإيقاف تشغيل رسالة المغادرة\n"
					 + " {pn} [نص] [محتوى النص | مسح]: تحرير محتوى النص أو إعادة التعيين إلى الاختصارات الافتراضية المتاحة:\n"
					 + " {userName}: اسم العضو الذي غادر المجموعة\n"
					 + " {userNameTag}: اسم العضو الذي غادر المجموعة (تاغ)\n"
					 + " {boxName}: اسم المجموعة\n"
					 + " {type}: غادر / تم طرده من قبل المشرف\n"
					 + " {session}: وصف الوقت (صباح | مساء)\n"
					 + " مثال:\n"
					 + " {pn} نص {userName} {type} المجموعة, نراك لاحقا 🤧\n"
					 + " قم بالرد أو أرسل رسالة تحتوي على الملف والنص: {pn} ملف: لإضافة ملف مرفق مع رسالة المعادرة (صورة، فيديو، صوت)\n"
					 + "مثال:\n"
					 + " {pn} ملف مسح: لحذف الملف المرفق",
				attachment: { [`${__dirname}/assets/guide/setleave/setleave_en_1.png`]: "https://i.ibb.co/2FKJHJr/guide1.png"}
			   } }     },

	langs: { ar: { turnedOn: "تم تفعيل رسالة المغادرة بنجاح",
		       turnedOff: "تم إيقاف رسالة المغادرة بنجاح",
		       missingContent: "الرجاء إدخال المحتوى",
		       edited: "تم تعديل محتوى رسالة المغادرة لمجموعتك إلى:\n%1",
		       reseted: "تمت إعادة ضبط محتوى رسالة المغادرة",
		       noFile: "لا يوجد ملف مرفق مع رسالة المغادرة لحذفه",
		       resetedFile: "تم حذف الملف المرفق لرسالة المغادرة بنجاح",
		       missingFile: "يرجى الرد على هذه الرسالة بـ: صورة / فيديو / صوت",
		       addedFile: "تمت إضافة %1 ملف مرفق إلى رسالة المغادرة الخاصة بك"
	       }     },

	onStart: async function ({ args, threadsData, message, event, commandName, getLang }) {
		const { threadID, senderID, body } = event;
		const { data, settings } = await threadsData.get(threadID);

		switch (args[0]) {
			case "text": {
				if (!args[1])
					return message.reply(getLang("missingContent"));
				else if (args[1] == "reset")
					delete data.leaveMessage;
				else
					data.leaveMessage = body.slice(body.indexOf(args[0]) + args[0].length).trim();
				await threadsData.set(threadID, {
					data
				});
				message.reply(data.leaveMessage ? getLang("edited", data.leaveMessage) : getLang("reseted"));
				break;
			}
			case "file": {
				if (args[1] == "reset") {
					const { leaveAttachment } = data;
					if (!leaveAttachment)
						return message.reply(getLang("noFile"));
					try {
						await Promise.all(data.leaveAttachment.map(fileId => drive.deleteFile(fileId)));
						delete data.leaveAttachment;
					}
					catch (e) { }

					await threadsData.set(threadID, {
						data
					});
					message.reply(getLang("resetedFile"));
				}
				else if (event.attachments.length == 0 && (!event.messageReply || event.messageReply.attachments.length == 0)) {
					return message.reply(getLang("missingFile"), (err, info) => {
						global.GoatBot.onReply.set(info.messageID, {
							messageID: info.messageID,
							author: senderID,
							commandName
						});
					});
				}
				else {
					saveChanges(message, event, threadID, senderID, threadsData, getLang);
				}
				break;
			}
			case "on":
			case "off": {
				settings.sendLeaveMessage = args[0] == "on";
				await threadsData.set(threadID, { settings });
				message.reply(getLang(args[0] == "on" ? "turnedOn" : "turnedOff"));
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
	if (!data.leaveAttachment)
		data.leaveAttachment = [];

	await Promise.all(attachments.map(async attachment => {
		const { url } = attachment;
		const ext = getExtFromUrl(url);
		const fileName = `${getTime()}.${ext}`;
		const infoFile = await drive.uploadFile(`setleave_${threadID}_${senderID}_${fileName}`, await getStreamFromURL(url));
		data.leaveAttachment.push(infoFile.id);
	}));

	await threadsData.set(threadID, {
		data
	});
	message.reply(getLang("addedFile", attachments.length));
}
