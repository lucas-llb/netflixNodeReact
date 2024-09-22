import { Sequelize } from "sequelize"

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'host.docker.internal',
    port: 5432,
    database: 'netflixProject',
    username: 'postgres',
    password: 'admin',
    define: {
        underscored: true
    },
    logging: console.log
})