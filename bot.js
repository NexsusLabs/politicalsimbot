"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const conversations_1 = require("@grammyjs/conversations");
const index_1 = require("./index");
const types_1 = require("./types");
const bot = new grammy_1.Bot(process.env.BOT_TOKEN, {
    client: {
        baseFetchConfig: {
            agent: index_1.proxyAgent,
            compress: true,
        },
    },
});
// Install needed plugins for grammy
// Install the session plugin.
bot.use((0, grammy_1.session)({ initial: () => ({}) }));
// Install the conversations plugin.
bot.use((0, conversations_1.conversations)());
// Initialize the db
let db = new types_1.DBHandler();
function register(conversation, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        ctx.reply("برای شروع, اسم کشور خودتون رو برای من بفرستید (اسم باید فارسی باشه)");
        let countryname;
        while (true) {
            let cnamectx = yield conversation.waitFor(":text");
            countryname = (_a = cnamectx.message) === null || _a === void 0 ? void 0 : _a.text;
            let isAllowed = true;
            if (countryname === null || countryname === void 0 ? void 0 : countryname.includes("'"))
                isAllowed = false;
            if (countryname === null || countryname === void 0 ? void 0 : countryname.includes('"'))
                isAllowed = false;
            if (countryname === null || countryname === void 0 ? void 0 : countryname.includes("\\"))
                isAllowed = false;
            if (isAllowed) {
                ctx.reply(`نام با موفقیت ثبت شد، پیشنهاد میشه حتما کانال  ${index_1.config.rules} رو بررسی کنید.`);
                break;
            }
            else {
                ctx.reply("اسم ربات فقط میتواند حاوی لغات فارسی باشد.");
            }
        }
        console.log(countryname);
        if (!(yield db.users.findOne({ id: { $eq: ctx.from.id } }))) {
            db.users.insertOne(new types_1.User(ctx.from.id));
        }
        if (!(yield db.countries.findOne({ id: { $eq: ctx.from.id } }))) {
            db.countries.insertOne(new types_1.Country(ctx.from.id, countryname));
        }
    });
}
bot.use((0, conversations_1.createConversation)(register));
bot.hears(/\/start/, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield db.users.findOne({ id: { $eq: ctx.from.id } })) {
        yield ctx.reply(`به ربات ${index_1.config.botname} خوش آمدید!`);
        yield ctx.conversation.enter("register");
    }
    else {
        ctx.reply("Welcome back!");
    }
}));
console.log("Starting up the bot");
bot.start();
