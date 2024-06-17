import { PrismaClient } from "@prisma/client";
import TelegramBot from "node-telegram-bot-api";


class MessageController {

    private bot: TelegramBot;
    private prisma: PrismaClient;

    constructor(bot: TelegramBot, prisma: PrismaClient){
        this.bot = bot;
        this.prisma = prisma;
    }

    controlMessage(ResponseTime: boolean, chatId: string, msg: TelegramBot.Message){
        console.log("ResponseTime -> "+ ResponseTime);
        console.log("entrou")
        const bot = this.bot;
        const prisma = this.prisma;
        let messageSent = false;


        if (ResponseTime == true) {
            bot.sendMessage(chatId, 'https://uvv.br');
                  
          } else {
        
            if (!messageSent) {
              bot.sendMessage(chatId, 'O funcionamento da empresa (9h às 18h).');
              messageSent = true;
            }
                
            if (msg.text !== undefined) {
        
              const text: string = msg.text.toLowerCase();;
              // Verifica se a mensagem contém um email
                if (!text.includes('@') && text != 'sim') { 
                  bot.sendMessage(chatId, 'Por favor, digite o seu email:');
                } else if(text != 'sim') {
                  // confirmação do email
                  const email = text;
                  console.log(email);
                  bot.sendMessage(chatId, `Você escreveu o email ${email}. Você confirma que está correto? (sim/não)`);
                    
                  bot.once('message', async (msg) => {
                    const confirmation = msg.text ? msg.text.toLowerCase() : '';
            
                    if (confirmation === 'sim') {
                      // Salvar o email no banco de dados
                      // const user = await prisma.user.upsert({
                      //   where: {
                      //     id_telegram: chatId,
                      //   },
                      //   update: {
                      //     name: `${msg.chat.first_name} ${msg.chat.last_name}`,
                      //     email: email,
                      //   },
                      //   create: {
                      //     name: `${msg.chat.first_name} ${msg.chat.last_name}`,
                      //     id_telegram: chatId,
                      //     email: email,
                      //     password: password
                      //   },
                      // });
            
                      bot.sendMessage(chatId, 'Email salvo.');
                    } else {
                      bot.sendMessage(chatId, 'Escreve o email novamente.');
                    }
                  });
                }   
            } 
          }
       
    }
}

export default MessageController;