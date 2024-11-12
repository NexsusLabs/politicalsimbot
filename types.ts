import { Collection, Db, MongoClient } from "mongodb";
import { dbUri } from ".";
export class User {
  id: number;
  lastAction: string | undefined;
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
  constructor(
    money?: number,
    oil?: number,
    iron?: number,
    aluminium?: number,
    uranium?: number,
    gold?: number,
    titanium?: number
  ) {
    this.money = money || 10000;
    this.oil = oil || 15;
    this.iron = iron || 15;
    this.aluminium = aluminium || 10;
    this.uranium = uranium || 0;
    this.gold = gold || 5;
    this.titanium = titanium || 3;
  }
}

export type InfantryUnit = {
  type: "infantry"
};
export type TankUnit = {
  type: "tank"
};
export type Fighter = {
  type: "fighter"
};

export type Unit = (InfantryUnit | TankUnit | Fighter) & {
  experience: number;
  techLevel: number;
  health: number;
  div: number;
  country: number;
  count: number;
};
export type Division = {
  id: number;
  name: string;
};

export class Country {
  id: number;
  name: string;
  cities: number;
  isWar: boolean;
  warId: number | undefined;
  resources: CountryResource;
  production: CountryProduction;
  researchs: CountryTech;
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.cities = 5;
    this.isWar = false;
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
  constructor(
    income?: number,
    oil?: number,
    iron?: number,
    aluminium?: number,
    uranium?: number,
    gold?: number,
    titanium?: number
  ) {
    this.income = income || 1000;
    this.oil = oil || 10;
    this.iron = iron || 10;
    this.aluminium = aluminium || 6;
    this.uranium = uranium || 0;
    this.gold = gold || 3;
    this.titanium = titanium || 2;
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
    };
    this.db = this.client.db("bot");
    this.users = this.db.collection("users");
    this.countries = this.db.collection("countries");
    this.divs = this.db.collection("divs");
  }
}

let tech = {
  army: [
    {
      name: "weapons1",
      requirement: "none",
      bonus: 1,
    },
    {
      name: "weapons2",
      requirement: "weapons1",
      bonus: 2,
    },
  ],
  political: [],
};
