import { config } from "dotenv";

config()

export const environment = {
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_NAME: process.env.DB_NAME,
    MONGO: process.env.MONGO,
    DB_HOST: process.env.DB_HOST,
    PORT: process.env.PORT || 8080
}
