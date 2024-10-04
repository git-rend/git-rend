module.exports = { config: {
		      name: "ترتيبي",
	              aliases: ["أحسبي","عدد-الرسائل","ترتيب"],
		      version: "1.3",
		      author: "NTKhang", // تعريب وتعديل: محمد تانجيرو \\
		      countDown: 5,
		      role: 0,
		      description: { ar: "عرض عدد الرسائل لجميع الأعضاء أو لنفسك أو للشخص الي تعمل له تاغ (منذ انضمام البوت إلى المجموعة)"},
		      category: "box chat",
		      guide: { ar: " {pn}: لعرض عدد الرسائل الخاصة بك\n"
				 + " {pn} [@تاغ]: لعرض عدد الرسائل الخاصة بالعضو الذي تمت اللإشارة إليه\n"
				 + " {pn} [الكل]: لعرض عدد الرسائل لجميع الأعضاء"
		           } },

	langs: { ar: { count: "🏆 عدد ࢪسائل الكل وتࢪتيبهم 🏆",
		       endMessage: "🌹 الذيـن لا توجـد اسمـاؤهـم\nفي القائمة عدد ࢪسائلهم هو: 0",
		       page: "           الصفحة: %1 من %2",
		       reply: "🌹 ࢪد على هذه الࢪسالة بࢪقم\nالصفحة التي تࢪيد لࢪؤية المزيد",
		       result: "الاسم: %1\n🏆 التࢪتيب في المجموعة: %2\n🌹 عدد الࢪسائل: %3 ࢪسالة",
	               yourResult: "الاسم: %1\n🏆 التࢪتيب في المجموعة: %2\n🌹 عدد الࢪسائل: %3 ࢪسالة",
		       invalidPage: "ࢪقم الصفحة خاطئ، أدخل\nࢪقما صحيحا من فضلك 🌹"
	       }     },

	onStart: async function ({ args, threadsData, message, event, api, commandName, getLang, usersData }) {
		const { threadID, senderID } = event;
		const threadData = await threadsData.get(threadID);
		const { members } = threadData;
		const usersInGroup = (await api.getThreadInfo(threadID)).participantIDs;
		let arraySort = [];
		for (const user of members) {
			if (!usersInGroup.includes(user.userID))
				continue;
			const charac = "️️️️️️️️️️️️️️️️️"; // This character is banned from facebook chat (it is not an empty string)
			arraySort.push({
				name: user.name.includes(charac) ? `Uid: ${user.userID}` : user.name,
				count: user.count,
				uid: user.userID
			});
		}
		let stt = 1;
		arraySort.sort((a, b) => b.count - a.count);
		arraySort.map(item => item.stt = stt++);

		if (args[0]) {
			if (args[0].toLowerCase() == "الكل") {
				let msg = getLang("count");
				const endMessage = getLang("endMessage");
				for (const item of arraySort) {
					if (item.count > 0)
						msg += `\n${item.stt}/ ${item.name}: ${item.count}`;
				}

				if ((msg + endMessage).length > 19999) {
					msg = "";
					let page = parseInt(args[1]);
					if (isNaN(page))
						page = 1;
					const splitPage = global.utils.splitPage(arraySort, 50);
					arraySort = splitPage.allPage[page - 1];
					for (const item of arraySort) {
						if (item.count > 0)
							msg += `\n${item.stt}/ ${item.name}: ${item.count}`;
					}
					msg += getLang("page", page, splitPage.totalPage)
						+ `\n${getLang("reply")}`
						+ `\n\n${endMessage}`;

					return message.reply(msg, (err, info) => {
						if (err)
							return message.err(err);
						global.GoatBot.onReply.set(info.messageID, {
							commandName,
							messageID: info.messageID,
							splitPage,
							author: senderID
						});
					});
				}
				message.reply(msg);
			}
			else if (event.mentions) {
				let msg = "";
				for (const id in event.mentions) {
					const findUser = arraySort.find(item => item.uid == id);
					msg += `\n${getLang("result", findUser.name, findUser.stt, findUser.count)}`;
				}
				message.reply(msg);
			}
		}
		else {
			const name = await usersData.getName(senderID);
			const findUser = arraySort.find(item => item.uid == senderID);
			return message.reply(getLang("yourResult",name, findUser.stt, findUser.count));
		}
	},

	onReply: ({ message, event, Reply, commandName, getLang }) => {
		const { senderID, body } = event;
		const { author, splitPage } = Reply;
		if (author != senderID)
			return;
		const page = parseInt(body);
		if (isNaN(page) || page < 1 || page > splitPage.totalPage)
			return message.reply(getLang("invalidPage"));
		let msg = getLang("count");
		const endMessage = getLang("endMessage");
		const arraySort = splitPage.allPage[page - 1];
		for (const item of arraySort) {
			if (item.count > 0)
				msg += `\n${item.stt}/ ${item.name}: ${item.count}`;
		}
		msg += getLang("page", page, splitPage.totalPage)
			+ "\n" + getLang("reply")
			+ "\n\n" + endMessage;
		message.reply(msg, (err, info) => {
			if (err)
				return message.err(err);
			message.unsend(Reply.messageID);
			global.GoatBot.onReply.set(info.messageID, {
				commandName,
				messageID: info.messageID,
				splitPage,
				author: senderID
			});
		});
	},

	onChat: async ({ usersData, threadsData, event }) => {
		const { senderID, threadID } = event;
		const members = await threadsData.get(threadID, "members");
		const findMember = members.find(user => user.userID == senderID);
		if (!findMember) {
			members.push({
				userID: senderID,
				name: await usersData.getName(senderID),
				nickname: null,
				inGroup: true,
				count: 1
			});
		}
		else
			findMember.count += 1;
		await threadsData.set(threadID, members, "members");
	}

};
