import '../styles/globals.css';
import 'antd/dist/antd.css';
import { AppProps } from 'next/app';


import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

const VERIFY_TOKEN = 'IGQWRONFZAYRTlfWlEtbmZAtb05YczF0NHBVaUZAxcVRqOUE3SzJKd0FtZAXkzeEVtXzlscHRHT0xNNWM3c3ItdFhmdmRFQnc1aHhMWklkX1l0dEJyM1ZADdWY2bnRWQkdqNlZAjQ3VMbUpibU1mSzhpcTlGaWhiOGR6a0EZD';

app.use(express.json());

app.get('/webhook', (req: Request, res: Response) => {
    const mode = req.query['hub.mode'] as string;
    const challenge = req.query['hub.challenge'] as string;
    const token = req.query['hub.verify_token'] as string;

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('Webhook Verified');
            return res.status(200).send(challenge);
        } else {
            return res.sendStatus(403);
        }
    }
    return res.sendStatus(400);
});

app.post('/webhook', (req: Request, res: Response) => {
    console.log('Received webhook event:', req.body);

    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return <Component {...pageProps} />;
}

export default MyApp;
