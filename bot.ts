import { Bot, InlineKeyboard, session, Context } from "grammy";
import {
  type Conversation,
  type ConversationFlavor,
  conversations,
  createConversation,
} from "@grammyjs/conversations";
import { Menu } from "@grammyjs/menu";
import { proxyAgent, config } from "./index";
import { Country, DBHandler, User } from "./types";
const bot = new Bot<Context & ConversationFlavor>(process.env.BOT_TOKEN!, {
  client: {
    baseFetchConfig: {
      agent: proxyAgent,
      compress: true,
    },
  },
});
// Install needed plugins for grammy
// Install the session plugin.
bot.use(session({ initial: () => ({}) }));

// Install the conversations plugin.
bot.use(conversations());
// Initialize the db
export let db: DBHandler = new DBHandler();

type RegisterContext = Context & ConversationFlavor;
type RegisterConversation = Conversation<RegisterContext>;

async function register(
  conversation: RegisterConversation,
  ctx: RegisterContext
) {
  ctx.reply(
    "برای شروع, اسم کشور خودتون رو برای من بفرستید (اسم باید فارسی باشه)"
  );
  let countryname;
  while (true) {
    let cnamectx = await conversation.waitFor(":text");
    countryname = cnamectx.message?.text;
    let isAllowed = true;
    if (countryname?.includes("'")) isAllowed = false;
    if (countryname?.includes('"')) isAllowed = false;
    if (countryname?.includes("\\")) isAllowed = false;
    if (isAllowed) {
        ctx.reply(`نام با موفقیت ثبت شد، پیشنهاد میشه حتما کانال  ${config.rules} رو بررسی کنید.`);
        break;
    }
    else {
      ctx.reply("اسم ربات فقط میتواند حاوی لغات فارسی باشد.");
    }
  }
  console.log(countryname);
  if (!await db.users.findOne({ id: { $eq: ctx.from!.id } })) {
    db.users.insertOne(new User(ctx.from!.id));
  }
  if (!await db.countries.findOne({id: {$eq : ctx.from!.id}})) {
    db.countries.insertOne(new Country(ctx.from!.id, countryname!));
  }
}
bot.use(createConversation(register));
bot.hears(/\/start/, async (ctx) => {
  if (await db.users.findOne({ id: { $eq: ctx.from!.id } })) {
    await ctx.reply(
      `به ربات ${config.botname} خوش آمدید!`
    );
    await ctx.conversation.enter("register");
  } else {
    ctx.reply("Welcome back!");
  }
});
console.log("Starting up the bot");
bot.start();
