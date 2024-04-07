const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "stop",
  description: "Kullanıcı ekleme işlemini durdurur ve istatistikler gönderir.",
  async run(client, interaction, args) {
    // Check if the process to stop exists in the client
    if (!client.userAddProcess) {
      return interaction.reply({
        content: "Şu anda herhangi bir kullanıcı ekleme işlemi yok.",
        ephemeral: true,
      });
    }

    // Set the stop flag to true
    client.userAddProcess.stopProcess = true;

    // Send final statistics
    const { addedUsers, success, error, alreadyJoined, miktar } = client.userAddProcess;

    const embed = new EmbedBuilder()
      .setTitle("Kullanıcı Ekleme İşlemi Durduruldu")
      .setColor("RED")
      .setDescription(`
        Toplam Eklenen: ${addedUsers}/${miktar}
        Başarılı: ${success}
        Başarısız: ${error}
        Zaten Katılmış: ${alreadyJoined}
      `);

    await interaction.reply({ embeds: [embed] });

    // Clean up the userAddProcess from the client
    delete client.userAddProcess;
  },
};
