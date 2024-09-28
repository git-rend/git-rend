const { getTime } = global.utils;

module.exports = { config: {
		      name: "انذار",
		      aliases: ["تحذير","إنذار"],
		      version: "1.8",
		      author: "NTKhang", // تعريب: محمد تانجيرو \\
		      countDown: 5,
		      role: 0,
		      description: { ar: "تحذير الأعضاء في المجموعة، إذا كان لديهم 3 تحذيرات، سيتم حظرهم"},
		      category: "box chat",
		      guide: { ar: " {pn} [@تاغ] [السبب]: تحذير العضو"
				 + " {pn} [القائمة]: عرض قائمة الأعضاء الي عندهم إنذار"
				 + " {pn} [المحظورين]: عرض قائمة الأعضاء المحظورين"
				 + " {pn} [معلومات | المعلومات] [@تاغ | الآيدي | رد | فارغة]: عرض معلومات التحذير الخاصة بك أو بالشخص الي تعمل له تاغ او ترد عليه أو تحط آيديه"
				 + " {pn} [الغاءحظر] [@تاغ | الآيدي | رد | فارغة]: قم بإلغاء حظر العضو، وفي نفس الوقت قم بإزالة كافة التحذيرات الخاصة بهذا العضو"
				 + " {pn} [الغاءتحذير] [@تاغ | الآيدي | رد | فارغة] [الرقم | فارغة]: إزالة تحذير العضو بواسطة الآيدي وعدد التحذيرات، إذا ترك فارغًا فسيتم إزالة التحذير الأخير"
				 + " {pn} [مسح]: مسح جميع بيانات التحذير"
				 + "⚠️ تحتاج إلى تعيين البوت مسؤولا لطرد الأعضاء المحظورين تلقائيًا"
		           } },

	langs: { ar: { list: "قائمة الأعضاء الذين تم تحذيرهم:\n%1\n\nلعرض تفاصيل التحذيرات، استخدم \"%2 .انذار معلومات [@تاغ | الآيدي | فلاغة]\" لعرض معلومات التحذير الخاصة بالشخص الذي تم وضع علامة عليه أو الرمز التعريفي الآيدي أو بنفسك",
		       listBan: "قائمة الأعضاء الذين تم تحذيرهم 3 مرات وتم حظرهم من المجموعة:\n%1",
		       listEmpty: "مجموعتك لا تحتوي على أعضاء تم تحذيرهم",
		       listBanEmpty: "مجموعتك لا تحتوي على أعضاء محظورين",
		       invalidUid: "الرجاء إدخال آيدي صالح للشخص الذي تريد عرض معلوماته",
		       noData: "لا توجد بيانات",
		       noPermission: "❌ يمكن لمسؤولي المجموعة فقط رفع الحظر عن الأعضاء المحظورين من المجموعة",
		       invalidUid2: "⚠️ الرجاء إدخال آيدي صالح للشخص الذي تريد إلغاء الحظر عنه",
		       notBanned: "⚠️ لم يتم حظر المستخدم صاحب الآيدي: %1 من المجموعة",
		       unbanSuccess: "✅ تم فك حظر العضو بنجاح [%1 | %2]، حاليًا يمكن لهذا الشخص الانضمام إلى المجموعة الخاص بك",
		       noPermission2: "❌ يمكن لمسؤولي المجموعة فقط إزالة التحذيرات من الأعضاء في المجموعة",
		       invalidUid3: "⚠️ الرجاء إدخال الآيدي أو وضع علامة على الشخص الذي تريد إزالة التحذير منه",
		       noData2: "⚠️ المستخدم صاحب الآيدي: %1 ليس لديه أي بيانات تحذيرية",
		       notEnoughWarn: "❌ لدى المستخدم %1 تحذيرات %2",
		       unwarnSuccess: "✅ تمت إزالة تحذير %1 الخاص بالعضو بنجاح [%2 | %3]",
		       noPermission3: "❌ يمكن لمسؤولي المجموعة فقط إعادة تعيين بيانات التحذير",
		       resetWarnSuccess: "✅ تم مسح بيانات التحذير بنجاح",
		       noPermission4: "❌ يمكن لمسؤولي المجموعة فقط تحذير الأعضاء في المجموعة",
		       invalidUid4: "⚠️ يتعين عليك عمل تاغ أو رد على رسالة الشخص الذي تريد",
		       warnSuccess: "⚠️ تم تحذير العضو %1 مرة %2\nالآيدي: %3\nالسبب: %4\n- التاريخ: %5 \nتم تحذير هذا العضو 3 مرات وتم حظره من المجموعة لإلغاء الحظر عنه استخدام الأمر \n%6انذار العاءحظر الآيدي",
		       noPermission5: "⚠️يحتاج الروبوت إلى أذونات المسؤول لطرد الأعضاء المحظورين",
		       warnSuccess2: "⚠️ تم تحذير العضو %1 %2 مرة\nالآيدي: %3\nالسبب: %4\nالتاريخ: %5\nإذا قام هذا الشخص بانتهاك %6 مرات أخرى، فسيتم حظره من المجموعة",
		       hasBanned: "⚠️ تم تحذير الأعضاء التاليين 3 مرات من قبل وتم حظرهم من المجموعة:\n%1",
		       failedKick: "⚠️ حدث خطأ عند طرد الأعضاء التاليين:\n%1",
   	               userNotInGroup: "⚠️ العضو \"%1\" حاليا ليس في مجموعتك"
	       }     },

	onStart: async function ({ message, api, event, args, threadsData, usersData, prefix, role, getLang }) {
		if (!args[0])
			return message.SyntaxError();
		const { threadID, senderID } = event;
		const warnList = await threadsData.get(threadID, "data.warn", []);

		switch (args[0]) {
			case "list": {
				const msg = await Promise.all(warnList.map(async user => {
					const { uid, list } = user;
					const name = await usersData.getName(uid);
					return `${name} (${uid}): ${list.length}`;
				}));
				message.reply(msg.length ? getLang("list", msg.join("\n"), prefix) : getLang("listEmpty"));
				break;
			}
			case "listban": {
				const result = (await Promise.all(warnList.map(async user => {
					const { uid, list } = user;
					if (list.length >= 3) {
						const name = await usersData.getName(uid);
						return `${name} (${uid})`;
					}
				}))).filter(item => item);
				message.reply(result.length ? getLang("listBan", result.join("\n")) : getLang("listBanEmpty"));
				break;
			}
			case "check":
			case "info": {
				let uids, msg = "";
				if (Object.keys(event.mentions).length)
					uids = Object.keys(event.mentions);
				else if (event.messageReply?.senderID)
					uids = [event.messageReply.senderID];
				else if (args.slice(1).length)
					uids = args.slice(1);
				else
					uids = [senderID];

				if (!uids)
					return message.reply(getLang("invalidUid"));
				msg += (await Promise.all(uids.map(async uid => {
					if (isNaN(uid))
						return null;
					const dataWarnOfUser = warnList.find(user => user.uid == uid);
					let msg = `Uid: ${uid}`;
					const userName = await usersData.getName(uid);

					if (!dataWarnOfUser || dataWarnOfUser.list.length == 0)
						msg += `\n  Name: ${userName}\n  ${getLang("noData")}`;
					else {
						msg += `\nName: ${userName}`
							+ `\nWarn list:` + dataWarnOfUser.list.reduce((acc, warn) => {
								const { dateTime, reason } = warn;
								return acc + `\n  - Reason: ${reason}\n    Time: ${dateTime}`;
							}, "");
					}
					return msg;
				}))).filter(msg => msg).join("\n\n");
				message.reply(msg);
				break;
			}
			case "unban": {
				if (role < 1)
					return message.reply(getLang("noPermission"));
				let uidUnban;
				if (Object.keys(event.mentions).length)
					uidUnban = Object.keys(event.mentions)[0];
				else if (event.messageReply?.senderID)
					uidUnban = event.messageReply.senderID;
				else if (args.slice(1).length)
					uidUnban = args.slice(1);
				else
					uidUnban = senderID;

				if (!uidUnban || isNaN(uidUnban))
					return message.reply(getLang("invalidUid2"));

				const index = warnList.findIndex(user => user.uid == uidUnban && user.list.length >= 3);
				if (index === -1)
					return message.reply(getLang("notBanned", uidUnban));

				warnList.splice(index, 1);
				await threadsData.set(threadID, warnList, "data.warn");
				const userName = await usersData.getName(uidUnban);
				message.reply(getLang("unbanSuccess", uidUnban, userName));
				break;
			}
			case "unwarn": {
				if (role < 1)
					return message.reply(getLang("noPermission2"));
				let uid, num;
				if (Object.keys(event.mentions)[0]) {
					uid = Object.keys(event.mentions)[0];
					num = args[args.length - 1];
				}
				else if (event.messageReply?.senderID) {
					uid = event.messageReply.senderID;
					num = args[1];
				}
				else {
					uid = args[1];
					num = parseInt(args[2]) - 1;
				}

				if (isNaN(uid))
					return message.reply(getLang("invalidUid3"));

				const dataWarnOfUser = warnList.find(u => u.uid == uid);
				if (!dataWarnOfUser?.list.length)
					return message.reply(getLang("noData2", uid));

				if (isNaN(num))
					num = dataWarnOfUser.list.length - 1;

				const userName = await usersData.getName(uid);
				if (num > dataWarnOfUser.list.length)
					return message.reply(getLang("notEnoughWarn", userName, dataWarnOfUser.list.length));

				dataWarnOfUser.list.splice(parseInt(num), 1);
				if (!dataWarnOfUser.list.length)
					warnList.splice(warnList.findIndex(u => u.uid == uid), 1);
				await threadsData.set(threadID, warnList, "data.warn");
				message.reply(getLang("unwarnSuccess", num + 1, uid, userName));
				break;
			}
			case "reset": {
				if (role < 1)
					return message.reply(getLang("noPermission3"));
				await threadsData.set(threadID, [], "data.warn");
				message.reply(getLang("resetWarnSuccess"));
				break;
			}
			default: {
				if (role < 1)
					return message.reply(getLang("noPermission4"));
				let reason, uid;
				if (event.messageReply) {
					uid = event.messageReply.senderID;
					reason = args.join(" ").trim();
				}
				else if (Object.keys(event.mentions)[0]) {
					uid = Object.keys(event.mentions)[0];
					reason = args.join(" ").replace(event.mentions[uid], "").trim();
				}
				else {
					return message.reply(getLang("invalidUid4"));
				}
				if (!reason)
					reason = "No reason";
				const dataWarnOfUser = warnList.find(item => item.uid == uid);
				const dateTime = getTime("DD/MM/YYYY hh:mm:ss");
				if (!dataWarnOfUser)
					warnList.push({
						uid,
						list: [{ reason, dateTime, warnBy: senderID }]
					});
				else
					dataWarnOfUser.list.push({ reason, dateTime, warnBy: senderID });

				await threadsData.set(threadID, warnList, "data.warn");

				const times = dataWarnOfUser?.list.length ?? 1;

				const userName = await usersData.getName(uid);
				if (times >= 3) {
					message.reply(getLang("warnSuccess", userName, times, uid, reason, dateTime, prefix), () => {
						api.removeUserFromGroup(uid, threadID, async (err) => {
							if (err) {
								const members = await threadsData.get(event.threadID, "members");
								if (members.find(item => item.userID == uid)?.inGroup) // check if user is still in group
									return message.reply(getLang("userNotInGroup", userName));
								else
									return message.reply(getLang("noPermission5"), (e, info) => {
										const { onEvent } = global.GoatBot;
										onEvent.push({
											messageID: info.messageID,
											onStart: async ({ event }) => {
												if (event.logMessageType === "log:thread-admins" && event.logMessageData.ADMIN_EVENT == "add_admin") {
													const { TARGET_ID } = event.logMessageData;
													if (TARGET_ID == api.getCurrentUserID()) {
														const warnList = await threadsData.get(event.threadID, "data.warn", []);
														if ((warnList.find(user => user.uid == uid)?.list.length ?? 0) <= 3)
															global.GoatBot.onEvent = onEvent.filter(item => item.messageID != info.messageID);
														else
															api.removeUserFromGroup(uid, event.threadID, () => global.GoatBot.onEvent = onEvent.filter(item => item.messageID != info.messageID));
													}
												}
											}
										});
									});
							}
						});
					});
				}
				else
					message.reply(getLang("warnSuccess2", userName, times, uid, reason, dateTime, 3 - (times)));
			}
		}
	},

	onEvent: async ({ event, threadsData, usersData, message, api, getLang }) => {
		const { logMessageType, logMessageData } = event;
		if (logMessageType === "log:subscribe") {
			return async () => {
				const { data, adminIDs } = await threadsData.get(event.threadID);
				const warnList = data.warn || [];
				if (!warnList.length)
					return;
				const { addedParticipants } = logMessageData;
				const hasBanned = [];

				for (const user of addedParticipants) {
					const { userFbId: uid } = user;
					const dataWarnOfUser = warnList.find(item => item.uid == uid);
					if (!dataWarnOfUser)
						continue;
					const { list } = dataWarnOfUser;
					if (list.length >= 3) {
						const userName = await usersData.getName(uid);
						hasBanned.push({
							uid,
							name: userName
						});
					}
				}

				if (hasBanned.length) {
					await message.send(getLang("hasBanned", hasBanned.map(item => `  - ${item.name} (uid: ${item.uid})`).join("\n")));
					if (!adminIDs.includes(api.getCurrentUserID()))
						message.reply(getLang("noPermission5"), (e, info) => {
							const { onEvent } = global.GoatBot;
							onEvent.push({
								messageID: info.messageID,
								onStart: async ({ event }) => {
									if (
										event.logMessageType === "log:thread-admins"
										&& event.logMessageData.ADMIN_EVENT == "add_admin"
										&& event.logMessageData.TARGET_ID == api.getCurrentUserID()
									) {
										const threadData = await threadsData.get(event.threadID);
										const warnList = threadData.data.warn;
										const members = threadData.members;
										removeUsers(hasBanned, warnList, api, event, message, getLang, members);
										global.GoatBot.onEvent = onEvent.filter(item => item.messageID != info.messageID);
									}
								}
							});
						});
					else {
						const members = await threadsData.get(event.threadID, "members");
						removeUsers(hasBanned, warnList, api, event, message, getLang, members);
					}
				}
			};
		}
	}
};

async function removeUsers(hasBanned, warnList, api, event, message, getLang, members) {
	const failed = [];
	for (const user of hasBanned) {
		if (members.find(item => item.userID == user.uid)?.inGroup) { // check if user is still in group
			try {
				if (warnList.find(item => item.uid == user.uid)?.list.length ?? 0 >= 3)
					await api.removeUserFromGroup(user.uid, event.threadID);
			}
			catch (e) {
				failed.push({
					uid: user.uid,
					name: user.name
				});
			}
		}
	}
	if (failed.length)
		message.reply(getLang("failedKick", failed.map(item => `  - ${item.name} (uid: ${item.uid})`).join("\n")));
}
