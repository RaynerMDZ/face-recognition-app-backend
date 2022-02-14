import knex from "knex";
import { localMysqlConfig } from "./localMysqlConfig.js";
import { azureMysqlConfig } from "./azureMysqlConfig.js";

let config = process.env.DATABASE_ENV;

if (config && config === 'azureMysqlConfig') {
    config = azureMysqlConfig;
} else {
    config = localMysqlConfig;
}

export const knexConfig = knex({
    client: 'mysql2',
    connection: config
})
