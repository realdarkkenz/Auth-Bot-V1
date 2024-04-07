const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const configs = require("../configs.js");
const Discord = require("discord.js");

module.exports = {
  name: "mesaj",
  description: "Bir mesaj gönderir.",
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
          .setTitle("DOĞRULAMA")
          .setColor("000000")
          .setDescription(`Embed için bir mesaj`)
          .setImage("Embed için bir banner");

        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setLabel("✅ Doğrula")
            .setStyle(ButtonStyle.Link)
            .setURL(`${configs.authLink}`)
        );

        await interaction.channel.send({ embeds: [embed], components: [row] });
        interaction.reply({ content: "Mesaj gönderildi!", ephemeral: true });
      } catch (error) {
        console.error(error);
        interaction.reply({
          content: "Mesaj gönderilirken bir hata oluştu.",
          ephemeral: true,
        });
      }
    }
  },
};
