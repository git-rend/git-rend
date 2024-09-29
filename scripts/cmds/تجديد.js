module.exports = { config: {
		      name: "تجديد",
		      version: "1.2",
		      author: "NTKhang", // تعريب: محمد تانجيرو \\
		      countDown: 60,
		      role: 0,
		      description: { ar: "تحديث معلومات المجموعة أو الأعضاء"},
		      category: "box chat",
		      guide: { ar: " {pn} [المجموعة]: تحديث معلومات المجموعة\n"
				 + " {pn} [المجموعة] [آيدي المجموعة]: تحديث معلومات المجموعة عن طريق الآيدي\n"
				 + " {pn} [العضو]: تحديث معلومات المستخدم الخاصة بك\n"
				 + " {pn} [العضو] [الآيدي | @تاغ]: تحديث معلومات العضو الي عملت له تاغ او عن طريق الآيدي"
		           } },

	langs: { ar: { refreshMyThreadSuccess: "✅ | تم تحديث معلومات المجموعة الخاصة بك بنجاح",
	               refreshThreadTargetSuccess: "✅ | تم تحديث معلومات المجموعة %1 بنجاح",
		       errorRefreshMyThread: "❌ | حدث خطأ عند تحديث معلومات المجموعة الخاصة بك",
		       errorRefreshThreadTarget: "❌ | حدث خطأ عند تحديث معلومات المجموعة %1",
		       refreshMyUserSuccess: "✅ | تم تحديث معلومات المستخدم الخاص بك بنجاح",
	               refreshUserTargetSuccess: "✅ | تم تحديث معلومات المستخدم %1 بنجاح",
		       errorRefreshMyUser: "❌ | حدث خطأ عند تحديث معلومات المستخدم الخاص بك",
		       errorRefreshUserTarget: "❌ | حدث خطأ أثناء تحديث معلومات المستخدم %1"
	       }     },

	onStart: async function ({ args, threadsData, message, event, usersData, getLang }) {
		if (args[0] == "المجموعة") {
			const targetID = args[1] || event.threadID;
			try {
				await threadsData.refreshInfo(targetID);
				return message.reply(targetID == event.threadID ? getLang("refreshMyThreadSuccess") : getLang("refreshThreadTargetSuccess", targetID));
			}
			catch (error) {
				return message.reply(targetID == event.threadID ? getLang("errorRefreshMyThread") : getLang("errorRefreshThreadTarget", targetID));
			}
		}
		else if (args[0] == "العضو") {
			let targetID = event.senderID;
			if (args[1]) {
				if (Object.keys(event.mentions).length)
					targetID = Object.keys(event.mentions)[0];
				else
					targetID = args[1];
			}
			try {
				await usersData.refreshInfo(targetID);
				return message.reply(targetID == event.senderID ? getLang("refreshMyUserSuccess") : getLang("refreshUserTargetSuccess", targetID));
			}
			catch (error) {
				return message.reply(targetID == event.senderID ? getLang("errorRefreshMyUser") : getLang("errorRefreshUserTarget", targetID));
			}
		}
		else
			message.SyntaxError();
	}
};
