import knex from "knex";
import { mysqlConfig } from "./mysqlConfig.js";

export const knexConfig = knex({
    client: 'mysql2',
    connection: mysqlConfig
})
