# Spotify Son Dinlenen Müzikler
Spotify'da son dinlediğiniz müzikleri websitenize/profilinize ekleyin. [Vercel](https://vercel.com) tarafından desteklenmektedir.

## • BÖLÜM 1: Başlangıç
Aşağıdaki "Yetkilendir" düğmesine tıklayarak Spotify hesabınızı bağlayın. Bu, son dinlediğiniz müziklere erişmek için gereklidir.

> Uygulamayı yetkilendirerek, Spotify kullanıcı adınız, erişim tokeniniz ve yenileme tokeninizin güvenli bir şekilde Google Firebase veritabanında saklanmasına izin veriyorsunuz. Bu, yalnızca bir kez yetkilendirme yapmanızı ve uygulamanın otomatik olarak erişim tokeninizin yenilemesini sağlar.
>
> Uygulamanın verinize erişimini https://www.spotify.com/account/apps adresinden iptal edebilirsiniz.

<a href="https://spotify.mdusova.com/"><img src="assets/auth.png" alt="Yetkilendirme Butonu" width="160"/></a>

Yetkilendirdikten sonra, aşağıdaki kodu websitenize/profilinize ekleyin ve `?user=xxxxx` parametresindeki xxxxx kısmına Spotify kullanıcı adınızı yazın.

#### + Markdown'a eklemek için:
```md
![Spotify Son Oynatılan Parçalar](https://spotify.mdusova.com/api?user=xxxxx)
```
#### + HTML'e eklemek için:
```md
<img src="https://spotify.mdusova.com/api?user=xxxxx" alt="Spotify Son Dinlenen Müzikler by madtethys" />
```

