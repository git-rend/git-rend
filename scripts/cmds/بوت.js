module.exports.config = {
                  name: "بوت",
                  version:"3.5.0", 
                  role: 0,
                  countdown: 5,
                  author: "محمد تانجيرو", 
                  description:{ ar : "اكتشف بنفسك"},
                  category: "تجارب", 
                  guide: { ar : "{pn}"}
                        };

module.exports.onStart = async function ({ api, event }) {

const B = `
██████╗░
██╔══██╗
██████╦╝
██╔══██╗
██████╦╝
╚═════╝░`;
const O = `
░█████╗░
██╔══██╗
██║░░██║
██║░░██║
╚█████╔╝
░╚════╝░`;
const T = `
████████╗
╚══██╔══╝
░░░██║░░░
░░░██║░░░
░░░██║░░░
░░░╚═╝░░░`;
const A = `
░█████╗░
██╔══██╗
███████║
██╔══██║
██║░░██║
╚═╝░░╚═╝`; 
const K = `
██╗░░██╗
██║░██╔╝
█████═╝░
██╔═██╗░
██║░╚██╗
╚═╝░░╚═╝`; 
const N = `
███╗░░██╗
████╗░██║
██╔██╗██║
██║╚████║
██║░╚███║
╚═╝░░╚══╝`;
const E = `
███████╗
██╔════╝
█████╗░░
██╔══╝░░
███████╗
╚══════╝`;
  
  { const Message1 = await api.sendMessage( B, event.threadID/*, event.messageID*/);
   
                     await new Promise((resolve) => setTimeout(resolve, 3000));
                     await api.editMessage( O, Message1.messageID, event.threadID);

                     await new Promise((resolve) => setTimeout(resolve, 3000));
                     await api.editMessage( T, Message1.messageID, event.threadID);

                     await new Promise((resolve) => setTimeout(resolve, 3000));
                     await api.editMessage( B, Message1.messageID, event.threadID);
   
                     await new Promise((resolve) => setTimeout(resolve, 3000));
                     await api.editMessage( O, Message1.messageID, event.threadID);

                     await new Promise((resolve) => setTimeout(resolve, 3000));
                     await api.editMessage( B + "\n" + O + "\n" + T, Message1.messageID, event.threadID)
  };

  { const Message2 = await api.sendMessage( A, event.threadID/*, event.messageID*/);

                     await new Promise((resolve) => setTimeout(resolve, 3000));
                     await api.editMessage( K, Message2.messageID, event.threadID);
                      
                     await new Promise((resolve) => setTimeout(resolve, 3000));
                     await api.editMessage( A, Message2.messageID, event.threadID);

                     await new Promise((resolve) => setTimeout(resolve, 3000));
                     await api.editMessage( N, Message2.messageID, event.threadID);

                     await new Promise((resolve) => setTimeout(resolve, 3000));
                     await api.editMessage( E, Message2.messageID, event.threadID);
  
                     await new Promise((resolve) => setTimeout(resolve, 3000));
                     await api.editMessage( A + "\n" + K + "\n" + A + "\n" + N + "\n" + E, Message2.messageID, event.threadID);

  }                                                      }
