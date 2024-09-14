# Spotify Son Oynatılanlar ReadME
GitHub profilinizdeki README'de son oynatılan Spotify parçalarınızı görüntüleyin. [Vercel](https://vercel.com) tarafından desteklenmektedir.

## Başlangıç
Aşağıdaki düğmeye tıklayarak Spotify hesabınızı bağlayın. Bu, son oynatılan parçalarınıza erişmek için gereklidir.

> Uygulamayı yetkilendirerek, Spotify kullanıcı adınız, erişim belirteci ve yenileme belirtecinizin güvenli bir Firebase veritabanında saklanmasına izin veriyorsunuz. Bu, yalnızca bir kez yetkilendirme yapmanız ve uygulamanın otomatik olarak yenileme belirteçlerini yenilemesini sağlar.
>
> Uygulamayı https://www.spotify.com/account/apps adresinde iptal edebilirsiniz.

<a href="https://spotify.mdusova.com/"><img src="assets/auth.png" alt="Yetkilendirme Butonu" width="160"/></a>

İzin verildikten sonra, README'nize aşağıdaki kodu ekleyin ve `user` sorgu parametresini Spotify kullanıcı adınıza ayarlayın.

```md
![Spotify Son Oynatılan Parçalar](https://spotify.mdusova.com/api?user=31e4wu2ua42rf5qvqaukgjwgz7tu)
```

