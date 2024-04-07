const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
const Discord = require("discord.js");
const configs = require("../configs.js");

module.exports = {
  name: "join",
  description: "Belirtilen miktarda kullanıcıyı sunucuya ekler!",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "miktar",
      description: "Eklemek istediğiniz kullanıcı sayısını girin",
      type: Discord.ApplicationCommandOptionType.Integer,
      required: true,
    },
  ],

  async run(client, interaction, args) {
    if (!configs.owners.includes(interaction.user.id)) {
      return interaction.reply({
        content: `Bu komutu kullanma izniniz yok.`,
        ephemeral: true,
      });
    }

    let miktar = interaction.options.getInteger("miktar");

    if (miktar <= 0) {
      return interaction.reply("Lütfen geçerli bir miktar girin.");
    }

    fs.readFile("./object.json", async function (err, data) {
      if (err) {
        return interaction.reply({
          content: "object.json dosyası okunurken bir hata oluştu",
          ephemeral: true,
        });
      }

      let json = JSON.parse(data);

      let addedUsers = 0;
      let errorCount = 0;
      let successCount = 0;
      let alreadyJoinedCount = 0;

      let embed = new EmbedBuilder()
        .setTitle("DASHBOARD")
        .setColor("#3498db") // Set a default color (e.g., blue) or update dynamically
        .setDescription(`\`⌛\`・Eklenen \`${addedUsers}\`/\`${miktar}\` Üye Sayısı...`);

      let msg = await interaction.channel.send({ embeds: [embed] });
      interaction.reply({
        content: "Sunucuya kullanıcı eklemek başlatıldı!",
        ephemeral: true,
      });

      // Loop through users and attempt to add them
      for (const user of json) {
        const member = interaction.guild.members.cache.get(user.userID);

        if (member) {
          alreadyJoinedCount++;
        } else {
          await new Promise((resolve) => setTimeout(resolve, 700));

          try {
            await interaction.guild.members.add(user.userID, { accessToken: user.access_token });
            successCount++;
          } catch (err) {
            errorCount++;
          }

          addedUsers++;

          embed.setDescription(`\`⌛\`・Eklenen \`${addedUsers}\`/\`${miktar}\` Üye Sayısı...`);
          await msg.edit({ embeds: [embed] });

          if (addedUsers === miktar) break;
        }
      }

      // Update embed with final statistics
      const finalEmbed = new EmbedBuilder()
        .setTitle("Kullanıcı Ekleme İşlemi Tamamlandı")
        .setColor("#2ecc71") // Set a different color for success (e.g., green)
        .setDescription(`
          Toplam Eklenen: ${addedUsers}/${miktar}
          Başarılı: ${successCount}
          Başarısız: ${errorCount}
          Zaten Katılmış: ${alreadyJoinedCount}
        `);

      await msg.edit({ embeds: [finalEmbed] });
      setTimeout(() => {
        msg.delete();
      }, 10000);
    });
  },
};
