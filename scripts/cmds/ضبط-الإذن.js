module.exports = { config: {
		      name: "ضبط-الاذن",
	              aliases: ["ضبط2","ضبط-الإذن"], 
		      version: "1.4",
		      author: "NTKhang", // تعريب: محمد تانجيرو \\
		      countDown: 5,
		      role: 1,
		      description: { ar: "تحرير إذن الأمر (إذن الأوامر بين 0 و 2)"},
		      category: "info",
		      guide: { ar: " {pn} [اسم الأمر] [الإذن الجديد]: تعيين إذن جديد للأمر مع استخدام القيم التالية: \n"
				 + " الإذن الجديد : [0 | 1 | 2]\n"
				 + " مثال:\n"
				 + " {pn} اكاني 1: يمكن للمسؤولين فقط استخدام الامر)\n"
				 + " {pn} اكاني 0: يمكن لكل الأعضاء استعمال الامر\n"
				 + " {pn} اكاني اعادة: اعادة الأمر كما كان\n"
				 + "\n—————\n"
				 + " {pn} [عرض]: عرض إذن الأوامر المعدلة"
			  }  },

	langs: { ar: { noEditedCommand: "✅ مجموعتك ليس لديها أي إذن معدّل",
		       editedCommand: "⚠️ قامت مجموعتك بتحرير إذن الأوامر:\n",
		       noPermission: "❗ يمكن للمسؤول فقط استخدام هذا الأمر",
		       commandNotFound: "الأمر \"%1\" لم يتم العثور عليه",
		       noChangeRole: "❗ لا يمكن تغيير الإذن لـ: \"%1\"",
		       resetRole: "مسح إذن الأمر المعدل \"%1\" to default",
		       changedRole: "تم تغيير إذن \"%1\" إلى %2"
	       }     },

	onStart: async function ({ message, event, args, role, threadsData, getLang }) {
		const { commands, aliases } = global.GoatBot;
		const setRole = await threadsData.get(event.threadID, "data.setRole", {});

		if (["view", "viewrole", "show"].includes(args[0])) {
			if (!setRole || Object.keys(setRole).length === 0)
				return message.reply(getLang("noEditedCommand"));
			let msg = getLang("editedCommand");
			for (const cmd in setRole) msg += `- ${cmd} => ${setRole[cmd]}\n`;
			return message.reply(msg);
		}

		let commandName = (args[0] || "").toLowerCase();
		let newRole = args[1];
		if (!commandName || (isNaN(newRole) && newRole !== "default"))
			return message.SyntaxError();
		if (role < 1)
			return message.reply(getLang("noPermission"));

		const command = commands.get(commandName) || commands.get(aliases.get(commandName));
		if (!command)
			return message.reply(getLang("commandNotFound", commandName));
		commandName = command.config.name;
		if (command.config.role > 1)
			return message.reply(getLang("noChangeRole", commandName));

		let Default = false;
		if (newRole === "default" || newRole == command.config.role) {
			Default = true;
			newRole = command.config.role;
		}
		else {
			newRole = parseInt(newRole);
		}

		setRole[commandName] = newRole;
		if (Default)
			delete setRole[commandName];
		await threadsData.set(event.threadID, setRole, "data.setRole");
		message.reply("✅ " + (Default === true ? getLang("resetRole", commandName) : getLang("changedRole", commandName, newRole)));
	}
};
