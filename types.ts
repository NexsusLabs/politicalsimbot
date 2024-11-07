import { Collection, Db, MongoClient } from 'mongodb';
import { dbUri } from '.';
    export class User {
        id: number
        constructor(id: number) {
            this.id = id;
        }
    }
    export class CountryResource {
        money: number;
        oil: number;
        iron: number;
        aluminium: number;
        uranium: number;
        gold: number;
        titanium: number;
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
    
    export type InfantryUnit = {
        type: "infantry"
    }
    export type TankUnit = {
        type: "tank"
    }
    export type Fighter = {
        type: "fighter"
    }

    export type Unit = (InfantryUnit|TankUnit|Fighter) & {
        experience: number;
        techLevel: number;
        health: number;
        div: number;
        country: number;
        count: number;
    }
    export type Division = {
        id: number;
        name: string;
    }

    export class Country {
        id: number;
        name: string;
        cities: number;
        resources: CountryResource;
        constructor(id: number, name: string) {
            this.id = id;
            this.name = name;
            this.cities = 5;
            this.resources = new CountryResource();
        }
    }
export class DBHandler {
    client: MongoClient;
    db: Db;
    users: Collection<User>;
    countries: Collection<Country>;
    divs: Collection<Division>;
    constructor() {
        this.client = new MongoClient(dbUri);
        async () => {
            await this.client.connect();
        }
        this.db = this.client.db('bot');
        this.users = this.db.collection('users');
        this.countries = this.db.collection('countries');
        this.divs = this.db.collection('divs');
    }
    
}
export class BotConfig {
    rules: string;
    botname: string;
    constructor(rules: string|undefined, botname: string|undefined) {
        this.rules = rules || '@test';
        this.botname = botname || 'Political Simulator Bot'
    }
}