module.exports = { config: {
		      name: "فريق",
		      aliases: ["تاغ"],
		      version: "1.5",
		      author: "NTKhang", // تعريب: محمد تانجيرو \\
		      countDown: 5,
		      role: 0,
		      description: { ar: "عمل تاغ لمجموعة من الأعضاء أنت تختارهم"},
		      category: "info",
		      guide: { ar: " {pn} [اضافة] [اسم الفريق] [@التاغات]: تستخدم لإضافة فريق تاغ جديد، أو إضافة أعضاء إلى فريق التاغ الذي أدخلته\n"
				 + " مثال:\n{pn} اضافة المسؤولين @تاغ1 @تاغ2\n"
				 + " {pn} [ازالة] [اسم الفريق] [@التاغات]: تستخدم لإزالة الأعضاء من فريق التاغ\n"
				 + " مثال:\n{pn} ازالة المسؤولين @تاغ1 @تاغ2\n"
				 + " {pn} [حذف] [اسم الفريق]: تستعمل لحذف الفريق \n"
				 + " مثال:\n{pn} حذف المسؤولين\n"
				 + " {pn} [تاغ] [اسم الفريق]: تستعمل لعمل تاغ لفريق معين\n"
				 + " {pn} [تسمية] [اسم الفريق | الاسم الجديد للفريق]: تستخدم لإعادة تسمية الفريق\n"
				 + " {pn} [القائمة]: تستعمل لعرض فرق التاغ الموجودة في المجموعة\n"
				 + " {pn} [معلومات] [اسم الفريق]: تستخدم لعرض معلومات فريق التاغ"
		           } },

	langs: { ar: { noGroupTagName: "الرجاء إدخال اسم فريق التاغ",
		       noMention: "لم تقم بتاغ لأي عضو لإضافته إلى علامة فريق التاغ",
		       addedSuccess: "تمت إضافة الأعضاء التاليين إلى فريق التاغ \"%1\":\n%2",
		       addedSuccess2: "تمت إضافة فريق التاغ \"%1\" مع الأعضاء:\n%2",
		       existedInGroupTag: "الأعضاء:\n%1\nموجودين بالفعل في فريق التاغ \"%2\"",
		       notExistedInGroupTag: "الأعضاء:\n%1\nغير موجودين في علامة المجموعة \"%2\"",
		       noExistedGroupTag: "فريق التاغ \"%1\" غير موجود في المجموعة",
		       noExistedGroupTag2: "المجموعة لا تحتوي على أي فريق تاغ",
		       noMentionDel: "يرجى يرجى عمل تاغ للأعضاء لإزالتهم من فريق التاغ \"%1\"",
		       deletedSuccess: "تم حذف الأعضاء:\n%1\nمن فريق التاغ \"%2\"",
	               deletedSuccess2: "تم حذف فريق التاغ \"%1\"",
		       tagged: "فريق التاغ \"%1\":\n%2",
		       noGroupTagName2: "الرجاء إدخال اسم فريق التاغ القديم واسم فريق التاغ الجديد، مفصولين بـ: \"|\"",
		       renamedSuccess: "تمت إعادة تسمية الفريق \"%1\" إلى \"%2\"",
		       infoGroupTag: "📑 | اسم الفريق: %1\n👥 | عدد الأعضاء: %2\n👨‍👩‍👧‍👦 | قائمة الأعضاء:\n %3"
	       }     },

	onStart: async function ({ message, event, args, threadsData, getLang }) {
		const { threadID, mentions } = event;
		for (const uid in mentions)
			mentions[uid] = mentions[uid].replace("@", "");
		const groupTags = await threadsData.get(threadID, "data.groupTags", []);

		switch (args[0]) {
			case "إضافة":
			case "اضافة": {
				const mentionsID = Object.keys(event.mentions);
				const content = (args.slice(1) || []).join(" ");
				const groupTagName = content.slice(0, content.indexOf(event.mentions[mentionsID[0]]) - 1).trim();
				if (!groupTagName)
					return message.reply(getLang("noGroupTagName"));
				if (mentionsID.length === 0)
					return message.reply(getLang("noMention"));

				const oldGroupTag = groupTags.find(tag => tag.name.toLowerCase() === groupTagName.toLowerCase());
				if (oldGroupTag) {
					const usersIDExist = [];
					const usersIDNotExist = [];
					for (const uid in mentions) {
						if (oldGroupTag.users.hasOwnProperty(uid)) {
							usersIDExist.push(uid);
						}
						else {
							oldGroupTag.users[uid] = mentions[uid];
							usersIDNotExist.push(uid);
						}
					}
					await threadsData.set(threadID, groupTags, "data.groupTags");

					let msg = "";
					if (usersIDNotExist.length > 0)
						msg += getLang("addedSuccess", oldGroupTag.name, usersIDNotExist.map(uid => mentions[uid]).join("\n")) + "\n";
					if (usersIDExist.length > 0)
						msg += getLang("existedInGroupTag", usersIDExist.map(uid => mentions[uid]).join("\n"));
					message.reply(msg);
				}
				else {
					const newGroupTag = {
						name: groupTagName,
						users: mentions
					};
					groupTags.push(newGroupTag);
					await threadsData.set(threadID, groupTags, "data.groupTags");
					message.reply(getLang("addedSuccess2", groupTagName, Object.values(mentions).join("\n")));
				}
				break;
			}
			case "قائمة":
			case "القائمة": {
				if (args[1]) {
					const groupTagName = args.slice(1).join(" ");
					if (!groupTagName)
						return message.reply(getLang("noGroupTagName"));
					const groupTag = groupTags.find(tag => tag.name.toLowerCase() === groupTagName.toLowerCase());
					if (!groupTag)
						return message.reply(getLang("noExistedGroupTag", groupTagName));
					return showInfoGroupTag(message, groupTag, getLang);
				}
				const msg = groupTags.reduce((msg, group) => msg + `\n\n${group.name}:\n ${Object.values(group.users).map(name => name).join("\n ")}`, "");
				message.reply(msg || getLang("noExistedGroupTag2"));
				break;
			}
			case "المعلومات":
			case "معلومات": {
				const groupTagName = args.slice(1).join(" ");
				if (!groupTagName)
					return message.reply(getLang("noGroupTagName"));
				const groupTag = groupTags.find(tag => tag.name.toLowerCase() === groupTagName.toLowerCase());
				if (!groupTag)
					return message.reply(getLang("noExistedGroupTag", groupTagName));
				return showInfoGroupTag(message, groupTag, getLang);
			}
			case "إزالة":
			case "ازالة": {
				const content = (args.slice(1) || []).join(" ");
				const mentionsID = Object.keys(event.mentions);
				const groupTagName = content.slice(0, content.indexOf(mentions[mentionsID[0]]) - 1).trim();
				if (!groupTagName)
					return message.reply(getLang("noGroupTagName"));
				if (mentionsID.length === 0)
					return message.reply(getLang("noMention", groupTagName));
				const oldGroupTag = groupTags.find(tag => tag.name.toLowerCase() === groupTagName.toLowerCase());
				if (!oldGroupTag)
					return message.reply(getLang("noExistedGroupTag", groupTagName));
				const usersIDExist = [];
				const usersIDNotExist = [];
				for (const uid in mentions) {
					if (oldGroupTag.users.hasOwnProperty(uid)) {
						delete oldGroupTag.users[uid];
						usersIDExist.push(uid);
					}
					else {
						usersIDNotExist.push(uid);
					}
				}
				await threadsData.set(threadID, groupTags, "data.groupTags");

				let msg = "";
				if (usersIDNotExist.length > 0)
					msg += getLang("notExistedInGroupTag", usersIDNotExist.map(uid => mentions[uid]).join("\n"), groupTagName) + "\n";
				if (usersIDExist.length > 0)
					msg += getLang("deletedSuccess", usersIDExist.map(uid => mentions[uid]).join("\n"));
				message.reply(msg);
				break;
			}
			case "حذف": {
				const content = (args.slice(1) || []).join(" ");
				const groupTagName = content.trim();
				if (!groupTagName)
					return message.reply(getLang("noGroupTagName"));
				const index = groupTags.findIndex(group => group.name.toLowerCase() === groupTagName.toLowerCase());
				if (index === -1)
					return message.reply(getLang("noExistedGroupTag", groupTagName));
				groupTags.splice(index, 1);
				await threadsData.set(threadID, groupTags, "data.groupTags");
				message.reply(getLang("deletedSuccess2", groupTagName));
				break;
			}
			case "تسمية": {
				const content = (args.slice(1) || []).join(" ");
				const [oldGroupTagName, newGroupTagName] = content.split("|").map(str => str.trim());
				if (!oldGroupTagName || !newGroupTagName)
					return message.reply(getLang("noGroupTagName2"));
				const oldGroupTag = groupTags.find(tag => tag.name.toLowerCase() === oldGroupTagName.toLowerCase());
				if (!oldGroupTag)
					return message.reply(getLang("noExistedGroupTag", oldGroupTagName));
				oldGroupTag.name = newGroupTagName;
				await threadsData.set(threadID, groupTags, "data.groupTags");
				message.reply(getLang("renamedSuccess", oldGroupTagName, newGroupTagName));
				break;
			}
			case "تاغ":
			default: {
				const content = (args.slice(args[0] === "tag" ? 1 : 0) || []).join(" ");
				const groupTagName = content.trim();
				if (!groupTagName)
					return message.reply(getLang("noGroupTagName"));
				const oldGroupTag = groupTags.find(tag => tag.name.toLowerCase() === groupTagName.toLowerCase());
				if (!oldGroupTag)
					return message.reply(getLang("noExistedGroupTag", groupTagName));
				const { users } = oldGroupTag;
				const mentions = [];
				let msg = "";
				for (const uid in users) {
					const userName = users[uid];
					mentions.push({
						id: uid,
						tag: userName
					});
					msg += `${userName}\n`;
				}
				message.reply({
					body: getLang("tagged", groupTagName, msg),
					mentions
				});
				break;
			}
		}
	}
};

function showInfoGroupTag(message, groupTag, getLang) {
	message.reply(getLang("infoGroupTag", groupTag.name, Object.keys(groupTag.users).length, Object.keys(groupTag.users).map(uid => groupTag.users[uid]).join("\n ")));
}
