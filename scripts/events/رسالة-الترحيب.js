const { getTime, drive } = global.utils;
if (!global.temp.welcomeEvent)
	global.temp.welcomeEvent = {};

module.exports = { config: {
		      name: "رسالة-الترحيب",
		      version: "1.7",
		      author: "NTKhang", // تعريب: محمد تانجيرو \\
		      category: "events"
	                   },

	langs: { ar: { session1: "صباح الخيـࢪ",
		       session2: "مسـاء الخيـࢪ",
                       session3: "ليلـة سعيـدة",
		       welcomeMessage: "{session} لڪل الأعضاء 👋\n   ا⊱━━━━⊰✾⊱━━━━⊰ا\nمعڪم الحب أڪاني 🫶، أتمنى\nتسـتمـتـعـوا بـوجـودي مـعـڪم.\n   ا⊱━━━━⊰✾⊱━━━━⊰ا\nأنا بـوت ڪما تعلمـون، والبـادئـة\nالخاصـة بـي هي: [ %1 ] استعـملـها\nقبـل ڪـل أمـࢪ، مثـل: [%2أكاني].\n   ا⊱━━━━⊰✾⊱━━━━⊰ا\nلمعـࢪفـة الأوامـࢪ أكتب: [%2الاوامر]",
		       multiple1: "نوࢪت علينا المجموعـة، نتمنى أن\nتسمتـع بالإقامـة والدردشـة معنـا\nوتكون محترم مثل باقي الأعضاء",
		       multiple2: "نوࢪتم علينا المجموعـة، نتمنى أن\nتسمتـعوا بالإقامة والدردشـة معنا\nوتكونوا محترمين كباقي الأعضاء",
		       defaultWelcomeMessage: `🌹 أهلا: {userName}\n{multiple}\n   ا⊱━━━━⊰✾⊱━━━━⊰ا\n {session} لـڪ ولـلـڪـل 👋`
	       }     },

	onStart: async ({ threadsData, message, event, api, getLang }) => {
		if (event.logMessageType == "log:subscribe")
			return async function () {
				const hours = getTime("HH");
				const { threadID } = event;
				const { nickNameBot } = global.GoatBot.config;
				const prefix = global.utils.getPrefix(threadID);
				const dataAddedParticipants = event.logMessageData.addedParticipants;
				// if new member is bot
				if (dataAddedParticipants.some((item) => item.userFbId == api.getCurrentUserID())) {
					if (nickNameBot)
						api.changeNickname(nickNameBot, threadID, api.getCurrentUserID());
					return message.send(getLang("welcomeMessage", prefix));
				}
				// if new member:
				if (!global.temp.welcomeEvent[threadID])
					global.temp.welcomeEvent[threadID] = {
						joinTimeout: null,
						dataAddedParticipants: []
					};

				// push new member to array
				global.temp.welcomeEvent[threadID].dataAddedParticipants.push(...dataAddedParticipants);
				// if timeout is set, clear it
				clearTimeout(global.temp.welcomeEvent[threadID].joinTimeout);

				// set new timeout
				global.temp.welcomeEvent[threadID].joinTimeout = setTimeout(async function () {
					const threadData = await threadsData.get(threadID);
					if (threadData.settings.sendWelcomeMessage == false)
						return;
					const dataAddedParticipants = global.temp.welcomeEvent[threadID].dataAddedParticipants;
					const dataBanned = threadData.data.banned_ban || [];
					const threadName = threadData.threadName;
					const userName = [],
						mentions = [];
					let multiple = false;

					if (dataAddedParticipants.length > 1)
						multiple = true;

					for (const user of dataAddedParticipants) {
						if (dataBanned.some((item) => item.id == user.userFbId))
							continue;
						userName.push(user.fullName);
						mentions.push({
							tag: user.fullName,
							id: user.userFbId
						});
					}
					// {userName}:   name of new member
					// {multiple}:
					// {boxName}:    name of group
					// {threadName}: name of group
					// {session}:    session of day
					if (userName.length == 0) return;
					let { welcomeMessage = getLang("defaultWelcomeMessage") } =
						threadData.data;
					const form = {
						mentions: welcomeMessage.match(/\{userNameTag\}/g) ? mentions : null
					};
					welcomeMessage = welcomeMessage
						.replace(/\{userName\}|\{userNameTag\}/g, userName.join(", "))
						.replace(/\{boxName\}|\{threadName\}/g, threadName)
						.replace(
							/\{multiple\}/g,
							multiple ? getLang("multiple2") : getLang("multiple1")
						)
						.replace(
							/\{session\}/g,
							hours <= 12
									? getLang("session1")
									: hours <= 18
										? getLang("session2")
										: getLang("session3")
						);

					form.body = welcomeMessage;

					if (threadData.data.welcomeAttachment) {
						const files = threadData.data.welcomeAttachment;
						const attachments = files.reduce((acc, file) => {
							acc.push(drive.getFile(file, "stream"));
							return acc;
						}, []);
						form.attachment = (await Promise.allSettled(attachments))
							.filter(({ status }) => status == "fulfilled")
							.map(({ value }) => value);
					}
					message.send(form);
					delete global.temp.welcomeEvent[threadID];
				}, 1500);
			};
	}
};
