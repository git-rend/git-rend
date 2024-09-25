const axios = require('axios');

module.exports = {
	config: {
		name: "insta",
		aliases: ["ig"],
		version: "1.0",
		author: "JISHAN",
		countDown: 10,
		role: 0,
		description: { ar: "download Instagram video"},
		category: "media",
		guide: { ar: "{pn} <link>"}
	},

	onStart: async function ({ message, args }) {
		// Extract the video link from the command arguments
		const name = args.join(" ");
		if (!name)
			return message.reply(`Please enter video link`);
		else {
			// Construct the API URL with the video link
			const BASE_URL = `https://www.nguyenmanh.name.vn/api/igDL?url=${encodeURIComponent(name)}=&apikey=SyryTUZn`;

			await message.reply("Downloading Please Keep Patience");

			try {
				// Send a GET request to the API URL
				let res = await axios.get(BASE_URL);

				// Extract the video title and URL from the response
				let title = res.data.result.title;
				let img = res.data.result.video[0].url;

				const form = {
					body: `${title}`
				};

				if (img) {
					// Get the video stream and attach it to the response
					form.attachment = await global.utils.getStreamFromURL(img);
				}

				// Reply to the message with the video information
				message.reply(form); 
			} catch (e) {
				// Handle errors and reply with a "Not Found" message
				message.reply(`Invalid link or video is not found`);
				console.log(e);
			}
		}
	}
};
