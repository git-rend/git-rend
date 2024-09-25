module.exports.config = {
                name: "اكاني",
              	version: "1.3",
	        author: "محمد تانجيرو",
              	countDown: 3,
              	role: 0,
              	description: { ar: "إرسال صور أكاني من أنمي يامادا كن" },
	        category: "pictures",
	        guide: { ar: "{pn}" }
                         };

const fs = require('fs');
const axios = require('axios');

module.exports.onStart = async function ({ api, event, args }) {
    const pictures = [
      { image: "https://i.imgur.com/mK2HpYC.jpeg" },
      { image: "https://i.imgur.com/nxQcrJ1.jpeg" },
      { image: "https://i.imgur.com/RQyWJo4.jpeg" },
      { image: "https://i.imgur.com/jZsDRHY.jpeg" },
      { image: "https://i.imgur.com/B2XKghY.jpeg" },
      { image: "https://i.imgur.com/ewsX0tL.jpeg" },
      { image: "https://i.imgur.com/EBodMQO.jpeg" },
      { image: "https://i.imgur.com/HhV3uFy.jpeg" },
      { image: "https://i.imgur.com/VwLDfBh.jpeg" },
      { image: "https://i.imgur.com/tXUmKjT.jpeg" },
      { image: "https://i.imgur.com/AOqZ6I6.jpeg" },
      { image: "https://i.imgur.com/k2JVQLA.jpeg" },
      { image: "https://i.imgur.com/0jQ0rSl.jpeg" },
      { image: "https://i.imgur.com/qf396bJ.jpeg" },
      { image: "https://i.imgur.com/SnnJq1m.jpeg" },
      { image: "https://i.imgur.com/oJ5SANY.jpeg" },
      { image: "https://i.imgur.com/TYrL3he.jpeg" },
      { image: "https://i.imgur.com/ybesG9A.jpeg" },
      { image: "https://i.imgur.com/jj4oVg0.jpeg" },
      { image: "https://i.imgur.com/NTpOuni.jpeg" },
      { image: "https://i.imgur.com/zMlHHbt.jpeg" },
      { image: "https://i.imgur.com/VSylvCc.jpeg" },
      { image: "https://i.imgur.com/WzLzeQx.jpeg" },
      { image: "https://i.imgur.com/XiDqFWK.jpeg" },
      { image: "https://i.imgur.com/DRHC7P5.jpeg" },
    ];

    const randomimage = pictures[Math.floor(Math.random() * pictures.length)];
    const image = await axios.get(randomimage.image, { responseType: "arraybuffer" });
    fs.writeFileSync(__dirname + "/cache/akane.jpg", Buffer.from(image.data, "binary"));

    const attachment = [fs.createReadStream(__dirname + "/cache/akane.jpg")];
    const message = `🌹 صور أكاني كينوشيتا 🌹\n   ♡_من أنمي يامادا كن_♡\n  ༺ا- عدد الصور : ${pictures.length} -ا༻`;
    api.sendMessage({ body: message, attachment }, event.threadID, event.messageID);
};
