import 'dotenv/config'
import { SocksProxyAgent } from "socks-proxy-agent";
export const proxyAgent = process.env.SOCKS_PROXY
  ? new SocksProxyAgent(process.env.SOCKS_PROXY)
  : undefined;
export let config = { rules: process.env.RULES_CHANNEL || '@test', botname: process.env.BOT_NAME || 'Political Simulator Bot'};
export const dbUri = process.env.DB_URI || "mongodb://localhost:27017";
import './bot'
import './mechanics';