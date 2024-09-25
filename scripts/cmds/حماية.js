const { getStreamFromURL, uploadImgbb } = global.utils;

module.exports = {
	config: {
		name: "حماية",
		version: "1.9",
		author: "NTKhang",
		countDown: 5,
		role: 1,
		description: {
			ar: "تشغيل/إيقاف حماية كل ما يخص المجموعة: اسم وصورة المجموعة، الكنيات، الايموجي، السمة"
		},
		category: "box chat",
		guide: {
			ar: "   {pn} الصورة [on | off]"
				+ "\n   {pn} الاسم [on | off]"
				+ "\n   {pn} الكنيات [on | off]"
				+ "\n   {pn} السمة [on | off]"
				+ "\n   {pn} الايموجي [on | off]"
		}
	},

	langs: {
		ar: {
			antiChangeAvatarOn: "✨ تـم تـشـغـيــل حـمــايـة\nصورة المجموعة بنجاح ✅",
			antiChangeAvatarOff: "✨ حماية صورة المجموعة\nفـي وضـع الإيـقـاف 🤷‍♀️✅",
			missingAvt: "المجموعة بدون صورة 🙎‍♀️🤦‍♀️",
			antiChangeNameOn: "✨ تـم تـشـغـيــل حـمــايـة\nاسـم المجمـوعة بنجـاح ✅",
			antiChangeNameOff: "✨ حمـاية اسـم المجمـوعة\nفـي وضـع الإيـقـاف 🤷‍♀️✅",
			antiChangeNicknameOn: "✨ تـم تـشـغـيــل حـمــايـة\nكنيات الأعضـاء بنجـاح ✅",
			antiChangeNicknameOff: "✨ حمـاية كنيـات الأعضـاء\nفـي وضـع الإيـقـاف 🤷‍♀️✅",
			antiChangeThemeOn: "✨ تم تشغيل حماية\nالسـمــة بـنـجــاح ✅",
			antiChangeThemeOff: "✨ حـمـاية السمـة فـي\nوضـع الإيـقــاف 🤷‍♀️✅",
			antiChangeEmojiOn: "✨ تـم تـشـغـيــل حـمــايـة\nايموجي التفاعل بنجـاح ✅",
			antiChangeEmojiOff: "✨ حماية ايموجي التفاعل\nفـي وضـع الإيـقــاف 🤷‍♀️✅",
			antiChangeAvatarAlreadyOn: "✨ صورة المجموعة في وضـع\nالحمـاية، ولا يمكـن تغييـره ✅",
			antiChangeAvatarAlreadyOnButMissingAvt: "✨ صـورة المـجـمـوعـة فـي\nوضع الحماية، لكن المجموعة\nلـيــس لـهــا صـــورة 🤷‍♀️✅",
			antiChangeNameAlreadyOn: "✨ اسـم المجمـوعة في وضـع\nالحمـاية، ولا يمكـن تغييـره ✅",
			antiChangeNicknameAlreadyOn: "✨ ڪنيات الأعضاء في وضـع\nالحمـاية، ولا يمكـن تغييـره ✅",
			antiChangeThemeAlreadyOn: "✨ السمة في وضع الحماية\nولا يـمـكــن تـغـيـيــرهـا ✅",
			antiChangeEmojiAlreadyOn: "✨ ايموجي التفاعل في وضـع\nالحمـاية، ولا يمكـن تغييـره ✅"
		}
	},

	onStart: async function ({ message, event, args, threadsData, getLang }) {
		if (!["on", "off"].includes(args[1]))
			return message.SyntaxError();
		const { threadID } = event;
		const dataAntiChangeInfoBox = await threadsData.get(threadID, "data.antiChangeInfoBox", {});
		async function checkAndSaveData(key, data) {
			// dataAntiChangeInfoBox[key] = args[1] === "on" ? data : false;
			if (args[1] === "off")
				delete dataAntiChangeInfoBox[key];
			else
				dataAntiChangeInfoBox[key] = data;

			await threadsData.set(threadID, dataAntiChangeInfoBox, "data.antiChangeInfoBox");
			message.reply(getLang(`antiChange${key.slice(0, 1).toUpperCase()}${key.slice(1)}${args[1].slice(0, 1).toUpperCase()}${args[1].slice(1)}`));
		}
		switch (args[0]) {
			case "الصورة": {
				const { imageSrc } = await threadsData.get(threadID);
				if (!imageSrc)
					return message.reply(getLang("missingAvt"));
				const newImageSrc = await uploadImgbb(imageSrc);
				await checkAndSaveData("avatar", newImageSrc.image.url);
				break;
			}
			case "الاسم": {
				const { threadName } = await threadsData.get(threadID);
				await checkAndSaveData("name", threadName);
				break;
			}
			case "الكنيات": {
				const { members } = await threadsData.get(threadID);
				await checkAndSaveData("nickname", members.map(user => ({ [user.userID]: user.nickname })).reduce((a, b) => ({ ...a, ...b }), {}));
				break;
			}
			case "السمة": {
				const { threadThemeID } = await threadsData.get(threadID);
				await checkAndSaveData("theme", threadThemeID);
				break;
			}
			case "الايموجي": {
				const { emoji } = await threadsData.get(threadID);
				await checkAndSaveData("emoji", emoji);
				break;
			}
			default: {
				return message.SyntaxError();
			}
		}
	},

	onEvent: async function ({ message, event, threadsData, role, api, getLang }) {
		const { threadID, logMessageType, logMessageData, author } = event;
		switch (logMessageType) {
			case "log:thread-image": {
				const dataAntiChange = await threadsData.get(threadID, "data.antiChangeInfoBox", {});
				if (!dataAntiChange.avatar && role < 1)
					return;
				return async function () {
					// check if user not is admin or bot then change avatar back
					if (role < 1 && api.getCurrentUserID() !== author) {
						if (dataAntiChange.avatar != "REMOVE") {
							message.reply(getLang("antiChangeAvatarAlreadyOn"));
							api.changeGroupImage(await getStreamFromURL(dataAntiChange.avatar), threadID);
						}
						else {
							message.reply(getLang("antiChangeAvatarAlreadyOnButMissingAvt"));
						}
					}
					// else save new avatar
					else {
						const imageSrc = logMessageData.url;
						if (!imageSrc)
							return await threadsData.set(threadID, "REMOVE", "data.antiChangeInfoBox.avatar");

						const newImageSrc = await uploadImgbb(imageSrc);
						await threadsData.set(threadID, newImageSrc.image.url, "data.antiChangeInfoBox.avatar");
					}
				};
			}
			case "log:thread-name": {
				const dataAntiChange = await threadsData.get(threadID, "data.antiChangeInfoBox", {});
				// const name = await threadsData.get(threadID, "data.antiChangeInfoBox.name");
				// if (name == false)
				if (!dataAntiChange.hasOwnProperty("name"))
					return;
				return async function () {
					if (role < 1 && api.getCurrentUserID() !== author) {
						message.reply(getLang("antiChangeNameAlreadyOn"));
						api.setTitle(dataAntiChange.name, threadID);
					}
					else {
						const threadName = logMessageData.name;
						await threadsData.set(threadID, threadName, "data.antiChangeInfoBox.name");
					}
				};
			}
			case "log:user-nickname": {
				const dataAntiChange = await threadsData.get(threadID, "data.antiChangeInfoBox", {});
				// const nickname = await threadsData.get(threadID, "data.antiChangeInfoBox.nickname");
				// if (nickname == false)
				if (!dataAntiChange.hasOwnProperty("nickname"))
					return;
				return async function () {
					const { nickname, participant_id } = logMessageData;

					if (role < 1 && api.getCurrentUserID() !== author) {
						message.reply(getLang("antiChangeNicknameAlreadyOn"));
						api.changeNickname(dataAntiChange.nickname[participant_id], threadID, participant_id);
					}
					else {
						await threadsData.set(threadID, nickname, `data.antiChangeInfoBox.nickname.${participant_id}`);
					}
				};
			}
			case "log:thread-color": {
				const dataAntiChange = await threadsData.get(threadID, "data.antiChangeInfoBox", {});
				// const themeID = await threadsData.get(threadID, "data.antiChangeInfoBox.theme");
				// if (themeID == false)
				if (!dataAntiChange.hasOwnProperty("theme"))
					return;
				return async function () {
					if (role < 1 && api.getCurrentUserID() !== author) {
						message.reply(getLang("antiChangeThemeAlreadyOn"));
						api.changeThreadColor(dataAntiChange.theme || "196241301102133", threadID); // 196241301102133 is default color
					}
					else {
						const threadThemeID = logMessageData.theme_id;
						await threadsData.set(threadID, threadThemeID, "data.antiChangeInfoBox.theme");
					}
				};
			}
			case "log:thread-icon": {
				const dataAntiChange = await threadsData.get(threadID, "data.antiChangeInfoBox", {});
				// const emoji = await threadsData.get(threadID, "data.antiChangeInfoBox.emoji");
				// if (emoji == false)
				if (!dataAntiChange.hasOwnProperty("emoji"))
					return;
				return async function () {
					if (role < 1 && api.getCurrentUserID() !== author) {
						message.reply(getLang("antiChangeEmojiAlreadyOn"));
						api.changeThreadEmoji(dataAntiChange.emoji, threadID);
					}
					else {
						const threadEmoji = logMessageData.thread_icon;
						await threadsData.set(threadID, threadEmoji, "data.antiChangeInfoBox.emoji");
					}
				};
			}
		}
	}
};
