module.exports = { config: {
		      name: "تجاهل2",
		      aliases: ["ترخيص2", "ترخيص-وضع-المسؤولين"],
		      version: "1.2",
		      author: "NTKhang", // تعريب: محمد تانجيرو \\
		      countDown: 5,
		      role: 2,
		      description: { ar: "عند تشغيل وضع المسؤولين فقط، يمكن للأعضاء استخدام الأمر المضاف من هذا الأمر"},
		      category: "owner",
		      guide: { ar: " {pn} [اضافة] [اسم الأمر]: إضافة أمر إلى قائمة التجاهل\n"
				 + " {pn} [حذف] [اسم الأمر]: إزالة الأمر من قائمة التجاهل\n"
				 + " {pn} [القائمة]: عرض قائمة الاوامر المتجاهلة"
		           } },

	langs: { ar: { missingCommandNameToAdd: "⚠️ الرجاء إدخال اسم الأمر الذي تريد إضافته إلى قائمة التجاهل",
		       missingCommandNameToDelete: "⚠️ الرجاء إدخال اسم الأمر الذي تريد حذفه من قائمة التجاهل",
		       commandNotFound: "❌ لم يتم العثور على الأمر \"%1\" في قائمة أوامر البوت",
		       commandAlreadyInList: "❌ الأمر \"%1\" موجود بالفعل في قائمة التجاهل",
		       commandAdded: "✅ تمت إضافة الأمر \"%1\" إلى قائمة التجاهل",
                       commandNotInList: "❌ الأمر \"%1\" ليس موجودًا في قائمة التجاهل",
		       commandDeleted: "✅ تمت إزالة الأمر \"%1\" من قائمة التجاهل",
		       ignoreList: "📑 قائمة التجاهل في مجموعتك:\n%1"
	       }     },

	onStart: async function ({ args, message, threadsData, getLang, event }) {
		const ignoreList = await threadsData.get(event.threadID, "data.ignoreCommanToOnlyAdminBox", []);
		switch (args[0]) {
			case "اضافة": {
				if (!args[1])
					return message.reply(getLang("missingCommandNameToAdd"));
				const commandName = args[1].toLowerCase();
				const command = global.GoatBot.commands.get(commandName);
				if (!command)
					return message.reply(getLang("commandNotFound", commandName));
				if (ignoreList.includes(commandName))
					return message.reply(getLang("commandAlreadyInList", commandName));
				ignoreList.push(commandName);
				await threadsData.set(event.threadID, ignoreList, "data.ignoreCommanToOnlyAdminBox");
				return message.reply(getLang("commandAdded", commandName));
			}
			case "حذف":
			case "مسح":
			case "ازالة":
			case "إزالة": {
				if (!args[1])
					return message.reply(getLang("missingCommandNameToDelete"));
				const commandName = args[1].toLowerCase();
				const command = global.GoatBot.commands.get(commandName);
				if (!command)
					return message.reply(getLang("commandNotFound", commandName));

				if (!ignoreList.includes(commandName))
					return message.reply(getLang("commandNotInList", commandName));
				ignoreList.splice(ignoreList.indexOf(commandName), 1);
				await threadsData.set(event.threadID, ignoreList, "data.ignoreCommanToOnlyAdminBox");
				return message.reply(getLang("commandDeleted", commandName));
			}
			case "القائمة":
			case "قائمة": {
				return message.reply(getLang("ignoreList", ignoreList.join(", ")));
			}
			default: {
				return message.SyntaxError();
			}
		}
	}
};
