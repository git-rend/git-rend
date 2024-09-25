
const a = require('axios');
const tinyurl = require('tinyurl');
module.exports = {
  config: {
    name: "تحسين",
    aliases: ["4k", "جودة"],
    version: "1.0",
    author: "JARiF", //pharouk
    countDown: 15,
    role: 0,
    description: { ar: "Upscale your image."},
    category: "image",
    guide: { ar: "{pn} reply to an image"}
  },

  onStart: async function ({ message, args, event, api }) {
    let imageUrl;

    if (event.type === "message_reply") {
      const replyAttachment = event.messageReply.attachments[0];

      if (["photo", "sticker"].includes(replyAttachment?.type)) {
        imageUrl = replyAttachment.url;
      } else {
        return api.sendMessage(
          { body: "💢| 𝙧𝙚𝙥𝙡𝙮 𝙢𝙪𝙨𝙩 𝙗𝙚 𝙖𝙣 𝙞𝙢𝙖𝙜𝙚." },
          event.threadID
        );
      }
    } else if (args[0]?.match(/(https?:\/\/.*\.(?:png|jpg|jpeg))/g)) {
      imageUrl = args[0];
    } else {
      return api.sendMessage(
        { body: "💢 | 𝙍𝙀𝙋𝙇𝙔 𝙏𝙊 𝘼𝙉 𝙈𝙀𝙎𝙎𝙀𝙉𝙂𝙀." },
        event.threadID
      );
    }

    try {
      const url = await tinyurl.shorten(imageUrl);
      const response = await a.get(`https://www.api.vyturex.com/upscale?imageUrl=${url}`);

      message.reply("🔹𝗪𝗔𝗜𝗧.....");

      const resultUrl = response.data.resultUrl;

      const imageData = await global.utils.getStreamFromURL(resultUrl);

      message.reply({ body: "🔸 | [𝟰𝗞].", attachment: imageData });
    } catch (error) {
      message.reply("💢| Error: " + error.message);
    }
  }
};
