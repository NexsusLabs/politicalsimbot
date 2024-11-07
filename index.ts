import 'dotenv/config'
import { SocksProxyAgent } from "socks-proxy-agent";
export const proxyAgent = process.env.SOCKS_PROXY
  ? new SocksProxyAgent(process.env.SOCKS_PROXY)
  : undefined;
import { BotConfig } from './types';
export let config: BotConfig = new BotConfig(process.env.RULES_CHANNEL , process.env.BOT_NAME );
export const dbUri = process.env.DB_URI || "mongodb://localhost:27017";
import './bot'