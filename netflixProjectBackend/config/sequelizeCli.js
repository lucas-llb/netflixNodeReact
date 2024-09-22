module.exports = {
    development : {
        dialect: 'postgres',
        host: 'host.docker.internal',
        port: '5432',
        database: 'netflixProject',
        username: 'postgres',
        password: 'admin',
    },
    docker: {
        dialect: 'postgres',
        host: 'host.docker.internal',
        port: '5432',
        database: 'netflixProject',
        username: 'postgres',
        password: 'admin',
    }
}