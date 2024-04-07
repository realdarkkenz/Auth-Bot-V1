const { 
  ActionRowBuilder, 
  ButtonBuilder, 
  EmbedBuilder, 
  ButtonStyle, 
} = require("discord.js");
const fs = require("fs");
const axios = require("axios");
const configs = require("../configs.js");
const Discord = require("discord.js");

module.exports = {
  name: "verify",
  description: "Veritabanındaki tüm kullanıcıları doğrular",

  run: async (client, interaction, args) => {
    if (!configs.owners.includes(interaction.user.id)) {
      interaction.reply({
        content: `Bu komutu kullanma izniniz bulunmamaktadır.`,
        ephemeral: true,
      });
    } else {
      fs.readFile("./object.json", async function (err, data) {
        if (err) {
          console.log("object.json dosyası okunurken bir hata oluştu");
          return;
        }

        let json = JSON.parse(data);
        let totalUsers = json.length;

        let validUsers = [];
        let invalidCount = 0;
        let checkingCount = 0;

        let embed1 = new EmbedBuilder()
          .setTitle("DURUM PANELİ")
          .setColor("000000")
          .setDescription(
            `\`⌛\`・Kullanıcılar doğrulanıyor \`${checkingCount}\`/\`${totalUsers}\`...`
          );

        let msg = await interaction.channel.send({ embeds: [embed1] });
        interaction.reply({
          content: "Kullanıcı doğrulama işlemi başlatıldı!",
          ephemeral: true,
        });

        for (const user of json) {
          if (user.access_token && user.access_token !== "") {
            await new Promise((resolve) => setTimeout(resolve, 500));
            try {
              const response = await axios.get(
                "https://discord.com/api/v6/users/@me",
                {
                  headers: {
                    Authorization: `Bearer ${user.access_token}`,
                  },
                }
              );
              if (response.status === 200) {
                validUsers.push(user);
              }
            } catch (err) {
              if (err.response.status === 403 || err.response.status === 401) {
                invalidCount++;
              } else if (err.response.status === 401) {
                try {
                  const response = await axios.post(
                    "https://discord.com/api/v6/oauth2/token/refresh",
                    null,
                    {
                      headers: {
                        Authorization: `Bearer ${user.refresh_token}`,
                      },
                    }
                  );
                  if (response.status === 200) {
                    validUsers.push(user);
                  }
                } catch (err) {
                  if (
                    err.response.status === 403 ||
                    err.response.status === 401
                  ) {
                    invalidCount++;
                  }
                }
              }
            }
          }
          checkingCount++;

          if (checkingCount % 10 === 0) {
            // Eğer şu ana kadar doğrulanan kullanıcı sayısı 10'un katı ise, mesajı güncelle
            embed1.setDescription(
              `\`⌛\`・Kullanıcılar doğrulanıyor \`${checkingCount}\`/\`${totalUsers}\`...`
            );
            msg.edit({ embeds: [embed1] });
          }
        }

        let embed2 = new EmbedBuilder().setTitle("DURUM PANELİ").setColor("000000")
          .setDescription(`
    \`🟢\`・Geçerli: \`${validUsers.length}\`
    \`🔴\`・Geçersiz: \`${invalidCount}\`\n
    ・Geçerli kullanıcıları veritabanına eklemek için Evet butonuna basın.
    `);

        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setLabel("Evet")
            .setCustomId("yes")
            .setStyle(ButtonStyle.Success),
          new ButtonBuilder()
            .setLabel("Hayır")
            .setCustomId("no")
            .setStyle(ButtonStyle.Danger)
        );

        await msg.edit({ embeds: [embed2], components: [row] }).then((msg) => {
          let filter_1 = (interaction) => interaction.customId === "yes";
          let collector_1 = msg.createMessageComponentCollector({
            filter: filter_1,
            max: 1,
          });

          let filter_2 = (interaction) => interaction.customId === "no";
          let collector_2 = msg.createMessageComponentCollector({
            filter: filter_2,
            max: 1,
          });

          collector_1.on("collect", async () => {
            fs.writeFile(
              "./validUsers.json",
              JSON.stringify(validUsers, null, 2),
              (err) => {
                if (err) throw err;
                console.log("[BOT] Geçerli kullanıcılar veritabanına aktarıldı!!");
                msg.delete();
                collector_1.stop();
                collector_2.stop();
              }
            );
          });

          collector_2.on("collect", async () => {
            msg.delete();
            collector_1.stop();
            collector_2.stop();
          });
        });
      });
    }
  },
};
