const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const base64 = require('node-base64-image');

var fs = require('fs');

const client = new Client({
	puppeteer: {
		args: ['--no-sandbox'],
	},
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small:true, scale:1 });
});

client.on('authenticated', () => {
    console.log('AUTHENTICATED');
});

client.on('auth_failure', msg => {
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async (message) => {
	if (message.body == "!ping"){
        await message.reply("pong");
    }
});

client.on('message_create', async (message) => {
  if (message.body === '!save' && message.fromMe && message.hasQuotedMsg) {
    try {
        const quotedMessage = await message.getQuotedMessage();
        if (quotedMessage.hasMedia) {
          const content = await quotedMessage.downloadMedia();
          console.log('download');
          const media = new MessageMedia(content.mimetype, content.data);
          await client.sendMessage(message.from, media);
    } else {
      await message.reply('The quoted message does not contain media.');
    }
  } catch (error) {
    console.error('Error saving media:', error);
    await message.reply('An error occurred while saving the media.');
  }
    }
  }
);
 
client.initialize();