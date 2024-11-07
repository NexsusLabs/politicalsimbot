"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbUri = exports.config = exports.proxyAgent = void 0;
require("dotenv/config");
const socks_proxy_agent_1 = require("socks-proxy-agent");
exports.proxyAgent = process.env.SOCKS_PROXY
    ? new socks_proxy_agent_1.SocksProxyAgent(process.env.SOCKS_PROXY)
    : undefined;
const types_1 = require("./types");
exports.config = new types_1.BotConfig(process.env.RULES_CHANNEL, process.env.BOT_NAME);
exports.dbUri = process.env.DB_URI || "mongodb://localhost:27017";
require("./bot");
