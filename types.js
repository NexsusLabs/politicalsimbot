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
exports.BotConfig = exports.DBHandler = exports.Country = exports.CountryResource = exports.User = void 0;
const mongodb_1 = require("mongodb");
const _1 = require(".");
class User {
    constructor(id) {
        this.id = id;
    }
}
exports.User = User;
class CountryResource {
    constructor() {
        this.money = 0;
        this.oil = 0;
        this.iron = 0;
        this.aluminium = 0;
        this.uranium = 0;
        this.gold = 0;
        this.titanium = 0;
    }
}
exports.CountryResource = CountryResource;
class Country {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.cities = 5;
        this.resources = new CountryResource();
    }
}
exports.Country = Country;
class DBHandler {
    constructor() {
        this.client = new mongodb_1.MongoClient(_1.dbUri);
        () => __awaiter(this, void 0, void 0, function* () {
            yield this.client.connect();
        });
        this.db = this.client.db('bot');
        this.users = this.db.collection('users');
        this.countries = this.db.collection('countries');
        this.divs = this.db.collection('divs');
    }
}
exports.DBHandler = DBHandler;
class BotConfig {
    constructor(rules, botname) {
        this.rules = rules || '@test';
        this.botname = botname || 'Political Simulator Bot';
    }
}
exports.BotConfig = BotConfig;
