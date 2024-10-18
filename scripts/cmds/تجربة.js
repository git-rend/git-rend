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
      response: "🧑‍🤝‍🧑 **Group Members** 🧑‍🤝‍🧑\n\n👦 **Boys**:\n%1\n\n👧 **Girls**:\n%2",
      noMembers: "⚠️ No members found.",
      boysHeader: "👦 **Boys**:\n",
      girlsHeader: "👧 **Girls**:\n"
    }
  },

  onStart: async function ({ message, api, event, getLang }) {
    try {
      // Fetching thread (group) info to get the member list
      const threadInfo = await api.getThreadInfo(event.threadID);
      const allMembers = threadInfo.participantIDs;

      // Initializing arrays to store boy and girl members
      const boys = [];
      const girls = [];

      // Looping through all members and fetching individual details
      for (let memberID of allMembers) {
        const memberInfo = await api.getUserInfo(memberID);
        const member = memberInfo[memberID];

        // Check if gender is defined: 1 = Female, 2 = Male
        if (member.gender === 2) {
          boys.push(`👦 ${member.name} (ID: ${memberID})`);
        } else if (member.gender === 1) {
          girls.push(`👧 ${member.name} (ID: ${memberID})`);
        } else {
          // If gender is not set, log this for debugging
          console.log(`Gender not set for: ${member.name} (ID: ${memberID})`);
        }
      }

      // Prepare the response
      const boysList = boys.length > 0 ? boys.join('\n') : getLang("noMembers");
      const girlsList = girls.length > 0 ? girls.join('\n') : getLang("noMembers");

      const response = `🧑‍🤝‍🧑 **Group Members** 🧑‍🤝‍🧑\n\n👦 **Boys**:\n${boysList}\n\n👧 **Girls**:\n${girlsList}`;
      
      // Replying the result back to the group
      return message.reply(response);

    } catch (error) {
      console.error("Error fetching group members:", error);
      return message.reply(getLang("error"));
    }
  }
};
