import TelegramBot from "node-telegram-bot-api";

import { config } from "dotenv";

import { PrismaClient } from '@prisma/client';

import TimeController from "./controllers/TimeController";
import MessageController from "./controllers/MessageController";

config();

const prisma = new PrismaClient();

const bot = new TelegramBot(process.env.Bot_Token, { polling: true });

const menssageController = new MessageController(bot, prisma);

const timeController = new TimeController(new Date('2024-04-30T09:00:00'), new Date('2024-04-30T16:00:00'));

bot.onText(/\/echo (.+)/, (msg, match) => {
  
  const chatId = msg.chat.id;
  if(match){
    const resp = match[1];
    bot.sendMessage(chatId, resp);
  }else{
    bot.sendMessage(chatId, "Ocorreu um erro na comunicação");
  }

});


bot.on('message', async (msg) => {
 
  const chatId = msg.chat.id.toString();
 
  // Suponha que você tenha uma data de bot (botDate) que deseja verificar
  const botDate = new Date(); // Use a data desejada do bot

  // Verificar se a data do bot está dentro do intervalo especificado
  const TimeResponse = timeController.controlTime(botDate);
  
  menssageController.controlMessage(TimeResponse, chatId, msg);

});