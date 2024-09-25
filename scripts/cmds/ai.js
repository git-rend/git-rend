let imageIndex = 0; // Variable pour suivre l'index actuel des images

module.exports = {
    config: {
        name: "ai",
        version: "1.0",
        author: "𝐂𝐈𝐃×͜×𝐊𝐀𝐆𝐄𝐍𝐎", // this cmd will expire if credits change
        countDown: 5,
        role: 0,
        description: { ar: "الذكاء"},
        category: "reply",
        guide: { ar: "{pn}"}
    },
    onStart: async function() {},
    onChat: async function({ event, message }) {
        // Liste des URLs d'images
        const links = [
            "https://i.ibb.co/PQQdjc8/image.jpg",
            "https://i.ibb.co/vqcfHB5/image.jpg",
            "https://i.ibb.co/j8cYhF4/image.jpg",
            "https://i.ibb.co/fxJn3F8/image.jpg",
            "https://i.ibb.co/xXVZjr1/image.jpg",
            "https://i.ibb.co/0GCdjHr/image.jpg",
            "https://i.ibb.co/RYyPpYW/image.jpg",
            "https://i.ibb.co/CBLq4LR/image.jpg"
        ];

        // Sélectionne l'image en fonction de l'ordre (imageIndex)
        const img = links[imageIndex];

        // Met à jour l'index pour la prochaine image
        imageIndex = (imageIndex + 1) % links.length; // Revient à 0 après la dernière image

        if (event.body && event.body.toLowerCase() === "ai") {
            return message.send({
                body: "🙆𝐚𝐛𝐫𝐮𝐭𝐢𝐬😑🚶 𝐨𝐧 𝐝𝐢𝐭 Gpt4....𝐩𝐚𝐬 ai❌",
                attachment: await global.utils.getStreamFromURL(img)
            });
        }
    }
};
