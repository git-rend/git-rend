module.exports = {
  config: {
    name: "تجربة",
    role: 2,
    version: "2.0",
    author: "TawsiN",
    description: { ar: "Display the names or IDs of girls and boys in the group"},
    category: " ",
    guide: { ar: "/getMembers"},
    countdown: 5,
  },

  langs: {
    ar: {
      response: "🧑‍🤝‍🧑 **Group Members** 🧑‍🤝‍🧑\n\n👦 **Boys**:\n{boys}\n\n👧 **Girls**:\n{girls}",
      noMembers: "⚠️ No members found.",
      boysHeader: "👦 **Boys**:\n",
      girlsHeader: "👧 **Girls**:\n"
    }
  },

  onStart: async function ({ message, api, event, getLang }) {
    const threadInfo = await api.getThreadInfo(event.threadID);
    const allMembers = threadInfo.userInfo;

    // Define arrays to hold girls and boys
    const girls = [];
    const boys = [];

    // Process members and categorize based on name or ID pattern
    for (let member of allMembers) {
      const name = member.name.toLowerCase();

      // Custom logic to categorize boys and girls based on name (can be improved)
      if (name.includes('a') || name.includes('e')) {
        girls.push(`👧 ${member.name} (ID: ${member.id})`);
      } else {
        boys.push(`👦 ${member.name} (ID: ${member.id})`);
      }
    }

    // Format the output for boys and girls
    const boysList = boys.length > 0 ? boys.join('\n') : getLang("noMembers");
    const girlsList = girls.length > 0 ? girls.join('\n') : getLang("noMembers");

    // Final response with emojis and formatted nicely
    const response = getLang("response", { boys: boysList, girls: girlsList });
    
    // Send the formatted message
    return message.reply(response);
  }
};
