const { getTime, drive } = global.utils;

module.exports = { config: {
		      name: "إشعار-المغادرة",
		      version: "1.4",
		      author: "NTKhang",// تعريب:محمد تانجيرو \\
		      category: "events"
	                   },

	langs: { ar: { session1: "صباح الخيـࢪ",
		       session2: "مسـاء الخيـࢪ",
		       session3: "ليلـة سعيـدة",
		       leaveType1: "👋 غادࢪ، وتࢪك باقي الأعضاء في\nسعـادة 🤣، وڪأنهم ࢪاح يحزنـوا\nعلى قࢪد مثلك 🙎‍♀️، انقـلع ولا تعد\n    ا⊱━━━━⊰✾⊱━━━━⊰ا",
		       leaveType2: "👋 تم طࢪده من المجموعة، وتࢪك\nبـاقـي الأعـضـاء فـي سـعـادة 🤣،\nوڪـأنـهم ࢪاح يحـزنـوا علـى قـࢪد\nمثلـه 🙎‍♀، انقـلـع ولا تـࢪجـع ثانـي\n    ا⊱━━━━⊰✾⊱━━━━⊰ا",
		       defaultLeaveMessage: `🌹 الغبي: {userName}\n{type}\n{session} لباقـي الأعضـاء 👋`
	       }     },

	onStart: async ({ threadsData, message, event, api, usersData, getLang }) => {
		if (event.logMessageType == "log:unsubscribe")
			return async function () {
				const { threadID } = event;
				const threadData = await threadsData.get(threadID);
				if (!threadData.settings.sendLeaveMessage)
					return;
				const { leftParticipantFbId } = event.logMessageData;
				if (leftParticipantFbId == api.getCurrentUserID())
					return;
				const hours = getTime("HH");

				const threadName = threadData.threadName;
				const userName = await usersData.getName(leftParticipantFbId);

				// {userName}   : name of the user who left the group
				// {type}       : type of the message (leave)
				// {boxName}    : name of the box
				// {threadName} : name of the box
				// {time}       : time
				// {session}    : session

				let { leaveMessage = getLang("defaultLeaveMessage") } = threadData.data;
				const form = {
					mentions: leaveMessage.match(/\{userNameTag\}/g) ? [{
						tag: userName,
						id: leftParticipantFbId
					}] : null
				};

				leaveMessage = leaveMessage
					.replace(/\{userName\}|\{userNameTag\}/g, userName)
					.replace(/\{type\}/g, leftParticipantFbId == event.author ? getLang("leaveType1") : getLang("leaveType2"))
					.replace(/\{threadName\}|\{boxName\}/g, threadName)
					.replace(/\{time\}/g, hours)
					.replace(/\{session\}/g, hours <= 12 ?
							getLang("session1") :
							hours <= 18 ?
								getLang("session2") :
								getLang("session3")
					);

				form.body = leaveMessage;

				if (leaveMessage.includes("{userNameTag}")) {
					form.mentions = [{
						id: leftParticipantFbId,
						tag: userName
					}];
				}

				if (threadData.data.leaveAttachment) {
					const files = threadData.data.leaveAttachment;
					const attachments = files.reduce((acc, file) => {
						acc.push(drive.getFile(file, "stream"));
						return acc;
					}, []);
					form.attachment = (await Promise.allSettled(attachments))
						.filter(({ status }) => status == "fulfilled")
						.map(({ value }) => value);
				}
				message.send(form);
			};
	}
};
