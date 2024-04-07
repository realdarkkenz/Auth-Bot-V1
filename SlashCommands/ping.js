const { EmbedBuilder } = require("discord.js");
const configs = require("../configs.js");
const Discord = require("discord.js");

module.exports = {
  name: "ping",
  description: "Botun pingini görüntüler.",
  type: 1,

  run: async (client, interaction, args) => {
    if (!configs.owners.includes(interaction.user.id)) {
      interaction.reply({
        content: `Bu komutu kullanma izniniz bulunmamaktadır.`,
        ephemeral: true,
      });
    } else {
      try {
        let embed = new EmbedBuilder()
          .setColor("000000")
          .setDescription(`\`📡\` Pingim \`${client.ws.ping}\` ms.`);

        interaction.reply({ embeds: [embed], ephemeral: true });
      } catch (error) {
        console.error(error);
        interaction.reply({
          content: "Ping komutu çalıştırılırken bir hata oluştu.",
          ephemeral: true,
        });
      }
    }
  },
};
