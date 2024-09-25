module.exports.config = {
                name: "تخيلي",
		version: "1.3",
		author: "محمد تانجيرو",
		countDown: 5,
		role: 0,
		description: { ar: "تتخيلك أي شيء تطلبه وترسم لك صورة مطابقة" },
		category: "pictures",
		guide: { ar: "{pn} [نص]" }
			   };

module.exports.onStart = async ({api, event, args }) => {
const axios = require('axios');
const fs = require('fs-extra');
 let { threadID, messageID } = event;
  let query = args.join(" ");
  if (!query) return api.sendMessage("أكتب الأمر وبعده أكتب وصف الصورة التي تريدها 🙄", threadID, messageID);
let path = __dirname + `/cache/polination.png`;

  const translationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(query)}`);
  const translation = translationResponse.data[0][0][0];
  
  const poli = (await axios.get(`https://image.pollinations.ai/prompt/${translation}`, {
    responseType: "arraybuffer",
  })).data;
  fs.writeFileSync(path, Buffer.from(poli, "utf-8"));
  api.sendMessage({
    body:"تفضل ما طلبت 😊",
    attachment: fs.createReadStream(path) }, threadID, () => fs.unlinkSync(path), messageID);
};
