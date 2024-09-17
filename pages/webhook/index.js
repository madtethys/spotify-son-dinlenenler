const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Token ve doğrulama kodu
const VERIFY_TOKEN = 'IGQWRONFZAYRTlfWlEtbmZAtb05YczF0NHBVaUZAxcVRqOUE3SzJKd0FtZAXkzeEVtXzlscHRHT0xNNWM3c3ItdFhmdmRFQnc1aHhMWklkX1l0dEJyM1ZADdWY2bnRWQkdqNlZAjQ3VMbUpibU1mSzhpcTlGaWhiOGR6a0EZD';

// Body parser middleware
app.use(bodyParser.json());

// Webhook doğrulama endpoint'i
app.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const challenge = req.query['hub.challenge'];
    const token = req.query['hub.verify_token'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('Webhook Verified');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
});

// Webhook veri alım endpoint'i
app.post('/webhook', (req, res) => {
    console.log('Received webhook event:', req.body);

    // Instagram'dan gelen veri işlenir
    // Burada gelen olaylara göre işlem yapabilirsiniz

    res.sendStatus(200); // Instagram'a başarı yanıtı döner
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
