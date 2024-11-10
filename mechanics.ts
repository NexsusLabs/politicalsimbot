import { db } from "./bot";

(async () => {
    
})()

let hourlyInterval = setInterval(async () => {
    for await (const { id, resources, production } of db.countries.find()) {
        resources.money += production.income;
        resources.oil += production.oil;
        resources.aluminium += production.aluminium;
        resources.iron += production.iron;
        resources.gold += production.gold;
        resources.titanium += production.titanium;
        resources.uranium += production.uranium;
        db.countries.updateOne({id: {$eq: id}}, {$set: {resources: resources}});
      }
}, 3600000);