![Spotify Son Oynatılan Parçalar](https://spotify.mdusova.com/api?user=31e4wu2ua42rf5qvqaukgjwgz7tu)

### Spotify profil bağlantısı
Widget'ı Spotify profilinize (veya herhangi bir websiteye) eklemek için aşağıdaki kodu kullanın:

```md
[![Spotify Son Oynatılan Parçalar](https://spotify.mdusova.com/api?user=31e4wu2ua42rf5qvqaukgjwgz7tu)](https://open.spotify.com/user/31e4wu2ua42rf5qvqaukgjwgz7tu)
```

[![Spotify Son Oynatılan Parçalar](https://spotify.mdusova.com/api?user=31e4wu2ua42rf5qvqaukgjwgz7tu)](https://open.spotify.com/user/31e4wu2ua42rf5qvqaukgjwgz7tu)

### Özel parça sayısı
Özel bir parça sayısı göstermek için count sorgu parametresini geçirin ve gösterilecek parça sayısını ayarlayın.

> Varsayılan: `5`  
> En az: `1`  
> En çok: `10`

Örnek:
```md
![Spotify Son Oynatılan Parçalar](https://spotify.mdusova.com/api?user=31e4wu2ua42rf5qvqaukgjwgz7tu&count=1)
```

![Spotify Son Oynatılan Parçalar](https://spotify.mdusova.com/api?user=31e4wu2ua42rf5qvqaukgjwgz7tu&count=3)

### Özel kart genişliği
Özel bir kart genişliği ayarlamak için width sorgu parametresini geçirin ve istenilen genişliği px olarak ayarlayın.

> Varsayılan: `400`  
> En az: `300`  
> En çok: `1000`

Örnek:
```md
![Spotify Son Oynatılan Parçalar](https://spotify.mdusova.com/api?user=31e4wu2ua42rf5qvqaukgjwgz7tu&width=600)
```

![Spotify Son Oynatılan Parçalar](https://spotify.mdusova.com/api?user=31e4wu2ua42rf5qvqaukgjwgz7tu&width=600)

### Tekil parçalar
Son oynatılan parçalar listesinde yalnızca tekil parçaları göstermek için unique sorgu parametresini geçirin ve `true`, `1`, `on` veya `yes` olarak ayarlayın.

> Varsayılan: `false`  

Örnek:
```md
![Spotify Son Oynatılan Parçalar](https://spotify.mdusova.com/api?user=31e4wu2ua42rf5qvqaukgjwgz7tu&unique=true)
```

![Spotify Son Oynatılan Parçalar](https://spotify.mdusova.com/api?user=31e4wu2ua42rf5qvqaukgjwgz7tu&unique=true)

## Kendi uygulamanı Vercel üzerinden oluştur
[![Vercel Üzerinden Oluştur](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fmustcodes%2Fspotify-son-oynatilan-parcalar&env=NEXT_PUBLIC_CLIENT_ID,NEXT_PUBLIC_BASE_URL,NEXT_PUBLIC_REDIRECT_URI,CLIENT_SECRET,FIREBASE_PROJECT_ID,FIREBASE_PRIVATE_KEY_B64,FIREBASE_CLIENT_EMAIL)

Kendi uygulamanızı oluşturmak için yukarıdaki bağlantıyı kullanın. Sonra, aşağıdaki ortam değişkenlerini ayarlayın:

| Değer | Açıklama |
|---|---|
| `NEXT_PUBLIC_REDIRECT_URI` | Spotify'dan geri çağırma URI'si |
| `NEXT_PUBLIC_BASE_URL` | Projenin temel URL'si |
| `NEXT_PUBLIC_CLIENT_ID` | Spotify uygulaması istemci kimliği |
| `CLIENT_SECRET` | Spotify uygulaması istemci gizli anahtarı |
| `FIREBASE_PROJECT_ID` | Firebase projesi kimliği |
| `FIREBASE_PRIVATE_KEY_B64` | Firebase özel anahtarının base64 kodlu dizesi |
| `FIREBASE_CLIENT_EMAIL` | Firebase istemci e-postası |
| `FIREBASE_DATABASE_URL` | Firebase veritabanı URL'si |
| `WARMUP_KEY` | 	Firebase veritabanı ısınma anahtarı (daha fazla bilgi için [Sıkça Sorulan Sorular](#sıkça-sorulan-sorular) bölümüne bakın)

Son olarak, `utils/Constants.ts` dosyasını düzenleyin ve `ClientId`, `BaseUrl`, `RedirectUri` değerlerini ayarlayın.

## Yerel olarak çalıştırma
1. Git ile projeyi klonlayın:
    ```sh
    $ git clone https://github.com/mustcodes/spotify-son-oynatilan-parcalar.git
    ```
2. Node modüllerini yükleyin:
    ```sh
    $ npm install
    ```
3. Gerekli ortam değişkenlerini içeren `.env` dosyasını oluşturun:
    ```sh
    NEXT_PUBLIC_REDIRECT_URI=<Spotify'dan geri çağırma URI'si>
    NEXT_PUBLIC_BASE_URL=<Projenin temel URL'si>
    NEXT_PUBLIC_CLIENT_ID=<Spotify uygulaması istemci kimliği>
    CLIENT_SECRET=<Spotify uygulaması istemci gizli anahtarı>
    FIREBASE_PROJECT_ID=<Firebase projesi kimliği>
    FIREBASE_PRIVATE_KEY_B64=<Firebase özel anahtarının base64 kodlu dizesi>
    FIREBASE_CLIENT_EMAIL=<Firebase istemci e-postası>
    FIREBASE_DATABASE_URL=<Firebase veritabanı URL'si>
    ```
4. `utils/Constants.ts` dosyasını düzenleyin ve `ClientId`, `BaseUrl`, `RedirectUri` değerlerini ayarlayın.
5. Projeyi başlatın:
    ```sh
    $ npm run dev
    ```

Uygulamanız [http://localhost:3000](http://localhost:3000) başlamış olacaktır.

## Sıkça Sorulan Sorular
### Widget GitHub'da yüklenmiyor.
Bazen GitHub'da widget yüklenmiyor ve `camo.githubusercontent.com`'dan 502 yanıt alıyor olabilirsiniz. Bu, GitHub'nın resimleri proxy etmesi ve uzun süreli isteklerin zaman aşımına uğraması nedeniyle oluyor. Uzun istek süreleri genellikle Firebase veritabanı **soğuk başlatmaları** nedeniyle oluyor, bu da birkaç saniye sürebiliyo ([Bilinen Sorun](https://issuetracker.google.com/issues/158014637)).

Çözüm olarak, `/api/warmup?key=<WARMUP_KEY>` uç noktası var, bu uç nokta tek bir sorgu parametresi `key` ile GET isteği kabul ediyor. Eğer bu, ortam değişkeni `WARMUP_KEY` ile eşleşirse, o zaman basit bir veritabanı okuma isteği Firebase'ye göndererek onu sıcak tutacak. Kendi Vercel örneğiniz için, birkaç dakika ara ile uç noktayı ping etmek için basit bir cron işi kurabilirsiniz. Ben zaten barındırılan Vercel örneği ile bunu yapıyorum.

Bu, kesin bir çözüm olmayabilir ve sorunu %100 ortadan kaldırmayabilir. Daha iyi çözümleriniz varsa veya genel optimizasyonlarınız varsa, bana iletebilirsiniz!

### Firebase veritabanı ısınma anahtarı nedir?
Firebase veritabanı ısınma anahtarı, Firebase veritabanına erişim sağlamak için kullanılan bir anahtardır. Bu anahtar, Firebase veritabanına erişim sağlamak için kullanılır ve `WARMUP_KEY` ortam değişkeninde ayarlanmalıdır.

### Spotify uygulaması istemci kimliği nedir?
Spotify uygulaması istemci kimliği, Spotify'da oluşturduğunuz uygulamanın kimliğidir. Bu kimlik, Spotify'da uygulamanızı tanımlamak için kullanılır ve `NEXT_PUBLIC_CLIENT_ID` ortam değişkeninde ayarlanmalıdır.

### Spotify uygulaması istemci gizli anahtarı nedir?
Spotify uygulaması istemci gizli anahtarı, Spotify'da oluşturduğunuz uygulamanın gizli anahtarıdır. Bu anahtar, Spotify'da uygulamanızı tanımlamak için kullanılır ve `CLIENT_SECRET` ortam değişkeninde ayarlanmalıdır.

### Firebase projesi kimliği nedir?
Firebase projesi kimliği, Firebase'da oluşturduğunuz projenin kimliğidir. Bu kimlik, Firebase'da projenizi tanımlamak için kullanılır ve `FIREBASE_PROJECT_ID` ortam değişkeninde ayarlanmalıdır.

### Firebase özel anahtarının base64 kodlu dizesi nedir?
Firebase özel anahtarının base64 kodlu dizesi, Firebase'da oluşturduğunuz projenin özel anahtarının base64 kodlu dizesidir. Bu dize, Firebase'da projenizi tanımlamak için kullanılır ve `FIREBASE_PRIVATE_KEY_B64` ortam değişkeninde ayarlanmalıdır.

### Firebase istemci e-postası nedir?
Firebase istemci e-postası, Firebase'da oluşturduğunuz projenin istemci e-postasıdır. Bu e-posta, Firebase'da projenizi tanımlamak için kullanılır ve `FIREBASE_CLIENT_EMAIL` ortam değişkeninde ayarlanmalıdır.

### Firebase veritabanı URL'si nedir?
Firebase veritabanı URL'si, Firebase'da oluşturduğunuz projenin veritabanı URL'sidir. Bu URL, Firebase'da projenizi tanımlamak için kullanılır ve `FIREBASE_DATABASE_URL` ortam değişkeninde ayarlanmalıdır. 

## License
[MIT](LICENSE)
