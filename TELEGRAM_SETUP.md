# Telegram Bot Setup for Contact Form

This document explains how to set up a Telegram bot for receiving contact form messages.

## Prerequisites

1. A Telegram account
2. Access to [@BotFather](https://t.me/botfather) on Telegram

## Step 1: Create a Telegram Bot

1. Open Telegram and search for [@BotFather](https://t.me/botfather)
2. Send the command `/newbot`
3. Follow the instructions to name your bot
4. BotFather will provide you with a **Bot Token** (looks like: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)
5. Save this token - you'll need it for the `TELEGRAM_BOT_TOKEN` environment variable

## Step 2: Get Your Chat ID

There are several ways to get your Chat ID:

### Method 1: Using @userinfobot

1. Search for [@userinfobot](https://t.me/userinfobot) on Telegram
2. Start a conversation with the bot
3. The bot will reply with your Chat ID (a number like `123456789`)
4. Save this number - you'll need it for the `TELEGRAM_CHAT_ID` environment variable

### Method 2: Using @getidsbot

1. Search for [@getidsbot](https://t.me/getidsbot) on Telegram
2. Start a conversation with the bot
3. The bot will show your Chat ID

### Method 3: Create a Group Chat

1. Create a new group in Telegram
2. Add [@userinfobot](https://t.me/userinfobot) to the group
3. The bot will show the group Chat ID (usually a negative number like `-123456789`)
4. Add your bot to the group
5. Make the bot an administrator (optional, but recommended)

## Step 3: Configure Environment Variables

Create a `.env.local` file in the root of your project (if it doesn't exist) and add:

```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

**Important:**
- Never commit `.env.local` to version control
- The `.env.local` file is already in `.gitignore`
- For production, set these variables in your hosting platform's environment settings

## Step 4: Test the Setup

1. Start your development server: `npm run dev`
2. Navigate to the contact page
3. Fill out and submit the contact form
4. Check your Telegram - you should receive the message!

## Troubleshooting

### Bot doesn't receive messages

- Verify the bot token is correct
- Verify the chat ID is correct
- Make sure the bot is added to the group (if using a group chat)
- Check that the bot hasn't been blocked

### Error: "Missing Telegram credentials"

- Verify `.env.local` file exists in the project root
- Verify environment variables are named correctly: `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`
- Restart your development server after adding environment variables

### Error: "Failed to send message"

- Check that the bot token is valid
- Check that the chat ID is correct
- Verify the bot has permission to send messages to the chat

## Security Notes

- Keep your bot token secret - never share it publicly
- Use environment variables, never hardcode credentials
- Consider using different bots for development and production
- Regularly rotate your bot token if compromised

## Production Deployment

When deploying to production:

1. Set environment variables in your hosting platform:
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Environment Variables
   - Other platforms: Check their documentation

2. Use the same variable names:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`

3. Restart your application after setting variables

