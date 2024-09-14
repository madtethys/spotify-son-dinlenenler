import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import PlaceholderImg from '../../public/placeholder.webp';
import * as Constants from '../../utils/Constants';
import { getTokensFromFirebase, writeTokensToFirebase } from '../../utils/FirebaseUtil';
import { getRecentlyPlayed, getUsername, isValidToken, refreshAccessToken } from '../../utils/SpotifyAuthUtil';
import { generateSvg } from '../../utils/SvgUtil';


export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const { user } = req.query;
    if (!user || Array.isArray(user)) {
        res.statusCode = 400;
        res.json({ error: `Geçeriz Kullanıcı Parametresi` });
        return;
    }

    const widthQuery: string | string[] | undefined = req.query['width'];
    let width = Constants.defaultWidth;

    if (typeof widthQuery === 'string') {
        width = parseInt(widthQuery);
    }
    if (!width || Array.isArray(width) || width < Constants.minWidth || width > Constants.maxWidth) {
        res.statusCode = 400;
        res.json({ error: `'Genişlik' ${Constants.minWidth} ve ${Constants.maxWidth} parametreleri arasında olmalıdır.` });
        return;
    }

    const countQuery: string | string[] | undefined = req.query['count'];
    let count = Constants.defaultCount;

    if (typeof countQuery === 'string') {
        count = parseInt(countQuery);
    }
    if (!count || Array.isArray(countQuery) || count < Constants.minCount || count > Constants.maxCount) {
        res.statusCode = 400;
        res.json({ error: `'Sayı' ${Constants.minCount} ve ${Constants.maxCount} parametreleri arasında olmalıdır.` });
        return;
    }

    function parseBoolean(value: string) {
        switch (value) {
            case 'true':
            case '1':
            case 'on':
            case 'yes':
                return true;
            default:
                return false;
        }
    }
    const uniqueTrackQuery: string | string[] | undefined = req.query['unique'];
    let uniqueTrack = Constants.defaultUniqueTrack;
    if (typeof uniqueTrackQuery === 'string') {
        uniqueTrack = parseBoolean(uniqueTrackQuery);
    }

    try {
        const tokens = await getTokensFromFirebase(user);
        if (!tokens.accessToken || !tokens.refreshToken) {
            res.redirect(`${Constants.BaseUrl}?error=Lütfen Spofity'ı Yetkilendirin.`);
            return;
        }

        const validToken = await isValidToken(tokens.accessToken);

        if (!validToken) {
            try {
                const newAccessToken = await refreshAccessToken(tokens.refreshToken);
                tokens.accessToken = newAccessToken;
                await writeTokensToFirebase(user, tokens.accessToken, tokens.refreshToken);
            } catch (e) {
                res.redirect(`${Constants.BaseUrl}?error=Lütfen Spofity'ı Yeniden Yetkilendirin`);
                return;
            }
        }

        const username = await getUsername(tokens.accessToken);
        const limit = uniqueTrack ? Constants.defaultUniqueTrackSearchLimit : count
        let recentlyPlayedItems = await getRecentlyPlayed(limit, tokens.accessToken);

        if (uniqueTrack) {
            recentlyPlayedItems = recentlyPlayedItems.filter((v, i, a) => a.findIndex((t) => t.track.id === v.track.id) === i);
            recentlyPlayedItems = recentlyPlayedItems.slice(0, count);
        }

        for (const { track } of recentlyPlayedItems) {
            try {
                const smallImg = track?.album.images[2].url;
                if (!smallImg) {
                    throw new Error();
                }

                const { data } = await axios.get<string>(`${Constants.BaseUrl}/api/proxy`, {
                    params: {
                        img: smallImg,
                    },
                });
                track.inlineimage = data;
            } catch {
                track.inlineimage = PlaceholderImg;
            }
        }

        res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
        res.setHeader('Content-Type', 'image/svg+xml');
        res.statusCode = 200;
        res.send(generateSvg(recentlyPlayedItems, username, width));
    } catch (e) {
        const data = e?.response?.data;
        res.statusCode = 400;
        if (data) {
            res.json({ error: data.message });
        } else {
            res.json({ error: e.toString() });
        }
    }
};
