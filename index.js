const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json())

// генерация случайного числа
function generateNumber() {
    return Math.floor(Math.random() * 1000) + 1;
}

// объект для хранения результатов генерации
const results = {};

// метод generate()
app.get('/generate', (req, res) => {
    const id = Date.now().toString(); // уникальный id
    const number = generateNumber(); // случайное число
    results[id] = number; // сохранение результата генерации по id
    res.json({ id, number }); // отправка результата клиенту
});

// метод get-results() для вывода всех сгенеренных чисел
app.get('/get-results', (req, res) => res.json(results));

// метод retrieve()
app.get('/retrieve/:id', (req, res) => {
    const id = req.params.id;
    const number = results[id]; // получение результата генерации по id
    if (number) {
        res.json({ id, number }); // отправка результата клиенту
    } else {
        res.status(404).json({ error: 'Result not found' }); // отправка ошибки клиенту
    }
});

app.listen(3000,()=>console.log('listening on 3000'));