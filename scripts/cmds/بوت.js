module.exports.config = {
                  name: "بوت",
                  version:"3.5.0", 
                  role: 0,
                  countdown: 5,
                  author: "محمد تانجيرو", 
                  description:{ ar : ""},
                  category: "تجارب", 
                  guide: { ar : "{pn}"}
                        };
module.exports.onStart = async function ({ api, event }) {
  const first = `██████╗ 
██╔══██╗
██████╔╝
██╔══██╗
██████╔╝
╚═════╝`;
  const second = `██████╗ 
██╔═══██╗
██║        ██║
██║        ██║
╚██████╔╝
 ╚═════╝`;
  const third = `████████╗
╚══██╔══╝
        ██║   
        ██║   
        ██║   
        ╚═╝`;
  { const Message = await api.sendMessage(first, event.threadID/*, event.messageID*/);
   
                    await new Promise((resolve) => setTimeout(resolve, 5000));
                    await api.editMessage( second, Message.messageID, event.threadID);

                    await new Promise((resolve) => setTimeout(resolve, 5000));
                    await api.editMessage( third, Message.messageID, event.threadID);
  }}
