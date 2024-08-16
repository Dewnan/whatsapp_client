/*const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const base64 = require('node-base64-image');
const statusSaver = require('./functions/handleStatus.js')
const uploadToChat = require('./functions/uploadToChat.js');
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
    const result = await statusSaver(message);
    await uploadToChat(result.filePath, result.mimetype, message, result.media);
  }
});
 
client.initialize();*/