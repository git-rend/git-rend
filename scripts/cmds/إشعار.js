const { getStreamsFromAttachment } = global.utils;

module.exports = { config: {
		      name: "تواصل",
		      aliases: ["ارسال", "اشعار"],
		      version: "1.7",
		      author: "NTKhang", // تعريب: محمد تانجيرو \\
		      countDown: 5,
		      role: 2,
		      description: { ar: "إرسال إشعار أو رسالة من المطور إلى كل المجموعات"},
		      category: "owner",
		      guide: { ar: "{pn} [محتوى الرسالة]"},
		      envConfig: { delayPerGroup: 250}
	                   },

	langs: { ar: { missingMessage: "🌹 أدخـل الࢪسـالـة التـي تࢪيـد\nإࢪسـالـهـا لـڪـل المـجـمـوعـات.",
		       notification: "إشعاࢪ من المطور لكل المجموعات\n🌹 (لا تࢪد عل هذه الࢪسالة) 🌹",
		       sendingNotification: "🌹 جاࢪي إࢪسال الإشعاࢪ لڪل\nالمجموعـات التي يتواجد\nفيـها البـوت ( %1 مـجـمـوعـات ) ✅",
		       sentNotification: "✅ تـم إࢪسـال الإشعـاࢪ بنجـاح\n     ( عدد المجموعات: %1 )",
		       errorSendingNotification: "🌹 فـشــل إࢪســال الإشـعــاࢪ\n     ( عدد المجموعات: %1 )\n\n%2"
	       }     },

	onStart: async function ({ message, api, event, args, commandName, envCommands, threadsData, getLang }) {
		const { delayPerGroup } = envCommands[commandName];
		if (!args[0])
			return message.reply(getLang("missingMessage"));
		const formSend = {
			body: `${getLang("notification")}\nء───────────────ء\n${args.join(" ")}`,
			attachment: await getStreamsFromAttachment(
				[
					...event.attachments,
					...(event.messageReply?.attachments || [])
				].filter(item => ["photo", "png", "animated_image", "video", "audio"].includes(item.type))
			)
		};

		const allThreadID = (await threadsData.getAll()).filter(t => t.isGroup && t.members.find(m => m.userID == api.getCurrentUserID())?.inGroup);
		message.reply(getLang("sendingNotification", allThreadID.length));

		let sendSucces = 0;
		const sendError = [];
		const wattingSend = [];

		for (const thread of allThreadID) {
			const tid = thread.threadID;
			try {
				wattingSend.push({
					threadID: tid,
					pending: api.sendMessage(formSend, tid)
				});
				await new Promise(resolve => setTimeout(resolve, delayPerGroup));
			}
			catch (e) {
				sendError.push(tid);
			}
		}

		for (const sended of wattingSend) {
			try {
				await sended.pending;
				sendSucces++;
			}
			catch (e) {
				const { errorDescription } = e;
				if (!sendError.some(item => item.errorDescription == errorDescription))
					sendError.push({
						threadIDs: [sended.threadID],
						errorDescription
					});
				else
					sendError.find(item => item.errorDescription == errorDescription).threadIDs.push(sended.threadID);
			}
		}

		let msg = "";
		if (sendSucces > 0)
			msg += getLang("sentNotification", sendSucces) + "\n";
		if (sendError.length > 0)
			msg += getLang("errorSendingNotification", sendError.reduce((a, b) => a + b.threadIDs.length, 0), sendError.reduce((a, b) => a + `\n - ${b.errorDescription}\n  + ${b.threadIDs.join("\n  + ")}`, ""));
		message.reply(msg);
	}
};
