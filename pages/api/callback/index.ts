import Cookies from 'cookies';
import { NextApiRequest, NextApiResponse } from 'next';
import { writeTokensToFirebase } from '../../../utils/FirebaseUtil';
import { getUsername, performAuth } from '../../../utils/SpotifyAuthUtil';
import { BaseUrl } from '../../../utils/Constants';


export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const { code, error } = req.query;
    const cookies = new Cookies(req, res);

    if (error && !Array.isArray(error)) {
        res.statusCode = 400;
        cookies.set('spotifyuser');
        res.redirect(`${BaseUrl}?error=${error}`);
        return;
    }

    if (!code || Array.isArray(code)) {
        res.statusCode = 400;
        cookies.set('spotifyuser');
        res.json({ error: 'Geçersiz Yanıt' });
        return;
    }

    try {
        const response = await performAuth(code);
        const username = await getUsername(response.access_token);
        writeTokensToFirebase(username, response.access_token, response.refresh_token);
        cookies.set('spotifyuser', username, {
            httpOnly: false,
        });
        res.redirect(`${BaseUrl}`);
    } catch (e) {
        res.statusCode = 400;
        cookies.set('spotifyuser');
        res.redirect(`${BaseUrl}`);
    }
};
