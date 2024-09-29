const axios = require("axios");

module.exports = { config: {
		      name: "ضبط-الصورة",
		      aliases: ["ضبط7"],
		      version: "1.3",
		      author: "NTKhang", // تعريب: محمد تانجيرو \\
		      countDown: 5,
		      role: 2,
		      description: { ar: "تغيير صورة البوت"},
		      category: "owner",
		      guide: { ar: " {pn} [رابط الصورة | الرد على صورة] [التسمية التوضيحية | فارغ] [انتهاء الصلاحية بعد (بالثواني)> | فارغ]\n"
				 + " الرد على رسالة تحتوي على صورة ومحتوى: {pn}\n"
				 + " أرسل رسالة تحتوي على صورة ومحتوى: {pn}\n"
				 + " ملاحظة:\n"
				 + " التسمية التوضيحية: سيتم نشر التسمية التوضيحية عند تغيير الصورة\n"
				 + " انتهاء الصلاحية بعد: ضبط وضع الصورة المؤقتة (تنتهي صلاحيتها بعد انتهاء الوقت الذي أدخلته\n"
				 + "مثال:\n"
				 + " {pn} https://example.com/image.jpg: (تغيير صورة الملف الشخصي بدون تسمية توضيحية، وبدون انتهاء الصلاحية)"
				 + " {pn} https://example.com/image.jpg أهلا: (قم بتغيير صورة ملفك الشخصي باستخدام التسمية التوضيحية \"أهلا\" بدون انتهاء صلاحيتها)"
				 + " {pn} https://example.com/image.jpg أهلا 3600: (قم بتغيير صورة ملفك الشخصي مع التسمية التوضيحية \"مرحبًا\"، وقم بتعيينها مؤقتًا لمدة ساعة واحدة)"
		           } },

	langs: { ar: { cannotGetImage: "❌ | حدث خطأ أثناء الاستعلام عن رابط للصورة",
		       invalidImageFormat: "❌ | تنسيق الصورة غير صالح",
		       changedAvatar: "✅ | تم تغيير صورة البوت بنجاح"
	       }     },

	onStart: async function ({ message, event, api, args, getLang }) {
		const imageURL = (args[0] || "").startsWith("http") ? args.shift() : event.attachments[0]?.url || event.messageReply?.attachments[0]?.url;
		const expirationAfter = !isNaN(args[args.length - 1]) ? args.pop() : null;
		const caption = args.join(" ");
		if (!imageURL)
			return message.SyntaxError();
		let response;
		try {
			response = (await axios.get(imageURL, {
				responseType: "stream"
			}));
		}
		catch (err) {
			return message.reply(getLang("cannotGetImage"));
		}
		if (!response.headers["content-type"].includes("image"))
			return message.reply(getLang("invalidImageFormat"));
		response.data.path = "avatar.jpg";

		api.changeAvatar(response.data, caption, expirationAfter ? expirationAfter * 1000 : null, (err) => {
			if (err)
				return message.err(err);
			return message.reply(getLang("changedAvatar"));
		});
	}
};
