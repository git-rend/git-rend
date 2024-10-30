module.exports = {
   config: {
      name: "106",
      aliases: [""],
      author: "TawsiN",
      version: "2.4",
      countDowns: 5,
      role: 0,
      description: { ar: "Find the gay person in the group!"},
      category: "𝗙𝗨𝗡",
      guide: { ar: "{p}{n} - Find the gay person in the group!"},
	},
   onStart: async function ({ api, event, message }) {
	const excludedUserId = "100080195076753"; // User ID to exclude
	try {
	const groupId = event.threadID;
	const groupInfo = await api.getThreadInfo(groupId);
	const members = groupInfo.participantIDs.filter(userId => !groupInfo.nicknames[userId]);

	// Filter out the excluded user from the selection
	const eligibleMembers = members.filter(userId => userId !== excludedUserId);
	if (eligibleMembers.length === 0) { return message.reply("😔 No eligible users found in this group.")}

	// Pick a random member from the eligible members
	const randomUserId = eligibleMembers[Math.floor(Math.random() * eligibleMembers.length)];
	const userInfo = await api.getUserInfo([randomUserId]);
	const selectedUserName = userInfo[randomUserId].name;

	// Loading message
	const loadingMessage = await api.sendMessage("🔍 Locating the gay user in this group... Please wait 🤡", groupId);

	// Send the result
	const percent = Math.floor (Math.random () * 101);
	const resultMessage = { body: `🌹 هذا الشخص ألوان 106:\n${selectedUserName}\nنسبة التحول: ${percent}`,
				attachment: await global.utils.getStreamFromURL("https://drive.google.com/uc?export=download&id=1PfE5AOA_bht94pdAH5o26_d3K346zxjx")};
	await message.reply(resultMessage);

	// Remove loading message
	await api.unsendMessage(loadingMessage.messageID);
	} catch (error) { console.error("Error in findgay command:", error);
			  message.reply("⚠️ An error occurred while finding the gay person. Please try again later.");
		}
	},
};
