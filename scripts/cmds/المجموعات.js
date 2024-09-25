const { getTime } = global.utils;

module.exports = { config: {
		      name: "المجموعات",
		      version: "1.5",
		      author: "NTKhang", // تعريب: محمد تانجيرو \\
		      countDown: 5,
		      role: 2,
		      description: {ar: "إدارة المجموعات في النظام"},
		      category: "owner",
		      guide: { ar: " {pn} [بحث] [اسم المجموعة]: البحث عن المجموعات في بيانات البوت عن طريق الاسم\n"
				 + " {pn} [بحث] [حالية] [اسم المجموعة]: البحث عن المجموعات (التي مازال البوت منضم لها) في بيانات البوت عن طريق الاسم\n"
				 + " {pn} [حظر] [الآيدي | فارغ] [السبب]: لحظر المجموعة الحالية اوعن طريق الآيدي من استخدام البوت\n"
				 + " {pn} [الغاءحظر] [الآيدي | فارغ]: لإلغاء حظر المجموعة الحالية اوعن طريق الآيدي من استخدام البوت"
		           } },

	langs: { ar: { noPermission: "ليس لديك الصلاحية لاستخدام\nهـذه الميـزة؛ فقـط المطـوࢪ ✅",
		       found: "🌹 توجـد %1 مجموعة بـهـذا\nالاسـم في قاعـدة البيانـات:\n\n%3\n%4",
		       notFound: "🌹 لا توجد في بيانات البوت\nمجموعة باسم: %1",
		       hasBanned: "المجموعة: %2\nالآيدي: [%1]\n🌹 تـم حـظـࢪها مـن قبـل ✅\n🌹السبب: %3\nالوفت: %4",
		       banned: "المجموعة: %2\nالآيدي: [%1]\n🌹 تـم حـظـࢪها بنـجـاح ✅\n🌹السبب: %3\nالوفت: %4",
		       notBanned: "المجموعة: %2\nالآيدي: [%1]\n🌹 غير محظوࢪة من طࢪف البوت",
		       unbanned: "المجموعة: %2\nالآيدي: [%1]\n🌹 تـم إلغـاء حظـࢪها بنجـاح ✅",
		       missingReason: " يجب إدخال سبب الحظࢪ\nبعد تعيين المجموعة لحظࢪها",
		       info: "الاسم: %2\nآيدي: %1\n       • تاريخ كتابة البيانات:\nا[ %3 ]ا\n     • عدد الأعضاء: %4 عضو\n       • عدد الأولاد: %5 ولد\n       • عدد البنات: %6 بنت\n  • عدد الرسائل: %7 رسالة\n           • ا[ %8 ]ا"
	       }     },

	onStart: async function ({ args, threadsData, message, role, event, getLang }) {
		const type = args[0];

		switch (type) {
			// find thread
			case "بحث": {
				if (role < 2)
					return message.reply(getLang("noPermission"));
				let allThread = await threadsData.getAll();
				let keyword = args.slice(1).join(" ");
				if (['-j', '-join'].includes(args[1])) {
					allThread = allThread.filter(thread => thread.members.some(member => member.userID == global.GoatBot.botID && member.inGroup));
					keyword = args.slice(2).join(" ");
				}
				const result = allThread.filter(item => item.threadID.length > 15 && (item.threadName || "").toLowerCase().includes(keyword.toLowerCase()));
				const resultText = result.reduce((i, thread) => i += `\n╭Name: ${thread.threadName}\n╰ID: ${thread.threadID}`, "");
				let msg = "";
				if (result.length > 0)
					msg += getLang("found", result.length, keyword, resultText);
				else
					msg += getLang("notFound", keyword);
				message.reply(msg);
				break;
			}
			// ban thread
			case "حظر": {
				if (role < 2)
					return message.reply(getLang("noPermission"));
				let tid, reason;
				if (!isNaN(args[1])) {
					tid = args[1];
					reason = args.slice(2).join(" ");
				}
				else {
					tid = event.threadID;
					reason = args.slice(1).join(" ");
				}
				if (!tid)
					return message.SyntaxError();
				if (!reason)
					return message.reply(getLang("missingReason"));
				reason = reason.replace(/\s+/g, ' ');
				const threadData = await threadsData.get(tid);
				const name = threadData.threadName;
				const status = threadData.banned.status;

				if (status)
					return message.reply(getLang("hasBanned", tid, name, threadData.banned.reason, threadData.banned.date));
				const time = getTime("DD/MM/YYYY HH:mm:ss");
				await threadsData.set(tid, {
					banned: {
						status: true,
						reason,
						date: time
					}
				});
				return message.reply(getLang("banned", tid, name, reason, time));
			}
			// unban thread
			case "الغاءحظر": {
				if (role < 2)
					return message.reply(getLang("noPermission"));
				let tid;
				if (!isNaN(args[1]))
					tid = args[1];
				else
					tid = event.threadID;
				if (!tid)
					return message.SyntaxError();

				const threadData = await threadsData.get(tid);
				const name = threadData.threadName;
				const status = threadData.banned.status;

				if (!status)
					return message.reply(getLang("notBanned", tid, name));
				await threadsData.set(tid, {
					banned: {}
				});
				return message.reply(getLang("unbanned", tid, name));
			}
			// info thread
			case "معلومات": {
				let tid;
				if (!isNaN(args[1]))
					tid = args[1];
				else
					tid = event.threadID;
				if (!tid)
					return message.SyntaxError();
				const threadData = await threadsData.get(tid);
				const createdDate = getTime(threadData.createdAt, "DD/MM/YYYY HH:mm:ss");
				const valuesMember = Object.values(threadData.members).filter(item => item.inGroup);
				const totalBoy = valuesMember.filter(item => item.gender == "MALE").length;
				const totalGirl = valuesMember.filter(item => item.gender == "FEMALE").length;
				const totalMessage = valuesMember.reduce((i, item) => i += item.count, 0);
				const infoBanned = threadData.banned.status ?
					`\n- Banned: ${threadData.banned.status}`
					+ `\n- Reason: ${threadData.banned.reason}`
					+ `\n- Time: ${threadData.banned.date}` :
					"";
				const msg = getLang("info", threadData.threadID, threadData.threadName, createdDate, valuesMember.length, totalBoy, totalGirl, totalMessage, infoBanned);
				return message.reply(msg);
			}
			default:
				return message.reply("🌹 استخـدام خاطـئ، أڪتـب:\n[.اوامر المجموعات] لـمـعـࢪفـة\nكيفية استخدام الأمࢪ الصحيحة")
		}
	}
};
