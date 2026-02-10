const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Caminho do banco
const DB = path.join(__dirname, "users.json");

// Ler usuários
function getUsers() {
    if (!fs.existsSync(DB)) {
        fs.writeFileSync(DB, "[]");
    }

    return JSON.parse(fs.readFileSync(DB));
}

// Salvar usuários
function saveUsers(users) {
    fs.writeFileSync(DB, JSON.stringify(users, null, 2));
}

// Servir frontend
app.use(express.static(path.join(__dirname, "../public")));

/* ================= CADASTRO ================= */
app.post("/register", (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ error: "Preencha todos os campos" });
    }

    const users = getUsers();

    const exists = users.find(u => u.email === email);

    if (exists) {
        return res.json({ error: "Email já cadastrado" });
    }

    users.push({ email, password });

    saveUsers(users);

    res.json({ success: true });
});


/* ================= LOGIN ================= */
app.post("/login", (req, res) => {

    const { email, password } = req.body;

    const users = getUsers();

    const user = users.find(
        u => u.email === email && u.password === password
    );

    if (!user) {
        return res.json({
            error: "Email ou senha inválidos"
        });
    }

    res.json({ success: true });
});


app.listen(PORT, () => {
    console.log("Servidor rodando: http://localhost:3000");
});
