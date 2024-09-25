const { findUid } = global.utils;
const moment = require("moment-timezone");

module.exports = { config: {
		      name: "حظروالغاء",
	              aliases: ["حظر","الغاءحظر"],
		      version: "1.4",
		      author: "NTKhang", // تعريب وتعديل: محمد تانجيرو \\
		      countDown: 5,
		      role: 1,
		      description: { ar: "حظر عضو من استخدام البوت في المجموعة"},
		      category: "box chat",
		      guide: { ar: " {pn} [@تاغ | رد | الآيدي | الرابط] [السبب | فارغ]: حظر المستخدم من استخدام البوت في الجموعة\n"
				 + " {pn} [تحقق]: التحقق من الأعضاء المحظورين وطردهم من الدردشة\n"
				 + " {pn} [الغاء] [@تاغ | رد | الآيدي | الرابط]: الغاء حظر المستخدم من استخدام البوت في الجموعة\n"
				 + " {pn} [القائمة]: عرض قائمة الأعضاء المحظورين"
		           } },
	langs: { ar: { notFoundTarget: "🌹 لحظࢪ شخص اعمل تاغ له أو\nࢪد علـى ࢪسالتـه أو أدخـل الآيـدي\nالخـاص به أو أدخل ࢪابط حسـابه",
		       notFoundTargetUnban: "🌹 لالغاء حظࢪ عضو اعمل تاغ له\nأو ࢪد على ࢪسالته أو أدخل الآيدي\nالخـاص به أو أدخل ࢪابط حسـابه",
		       userNotBanned: "العضو: %1\nالآيدي: %2\nغيࢪ محظوࢪ في هذه المجموعة",
		       unbannedSuccess: "العضو: %1\nالآيدي: %2\nتم إلغاء حظࢪه من المجموعة ✅",
		       cantSelfBan: "🌹 لا تستطيع حظࢪ نفسڪ",
		       cantBanAdmin: "🌹 لا يمڪنك حظࢪ المسؤولين",
		       existedBan: "الاسم: %1\nالآيدي: %2\n🌹 هذا العضو محظوࢪ من قبل",
		       noReason: "لم يتم إدخال السبب 🌹",
		       bannedSuccess: "العضو: %1\nالآيدي: %2\nتم حظࢪه من المجموعة بنجاح ✅",
		       needAdmin: "🌹 أحتاج أن أكون مسؤولة في\nالمجموعة حتى أستطيع طࢪدهم",
		       noName: "مستخدم فيسبوك",
		       noData: "🌹 لا يوجد أعضاء محظوࢪين\n  لعࢪضـهم فـي قائـمـة الحظـࢪ",
		       listBanned: "♡ قائمة الأعضاء المحظوࢪين ♡\n🌹 فـي هـذه الـمـجـمـوعـة 🌹\n\n%1\n         الصفحة: %2 من %3",
		       content: "ا%1ا • الاسم: %2\nالآيدي: %3\n• السبب: %4\n        • الوقت والتاريخ:\nا[ %5 ]ا\n\n",
		       needAdminToKick: "الاسم: %1\nالآيدي: %2\nتم حظࢪه من استخدام البوت في\nالمجموعة، لكن لم يتم طࢪده لأني\nلسـت مسؤولـة، ارفعـني مسؤولـة\nفي المجموعة لكي يتم طرده ✅",
		       nobanned: "🌹 لا يوجد أعضاء محظوࢪين\n  لـطـࢪدهـم مـن الـمـجـمـوعـة",
		       bannedKick: "الاسم: %1\nالآيدي: %2\n✅ تم حظـࢪه وطـرده من قبـل\n• السبب: %3\n          • الوقت والتاࢪيخ:\nا[ %4 ]ا\nسيتم طࢪده تلقائيا بمجࢪد إدخاله\nللمجموعة، إذا أࢪدت إدخاله يجب\nإلغاء حظࢪه، وبعدها قم بإضافته."
	       }     },

	onStart: async function ({ message, event, args, threadsData, getLang, usersData, api }) {
		const { members, adminIDs } = await threadsData.get(event.threadID);
		const { senderID } = event;
		let target;
		let reason;

		const dataBanned = await threadsData.get(event.threadID, 'data.banned_ban', []);

		if (args[0] == 'الغاء') {
			if (!isNaN(args[1]))
				target = args[1];
			else if (args[1]?.startsWith('https'))
				target = await findUid(args[1]);
			else if (Object.keys(event.mentions || {}).length)
				target = Object.keys(event.mentions)[0];
			else if (event.messageReply?.senderID)
				target = event.messageReply.senderID;
			else
				return api.sendMessage(getLang('notFoundTargetUnban'), event.threadID, event.messageID);

			const index = dataBanned.findIndex(item => item.id == target);
			const name = await usersData.getName(target);
			if (index == -1)
				return api.sendMessage(getLang('userNotBanned', name, target), event.threadID, event.messageID);

			dataBanned.splice(index, 1);
			await threadsData.set(event.threadID, dataBanned, 'data.banned_ban');
			const userName = members[target]?.name || await usersData.getName(target) || getLang('noName');

			return api.sendMessage(getLang('unbannedSuccess', userName, target), event.threadID, event.messageID);
		}
		else if (args[0] == "تحقق" | args[0] == "فحص") {
			if (!dataBanned.length)
				return message.reply(getLang('nobanned'));
			for (const user of dataBanned) {
				if (event.participantIDs.includes(user.id))
					api.removeUserFromGroup(user.id, event.threadID);
			}
		}

		if (event.messageReply?.senderID) {
			target = event.messageReply.senderID;
			reason = args.join(' ');
		}
		else if (Object.keys(event.mentions || {}).length) {
			target = Object.keys(event.mentions)[0];
			reason = args.join(' ').replace(event.mentions[target], '');
		}
		else if (!isNaN(args[0])) {
			target = args[0];
			reason = args.slice(1).join(' ');
		}
		else if (args[0]?.startsWith('https')) {
			target = await findUid(args[0]);
			reason = args.slice(1).join(' ');
		}
		else if (args[0] == 'قائمة' | args[0] == "القائمة") {
			if (!dataBanned.length)
				return message.reply(getLang('noData'));
			const limit = 20;
			const page = parseInt(args[1] || 1) || 1;
			const start = (page - 1) * limit;
			const end = page * limit;
			const data = dataBanned.slice(start, end);
			let msg = '';
			let count = 0;
			for (const user of data) {
				count++;
				const name = members[user.id]?.name || await usersData.getName(user.id) || getLang('noName');
				const time = user.time;
				msg += getLang('content', start + count, name, user.id, user.reason, time);
			}
			return message.reply(getLang('listBanned',msg, page, Math.ceil(dataBanned.length / limit)));
		}

		if (!target)
			return message.reply(getLang('notFoundTarget'));
		if (target == senderID)
			return message.reply(getLang('cantSelfBan'));
		if (adminIDs.includes(target))
			return message.reply(getLang('cantBanAdmin'));

		const banned = dataBanned.find(item => item.id == target);
		const named = await usersData.getName(target);
		if (banned)
			return message.reply(getLang('existedBan', named, target));

		const name = members[target]?.name || (await usersData.getName(target)) || getLang('noName');
		const time = moment().tz(global.GoatBot.config.timeZone).format('HH:mm:ss DD/MM/YYYY');
		const data = {
			id: target,
			time,
			reason: reason || getLang('noReason')
		};

		dataBanned.push(data);
		await threadsData.set(event.threadID, dataBanned, 'data.banned_ban');
		message.reply(getLang('bannedSuccess', name, target), () => {
			if (members.some(item => item.userID == target)) {
				if (adminIDs.includes(api.getCurrentUserID())) {
					if (event.participantIDs.includes(target))
						api.removeUserFromGroup(target, event.threadID);
				}
				else {
					message.send(getLang('needAdmin'), (err, info) => {
						global.GoatBot.onEvent.push({
							messageID: info.messageID,
							onStart: ({ event }) => {
								if (event.logMessageType === "log:thread-admins" && event.logMessageData.ADMIN_EVENT == "add_admin") {
									const { TARGET_ID } = event.logMessageData;
									if (TARGET_ID == api.getCurrentUserID()) {
										api.removeUserFromGroup(target, event.threadID, () => global.GoatBot.onEvent = global.GoatBot.onEvent.filter(item => item.messageID != info.messageID));
									}
								}
							}
						});
					});
				}
			}
		});
	},

	onEvent: async function ({ event, api, threadsData, getLang, message }) {
		if (event.logMessageType == "log:subscribe") {
			const { threadID } = event;
			const dataBanned = await threadsData.get(threadID, 'data.banned_ban', []);
			const usersAdded = event.logMessageData.addedParticipants;

			for (const user of usersAdded) {
				const { userFbId, fullName } = user;
				const banned = dataBanned.find(item => item.id == userFbId);
				if (banned) {
					const reason = banned.reason || getLang('noReason');
					const time = banned.time;
					return api.removeUserFromGroup(userFbId, threadID, err => {
						if (err)
							return message.send(getLang('needAdminToKick', fullName, userFbId), (err, info) => {
								global.GoatBot.onEvent.push({
									messageID: info.messageID,
									onStart: ({ event }) => {
										if (event.logMessageType === "log:thread-admins" && event.logMessageData.ADMIN_EVENT == "add_admin") {
											const { TARGET_ID } = event.logMessageData;
											if (TARGET_ID == api.getCurrentUserID()) {
												api.removeUserFromGroup(userFbId, event.threadID, () => global.GoatBot.onEvent = global.GoatBot.onEvent.filter(item => item.messageID != info.messageID));
											}
										}
									}
								});
							});
						else
							message.send(getLang('bannedKick', fullName, userFbId, reason, time));
					});
				}
			}
		}
	}
};
