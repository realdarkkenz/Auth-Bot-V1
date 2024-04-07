const { EmbedBuilder } = require("discord.js");
const configs = require("../configs.js");
const Discord = require("discord.js");

module.exports = {
  name: "help",
  description: "Çalışan Komutları Gösterir.",
  type: 1,

  run: async (client, interaction, args) => {
    if (!configs.owners.includes(interaction.user.id)) {
      interaction.reply({
        content: `Bu Komutu Kullanma Yetkiniz Yok.`,
        ephemeral: true,
      });
    } else {
      let embed = new EmbedBuilder()

        .setTitle("Oauth2 Dashboard")
        .setColor("000000")
        .setDescription(
          `● **Oauth2: **\`join\`, \`Users\`, \`Links\`, \`mensagem\``
        );

      interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};
