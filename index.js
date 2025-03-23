const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const fs = require('fs').promises;

app.use(express.static('server'));
app.use(express.json());

app.post('/output', async (req, res) => {
    const { code, language } = req.body;
    const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            language: language || "python",
            version: language === "javascript" ? "18.15.0" : "3.10.0",
            files: [{ content: code }]
        })
    })

    const result = await response.json();
    res.json(result);
})

app.listen(port, () => {
    console.log(`Example app running at http://localhost:${port}`);
})