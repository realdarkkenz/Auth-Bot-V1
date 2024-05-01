# Coded By: DARK KENZ

# Oauth2 Discord Bot 🛡️

The OAuth2 Discord Bot is an application developed in Node.js that offers functionality related to OAuth2 authentication and interaction with Discord servers. It allows users to authenticate their Discord accounts on a specific server and provides user management and point verification capabilities.

![Discord Bot https://i.imgur.com/QjFHH27.png)

## Main Features 🚀

- **OAuth2 authentication:** the bot facilitates the Oauth2 authentication process for users by allowing them to authenticate their Discord accounts to a specific server.
- **User verification: * * provides functionality to verify authenticated users, store their information, and assign roles or privileges based on their authentication.
- **Automatic item redemption: * * the bot allows you to automatically redeem items for authenticated users, simplifying the interaction process during live broadcasts.

## Prerequisites 📋

Before using OAuth2 Discord Bot, make sure you have installed:

- Node.js
- npm (Node Package Manager)
- Discord account
- Discord server to host the bot
- App Settings and bot permissions in Discord Developer Portal

## Installation and use 🛠️

1. Install project dependencies:

"'sh
npm install
```

2. Configure the file "' configs.js` ' with your credentials and Discord server specific information.

3. Run the bot:

"'sh
node index.js
```

5. Follow the instructions in the console to set up and use the OAuth2 Discord Bot.

## Detailed Operation ⚙️

The bot consists of a series of commands and interactions defined in the `commands` and `events`files. Here is an overview of the main commands:

- ``/join"': adds The Chosen amount of users to the server.
- ``/help"': displays a list of commands available to users.
- ``/links"': provides useful links related to bot and OAuth2 authentication.
- ``/message"': send a formatted message with a check button to users.
- "'/ping"': shows the ping of the bot.
- ``/users"': displays how many users are stored in the bot database.
- ``/verify"': verifies all users stored in the database, allowing the addition of valid users.

## Custom Setting ⚙️

Before running the bot, you need to configure some parameters in the "' configs file.js``:

- "'token"': bot authentication Token on Discord.
- "'client_id``, ``client_secret``, "'redirect_uri"': credentials for OAuth2 authentication.
- "'idserver``, "'idrole"': Discord server and post IDs to be assigned to verified users.
- "'webhook``,`` webhookBackup``: URLs of the webhooks to send user information and backup the file "' object.json`'.

## License 📄

This project is licensed under the MIT License. See the LICENSE file for more details.
