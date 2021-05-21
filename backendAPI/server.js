const express = require("express");
const cors = require("cors");
const { urlencoded } = require("express");

const app = express();

let corsOptions = {
    // Origem da requisição
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const db = require("./app/models");
const Role = db.role;

db.sequelize.sync({force: true}).then(() => {
    console.log("Dropando e syncando o banco")
    initial();
});

function initial () {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "moderator" 
    });

    Role.create({
        id: 3,
        name: "admin" 
    });
};

//routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);


// rota simples 
app.get("/", (req, res) => {
    res.json({message: "Hello World"})
});

// Porta onde o Backend vai rodar
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Servidor rodando na: ${PORT}.`)
});
