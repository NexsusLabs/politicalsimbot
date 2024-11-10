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
        production: CountryProduction;
        researchs: CountryTech;
        constructor(id: number, name: string) {
            this.id = id;
            this.name = name;
            this.cities = 5;
            this.resources = new CountryResource();
            this.production = new CountryProduction();
            this.researchs = new CountryTech();
        }
    }
    export class CountryProduction {
        income: number;
        oil: number;
        iron: number;
        aluminium: number;
        uranium: number;
        gold: number;
        titanium: number;
        constructor() {
            this.income = 1000;
            this.oil = 5;
            this.iron = 5;
            this.aluminium = 3;
            this.uranium = 0;
            this.gold = 1;
            this.titanium = 2;
        }
    }
    export class CountryTech {
        completedArmyTech: string[];
        completedPolitical: string[];
        constructor() {
            this.completedArmyTech = [];
            this.completedPolitical = [];
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

let tech = {
    army: [
        {
            name: 'weapons1',
            requirement: 'none',
            bonus: 1,
        }, 
        {
            name: 'weapons2',
            requirement: 'weapons1',
            bonus: 2,
        }
    ],
    political: [

    ]
}