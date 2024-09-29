module.exports = { config: {
		      name: "ضبط-التسميات",
	              aliases:["ضبط8"], 
		      version: "1.8",
		      author: "NTKhang", // تعريب: محمد تانجيرو \\
		      countDown: 5,
		      role: 0,
		      description: { ar: "أضف تسميات أخرى لأي أمر في مجموعتك"},
		      category: "config",
		      guide: { ar: " يُستخدم هذا الأمر لإضافة | إزالة التسميات الأخرى لأي أمر في مجموعتك\n"
				 + " {pn} [اضافة] [الاسم المضاف] [اسم الأمر]: أضف اسمًا آخر للأمر في مجموعتك\n"
				 + " {pn} [اضافة] [الاسم المضاف] [اسم الأمر] [الكل]: إضافة اسم آخر للأمر في النظام بأكمله (المطور فقط)\n"
				 + " مثال:\n{pn} اضافة مساعدة اوامر\n"
				 + " {pn} [حذف] [الاسم المضاف] [اسم الأمر]: احذف اسمًا من الأسماء الأخرى للأمر في مجموعتك\n"
				 + " {pn} [حذف] [لاسم المضاف] [اسم الأمر] [الكل]: إزالة اسم من الأسماء الأخرى للأمر في النظام بأكمله (المطور فقط)\n"
				 + " مثال:\n{pn} حذف مساعدة اوامر\n"
				 + " {pn} القائمة: عرض كافة الأسماء الأخرى للأوامر في مجموعتك\n"
				 + " {pn} قائمة الكل: عرض جميع الأسماء الأخرى للأوامر في النظام بأكمله"
		           } },

	langs: { ar: { commandNotExist: "❌ الامر \"%1\" غير موجود",
		       aliasExist: "❌ الاسم المضاف \"%1\" موجود في امر آخر وهو: \"%2\" في النظام",
		       addAliasSuccess: "✅ تمت إضافة اسم \"%1\" مع الأسماء الأخرى في أمر \"%2\" في النظام",
	               noPermissionAdd: "❌ ليس لديك الصلاحية لإضافة اسم آخر \"%1\" لأمر: \"%2\" في النظام",
		       aliasIsCommand: "❌ الاسم المضاف \"%1\" هو نفس الاسم لأمر آخر في النظام",
		       aliasExistInGroup: "❌ الاسم المضاف \"%1\" موجود بالفعل للأمر \"%2\" في هذه المجموعة",
		       addAliasToGroupSuccess: "✅ تمت إضافة اسم آخر \"%1\" للامر \"%2\" في هذه المجموعة",
		       aliasNotExist: "❌ الاسم المضاف \"%1\" غير موجود للأمر \"%2\"",
		       removeAliasSuccess: "✅ تم حذف اسم من الأسماء الأخرى \"%1\" من الأمر \"%2\" في النظام",
		       noPermissionDelete: "❌ ليس لديك الصلاحية لإزالة الاسم \"%1\" من الأسماء الأخرى للامر \"%2\" من النظام",
		       noAliasInGroup: "❌ الامر \"%1\" ليس لديه أي اسم آخر في مجموعتك",
		       removeAliasInGroupSuccess: "✅ تم حذف اسم \"%1\" من الأسماء الأخرى للأمر \"%2\" من المجموعة",
		       aliasList: "📜 قائمة الأسماء الأخرى لكل الأوامر في النظام:\n%1",
		       noAliasInSystem: "⚠️ لا توجد أسماء أخرى للأوامر في النظام",
		       notExistAliasInGroup: "⚠️ لم تقم مجموعتك بتعيين أي أسماء أخرى للأوامر",
		       aliasListInGroup: "📜 قائمة الأسماء الأخرى للأوامر في مجموعتك:\n%1"
	       }     },

	onStart: async function ({ message, event, args, threadsData, globalData, role, getLang }) {
		const aliasesData = await threadsData.get(event.threadID, "data.aliases", {});

		switch (args[0]) {
			case "اضافة": {
				if (!args[2])
					return message.SyntaxError();
				const commandName = args[2].toLowerCase();
				if (!global.GoatBot.commands.has(commandName))
					return message.reply(getLang("commandNotExist", commandName));
				const alias = args[1].toLowerCase();

				if (args[3] == 'الكل') {
					if (role > 1) {
						const globalAliasesData = await globalData.get('setalias', 'data', []);
						const globalAliasesExist = globalAliasesData.find(item => item.aliases.includes(alias));
						if (globalAliasesExist)
							return message.reply(getLang("aliasExist", alias, globalAliasesExist.commandName));
						if (global.GoatBot.aliases.has(alias))
							return message.reply(getLang("aliasExist", alias, global.GoatBot.aliases.get(alias)));
						const globalAliasesThisCommand = globalAliasesData.find(aliasData => aliasData.commandName == commandName);
						if (globalAliasesThisCommand)
							globalAliasesThisCommand.aliases.push(alias);
						else
							globalAliasesData.push({
								commandName,
								aliases: [alias]
							});
						await globalData.set('setalias', globalAliasesData, 'data');
						global.GoatBot.aliases.set(alias, commandName);
						return message.reply(getLang("addAliasSuccess", alias, commandName));
					}
					else {
						return message.reply(getLang("noPermissionAdd", alias, commandName));
					}
				}

				if (global.GoatBot.commands.get(alias))
					return message.reply(getLang("aliasIsCommand", alias));
				if (global.GoatBot.aliases.has(alias))
					return message.reply(getLang("aliasExist", alias, global.GoatBot.aliases.get(alias)));
				for (const cmdName in aliasesData)
					if (aliasesData[cmdName].includes(alias))
						return message.reply(getLang("aliasExistInGroup", alias, cmdName));

				const oldAlias = aliasesData[commandName] || [];
				oldAlias.push(alias);
				aliasesData[commandName] = oldAlias;
				await threadsData.set(event.threadID, aliasesData, "data.aliases");
				return message.reply(getLang("addAliasToGroupSuccess", alias, commandName));
			}
			case "حذف":
			case "مسح": {
				if (!args[2])
					return message.SyntaxError();
				const commandName = args[2].toLowerCase();
				const alias = args[1].toLowerCase();

				if (!global.GoatBot.commands.has(commandName))
					return message.reply(getLang("commandNotExist", commandName));

				if (args[3] == 'الكل') {
					if (role > 1) {
						const globalAliasesData = await globalData.get('setalias', 'data', []);
						const globalAliasesThisCommand = globalAliasesData.find(aliasData => aliasData.commandName == commandName);
						if (!globalAliasesThisCommand || !globalAliasesThisCommand.aliases.includes(alias))
							return message.reply(getLang("aliasNotExist", alias, commandName));
						globalAliasesThisCommand.aliases.splice(globalAliasesThisCommand.aliases.indexOf(alias), 1);
						await globalData.set('setalias', globalAliasesData, 'data');
						global.GoatBot.aliases.delete(alias);
						return message.reply(getLang("removeAliasSuccess", alias, commandName));
					}
					else {
						return message.reply(getLang("noPermissionDelete", alias, commandName));
					}
				}

				const oldAlias = aliasesData[commandName];
				if (!oldAlias)
					return message.reply(getLang("noAliasInGroup", commandName));
				const index = oldAlias.indexOf(alias);
				if (index === -1)
					return message.reply(getLang("aliasNotExist", alias, commandName));
				oldAlias.splice(index, 1);
				await threadsData.set(event.threadID, aliasesData, "data.aliases");
				return message.reply(getLang("removeAliasInGroupSuccess", alias, commandName));
			}
			case "قالئمة":
			case "القالئمة": {
				if (args[1] =='الكل') {
					const globalAliasesData = await globalData.get('setalias', 'data', []);
					const globalAliases = globalAliasesData.map(aliasData => ({
						commandName: aliasData.commandName,
						aliases: aliasData.aliases.join(', ')
					}));
					return message.reply(
						globalAliases.length ?
							getLang("aliasList", globalAliases.map(alias => `• ${alias.commandName}: ${alias.aliases}`).join('\n')) :
							getLang("noAliasInSystem")
					);
				}

				if (!Object.keys(aliasesData).length)
					return message.reply(getLang("notExistAliasInGroup"));
				const list = Object.keys(aliasesData).map(commandName => `\n• ${commandName}: ${aliasesData[commandName].join(", ")} `);
				return message.reply(getLang("aliasListInGroup", list.join("\n")));
			}
			default: {
				return message.SyntaxError();
			}
		}
	}
};
