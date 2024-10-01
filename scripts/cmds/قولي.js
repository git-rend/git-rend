module.exports.config = {
	                name: "قولي",
                  aliases: ["انطقي"],
	                version: "1.0.1",
	                author: "محمد تانجيرو",
                  countDown: 5,
                  role: 0,
                  description: { ar: "تخليها تتكلم بأي شيء تكتبه"},
                  category: "Entertainment",
                  guide: { ar: "{pn} [النص]"}
                         };

module.exports.onStart = async function({ api, event, args }) {
	try {
		const { createReadStream, unlinkSync } = require ("fs-extra");
		const { resolve } = require ("path");
		var content = (event.type == "message_reply") ? event.messageReply.body : args.join(" ");
		var languageToSay = (["ru","en","vi","ja","ar","fr"].some(item => content.indexOf(item) == 0)) ? content.slice(0, content.indexOf(" ")) : global.config.language;
		var msg = (languageToSay != global.config.language) ? content.slice(3, content.length) : content;
		const path = resolve(__dirname, 'cache', `${event.threadID}_${event.senderID}.mp3`);
		await global.utils.downloadFile(`https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(msg)}&tl=ar&client=tw-ob`, path);
		return api.sendMessage({ attachment: createReadStream(path)}, event.threadID, () => unlinkSync(path));
	} catch (e) { return console.log(e) };
}