![Spotify Son Oynatılan Parçalar](https://spotify.mdusova.com/api?user=31e4wu2ua42rf5qvqaukgjwgz7tu)

## BÖLÜM 2: Listede bulunan müzik sayısı ayarlamak
Listede bulunacak müzik sayısını ayarlamak için API URL'sine `&count=x` ekleyebilirsiniz. `x`in alabileceği değerler:

> Varsayılan: `5`  
> Minimum: `1`  
> Maksimum: `10`

#### + Markdown'a eklemek için:
ℹ️ `?user=` parametresini kendi kullanıcı adınıza göre düzenlemeyi unutmayın!
```md
![Spotify Son Oynatılan Parçalar](https://spotify.mdusova.com/api?user=31e4wu2ua42rf5qvqaukgjwgz7tu&count=3)
```
#### + HTML'e eklemek için:
ℹ️ `?user=` parametresini kendi kullanıcı adınıza göre düzenlemeyi unutmayın!
```md
<img src="https://spotify.mdusova.com/api?user=31e4wu2ua42rf5qvqaukgjwgz7tu&count=3" alt="Spotify Son Dinlenen Müzikler by madtethys" />
```

![Spotify Son Oynatılan Parçalar](https://spotify.mdusova.com/api?user=31e4wu2ua42rf5qvqaukgjwgz7tu&count=3)

## • BÖLÜM 2.1: Listenin genişliğini ayarlamak
Listenin genişliğini ayarlamak için API URL'sine `&width=xxx` ekleyebilirsiniz. `xxx`in alabileceği değerler:

> Varsayılan: `400`  
> Minimum: `300`  
> Maksimum: `1000`

#### + Markdown'a eklemek için:
ℹ️ `?user=` parametresini kendi kullanıcı adınıza göre düzenlemeyi unutmayın!
```md
![Spotify Son Oynatılan Parçalar](https://spotify.mdusova.com/api?user=31e4wu2ua42rf5qvqaukgjwgz7tu&width=600)
```
#### + HTML'e eklemek için:
ℹ️ `?user=` parametresini kendi kullanıcı adınıza göre düzenlemeyi unutmayın!
```md
<img src="https://spotify.mdusova.com/api?user=31e4wu2ua42rf5qvqaukgjwgz7tu&width=600" alt="Spotify Son Dinlenen Müzikler by madtethys" />
```

![Spotify Son Oynatılan Parçalar](https://spotify.mdusova.com/api?user=31e4wu2ua42rf5qvqaukgjwgz7tu&width=600)

## • BÖLÜM 2.2: Listede tekrar dinlenen müzikleri göstermek
Listede tekrar dinlenen müzikleri göstermek için API URL'sine `&unique=true` ekleyebilirsiniz. 

> Varsayılan olarak URL'ye eklenmemiş haldedir. Yani listede tekrar dinlediğiniz müzikler gösterilmeyecektir. 
> API URL'sine `&unique=true` eklediğinizde listede tekrar dinlediğiniz müzikleri görebilirsiniz.

#### + Markdown'a eklemek için:
ℹ️ `?user=` parametresini kendi kullanıcı adınıza göre düzenlemeyi unutmayın!
```md
![Spotify Son Oynatılan Parçalar](https://spotify.mdusova.com/api?user=31e4wu2ua42rf5qvqaukgjwgz7tu&unique=true)
```
#### + HTML'e eklemek için:
ℹ️ `?user=` parametresini kendi kullanıcı adınıza göre düzenlemeyi unutmayın!
```md
<img src="https://spotify.mdusova.com/api?user=31e4wu2ua42rf5qvqaukgjwgz7tu&unique=true" alt="Spotify Son Dinlenen Müzikler by madtethys" />
```

![Spotify Son Oynatılan Parçalar](https://spotify.mdusova.com/api?user=31e4wu2ua42rf5qvqaukgjwgz7tu&unique=true)

## • BÖLÜM 3: Kendi uygulamanı Vercel üzerinden oluştur
[![Vercel Üzerinden Oluştur](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fmadtethys%2Fspotify-son-dinlenenler&env=NEXT_PUBLIC_CLIENT_ID,NEXT_PUBLIC_BASE_URL,NEXT_PUBLIC_REDIRECT_URI,CLIENT_SECRET,FIREBASE_PROJECT_ID,FIREBASE_PRIVATE_KEY_B64,FIREBASE_CLIENT_EMAIL)

Kendi uygulamanızı oluşturmak için yukarıdaki bağlantıyı kullanın. Sonra, aşağıdaki ortam değişkenlerini(environment/env) ayarlayın:

| Değer | Açıklama |
|---|---|
| `NEXT_PUBLIC_REDIRECT_URI` | Spotify callback URI'si http://alanadiniz.com/api/callback |
| `NEXT_PUBLIC_BASE_URL` | Projenin URL'si |
| `NEXT_PUBLIC_CLIENT_ID` | Spotify uygulaması istemci kimliği |
| `CLIENT_SECRET` | Spotify uygulaması istemci gizli anahtarı |
| `FIREBASE_PROJECT_ID` | Firebase proje kimliği(ID) |
| `FIREBASE_PRIVATE_KEY_B64` | Firebase sistem kullanıcısı özel anahtarının base64 encode edilmiş hali |
| `FIREBASE_CLIENT_EMAIL` | Firebase sistem kullanıcı e-postası |
| `FIREBASE_DATABASE_URL` | Firebase veritabanı URL'si |

Son olarak, `utils/Constants.ts` dosyasını düzenleyin ve `ClientId`, `BaseUrl`, `RedirectUri` değerlerini ayarlayın.

## • BÖLÜM 4: Yerel olarak çalıştırma
1. Git ile projeyi klonlayın:
    ```sh
    $ git clone https://github.com/madtethys/spotify-son-dinlenenler.git
    ```
2. Node modüllerini yükleyin:
    ```sh
    $ npm install
    ```
3. Gerekli ortam değişkenlerini içeren `.env` dosyasını oluşturun:
    ```sh
    NEXT_PUBLIC_REDIRECT_URI=<Spotify callback URI'si http://localhost:3000/api/callback>
    NEXT_PUBLIC_BASE_URL=<Projenin URL'si yerelde çalıştırmak için (http://localhost:3000)>
    NEXT_PUBLIC_CLIENT_ID=<Spotify uygulaması istemci kimliği>
    CLIENT_SECRET=<Spotify uygulaması istemci gizli anahtarı>
    FIREBASE_PROJECT_ID=<Firebase proje kimliği(ID)>
    FIREBASE_PRIVATE_KEY_B64=<Firebase sistem kullanıcısı özel anahtarının base64 encode edilmiş hali>
    FIREBASE_CLIENT_EMAIL=<Firebase sistem kullanıcı e-postası>
    FIREBASE_DATABASE_URL=<Firebase veritabanı URL'si>
    ```
4. `utils/Constants.ts` dosyasını düzenleyin ve `ClientId`, `BaseUrl`, `RedirectUri` değerlerini ayarlayın.
5. Projeyi başlatın:
    ```sh
    $ npm run dev
    ```

📍 Uygulamanız [http://localhost:3000](http://localhost:3000) başlamış olacaktır.

## • BÖLÜM 5: Sıkça Sorulan Sorular
#### ❓ SORU: Widget GitHub'da yüklenmiyor.
✔️ Bazen GitHub'da widget yüklenmiyor ve `camo.githubusercontent.com`'dan 502 yanıt alıyor olabilirsiniz. Bu, GitHub'nın resimleri proxy etmesi ve uzun süreli isteklerin zaman aşımına uğraması nedeniyle oluyor. Uzun istek süreleri genellikle Firebase veritabanı **sunucu uzaklığı** nedeniyle oluyor, bu da birkaç saniye sürebiliyor. Eğer sayfayı yenilediğinizde halen daha görüntü yüklenmiyorsa Firebase projenizi başka bir Google hesabıyla tekrardan oluşturabilirsiniz.

ℹ️ Bu, **kesin** bir çözüm **olmayabilir** ve **sorunu %100 ortadan kaldırmayabilir**. Daha iyi çözümleriniz varsa veya genel optimizasyonlarınız varsa, bana iletebilirsiniz!

#### ❓ SORU: Spotify uygulaması istemci kimliği nedir?
✔️ Spotify uygulaması istemci kimliği, Spotify'da oluşturduğunuz uygulamanın kimliğidir. Bu kimlik, Spotify'da uygulamanızı tanımlamak için kullanılır ve `NEXT_PUBLIC_CLIENT_ID` ortam değişkeninde ayarlanmalıdır.

#### ❓ SORU: Spotify uygulaması istemci gizli anahtarı nedir?
✔️ Spotify uygulaması istemci gizli anahtarı, Spotify'da oluşturduğunuz uygulamanın gizli anahtarıdır. Bu anahtar, Spotify'da uygulamanızı tanımlamak için kullanılır ve `CLIENT_SECRET` ortam değişkeninde ayarlanmalıdır.

#### ❓ SORU: Firebase proje kimliği(ID) nedir?
✔️ Firebase proje kimliği(ID), Firebase'da oluşturduğunuz projenin kimliğidir. Bu kimlik, Firebase'da projenizi tanımlamak için kullanılır ve `FIREBASE_PROJECT_ID` ortam değişkeninde ayarlanmalıdır.

#### ❓ SORU: Firebase sistem kullanıcısı özel anahtarının base64 encode edilmiş hali nedir?
✔️ Firebase sistem kullanıcısı özel anahtarının base64 encode edilmiş hali, Firebase'da oluşturduğunuz projenin özel anahtarının base64 şeklinde encode edilmiş halidir. Bu anahtar, Firebase'da projenizi tanımlamak için kullanılır ve `FIREBASE_PRIVATE_KEY_B64` ortam değişkeninde ayarlanmalıdır.

#### ❓ SORU: Firebase sistem kullanıcı e-postası nedir?
✔️ Firebase sistem kullanıcı e-postası, Firebase'da oluşturduğunuz projenin sistem kullanıcısının e-postasıdır. Bu e-posta, Firebase'da projenizi tanımlamak için kullanılır ve `FIREBASE_CLIENT_EMAIL` ortam değişkeninde ayarlanmalıdır.

#### ❓ SORU: Firebase veritabanı URL'si nedir?
✔️ Firebase veritabanı URL'si, Firebase'da oluşturduğunuz projenin veritabanı URL'sidir. Bu URL, Firebase'da projenizi tanımlamak için kullanılır ve `FIREBASE_DATABASE_URL` ortam değişkeninde ayarlanmalıdır. 

## • BÖLÜM 6: Eklenecek Özellikler
#### + Ayarlar Sekmesi:
> API'nin URL'siyle uğraşmanıza gerek kalmadan ayarlar sekmesinden yapacağınız ayarlar ile URL'yi daha kolay şekilde temin edebileceksiniz.

#### + Instagram Hikayesine Ekleme:
> API'den aldığımız görüntüyü Instagram hikayesinde paylaşma eklenecek. Bunun için `Backend` ve `Instagram Graph API` çalışmalarım devam ediyor. 

#### + Anlık Veri Çekme:
> Bu proje [Vercel](https://vercel.com/) tarafından desteklenmektedir. Şu anda %100 anlık veri çekemesek de %92.4 gibi güzel bir oranda anlık veri çekebiliyoruz. Bu gecikmenin sebebi ise projenin [Vercel](https://vercel.com/)'in Europe-West1 (Ireland) ve [Firebase Veritabanı](https://firebase.google.com/)'nın Europe-West1 (Belgium) sunucusunda bulunmasından dolayıdır. Yakın zamanda proje başka sağlayıcıya(Türkiye sunucularına) taşınacaktır. 

## • BÖLÜM 7: Gizlilik Politikası
Gizlilik politikasını [buradan](./gizlilik-politikası.md) okuyabilirsiniz.

## • BÖLÜM 8: Lisans
Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır. Daha fazla bilgi için lisans dosyasına bakınız.
