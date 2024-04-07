const fs = require("fs"); // fs modülünün import edilmesi
const { EmbedBuilder } = require("discord.js");
const configs = require("../configs.js");
const Discord = require("discord.js");

module.exports = {
  name: "kullanıcılar",
  description: "Kullanıcıları Gösterir.",
  type: 1,

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

        let users = JSON.parse(data); // JSON verisini oku ve kullanıcılar değişkenine ata
        let embed = new EmbedBuilder()
          .setTitle("OAUTH PANELİ")
          .setColor("000000")
          .setDescription(
            `● Botumuzda ${
              users.length > 1
                ? `\`${users.length}\` kullanıcı`
                : `\`${users.length}\` kullanıcı bulunmaktadır`
            }\n● OAuth2 bağlantı bağlantınızı kontrol etmek için \`links\` komutunu kullanabilirsiniz.`
          );
        interaction.reply({ embeds: [embed], ephemeral: true });
      });
    }
  },
};
