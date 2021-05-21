module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: null,
    DB: "projlogin_db",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 3000,
        idle: 10000
    }
};