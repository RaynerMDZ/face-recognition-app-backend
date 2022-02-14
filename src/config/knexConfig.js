import knex from "knex";
import { localMysqlConfig } from "./localMysqlConfig.js";

export const knexConfig = knex({
    client: 'mysql2',
    connection: localMysqlConfig
})
