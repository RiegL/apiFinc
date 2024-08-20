import * as dotenv from "dotenv";

dotenv.config();

export default {
  development: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST, 
      port: 3306,
      user: process.env.DB_USER ,//"leo"
      password: process.env.DB_PASS ,  // "hasarbrasil",
      database: process.env.DB_NAME , //"db",
    },
  },
};
