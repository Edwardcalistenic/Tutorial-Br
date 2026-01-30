const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

const users = [
    { username: 'eduardo', password: '123456' },
    { username: 'admin', password: 'admin' }
];


app.use(express.json());

app.use(express.static(path.join(__dirname)));


app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        res.json({ success: true });
    } else {
        res.json({ success: false, message: 'Usuário ou senha incorretos.' });
    }
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
