# Proje Kurulum ve Hızlı Başlangıç

Bu proje iki ana bölümden oluşur:
- **Backend**: Express.js (Node.js) + MySQL
- **Frontend**: React (Vite ile)

---

## 1. Gereksinimler ve Sistem Kurulumu

- **Node.js** (v16+): [Node.js İndir](https://nodejs.org/en/download)
- **npm**: Node.js ile birlikte gelir.
- **MySQL**: Kolay kurulum için [XAMPP](https://www.apachefriends.org/tr/index.html) önerilir.

### Node.js Kurulumu (Windows)
1. [Node.js İndir](https://nodejs.org/en/download) sayfasından LTS sürümünü indirin ve kurun.
2. Kurulum sonrası terminalde `node -v` ve `npm -v` komutlarıyla sürüm kontrolü yapın.

### MySQL Kurulumu (XAMPP ile)
1. [XAMPP İndir](https://www.apachefriends.org/tr/index.html) ve kurun.
2. XAMPP Control Panel'den **Apache** ve **MySQL** servislerini başlatın.
3. MySQL için kullanıcı adı: `root`, şifre: (boş bırakın).

---

## 2. Proje Kurulumu

### Backend
1. `backend` klasörüne girin:
   ```bash
   cd backend
   npm install
   ```
2. Ortam değişkenleri için `.env` dosyası oluşturun:
   ```env
   DB_NAME=sigorta
   DB_USER=root
   DB_PASSWORD=
   DB_HOST=localhost
   ```
3. Sunucuyu başlatın:
   ```bash
   nodemon server.js
   ```

### Frontend
1. `frontend` klasörüne girin:
   ```bash
   cd frontend
   npm install
   ```
2. Ortam değişkenleri için `.env` dosyası oluşturun (gerekirse).
3. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```
4. Tarayıcıda [http://localhost:5173](http://localhost:5173) adresini açın.

---

## 3. Temel Kullanım Akışı

1. **Kullanıcı oluşturun**
2. **Araç ekleyin**
3. **Teklif alın/oluşturun**
4. **Teklif ödeyin, poliçe oluşsun**
5. **Poliçe PDF indirin**
6. **Geri bildirimleri görüntüleyin**

Tüm işlemler arayüzde ilgili menülerden kolayca yapılabilir.

---

## 4. Sorun Giderme
- Bağlantı/kurulum hatalarında ortam değişkenlerini ve MySQL erişim bilgilerinizi kontrol edin.
- Port çakışmalarında `.env` dosyasındaki `PORT` ve frontend'in API adresini güncelleyin.

Yardım için: Merve Nur Tepe

---

## 5. Ek Bilgiler
- `node_modules` ve `.env` dosyaları versiyon kontrolüne dahil edilmez.
- Backend, MySQL bağlantısı için `.env` dosyasını kullanır.

---

## 6. Vite Neden Kullanıldı?
Vite, modern web projelerinde hızlı geliştirme ve anında güncelleme (hot reload) sağlar. ES modül desteği, optimize build ve kolay React entegrasyonu ile klasik araçlara göre çok daha hızlı ve verimlidir.

---

## 7. Kullanılan Temel Paketler

### Backend
- **express**: API sunucusu
- **cors**: CORS yönetimi
- **dotenv**: Ortam değişkenleri
- **mysql2**: MySQL bağlantısı
- **sequelize**: ORM
- **pdfkit**: PDF oluşturma
- **dayjs**: Tarih/saat işlemleri
- **nodemon**: Otomatik sunucu yeniden başlatma

### Frontend
- **react, react-dom**: Arayüz
- **vite**: Geliştirme ve build aracı
- **@mui/material, @mui/icons-material**: Material UI bileşenleri
- **@emotion/react, @emotion/styled**: CSS-in-JS
- **@fullcalendar/core, @fullcalendar/react**: Takvim
- **@headlessui/react**: Erişilebilir UI
- **@tailwindcss/forms, tailwindcss**: CSS framework
- **axios**: HTTP istekleri
- **classnames**: Dinamik class yönetimi
- **dayjs, moment**: Tarih/saat işlemleri
- **file-saver**: Dosya indirme
- **material-react-table**: Tablo
- **react-flatpickr**: Tarih seçici
- **react-leaflet**: Harita
- **react-phone-input-2**: Telefon input
- **react-popper**: Tooltip/dropdown
- **react-router-dom**: Yönlendirme
- **react-transition-group**: Animasyon
- **uuid**: Benzersiz ID

Geliştirme bağımlılıkları: Vite, ESLint, Tailwind, Sass vb.

---

## 8. Detaylı Anlatım

### 1. Sistem ve Proje Kurulumu

#### Node.js Kurulumu (Windows)
- [Node.js İndir](https://nodejs.org/en/download) adresinden LTS sürümünü indirip kurun.
- Kurulum sonrası terminalde `node -v` ve `npm -v` komutlarıyla sürüm kontrolü yapın.

#### MySQL Kurulumu (XAMPP ile)
- [XAMPP İndir](https://www.apachefriends.org/tr/index.html) ve kurun.
- XAMPP Control Panel'den **Apache** ve **MySQL** servislerini başlatın.
- MySQL için kullanıcı adı: `root`, şifre: (boş bırakın).

#### Proje Kurulumu
- `backend` ve `frontend` klasörlerinde sırasıyla `npm install` komutunu çalıştırın.
- Backend için `.env` dosyasını oluşturun ve veritabanı bilgilerini girin.
- Backend'i `nodemon server.js` ile, frontend'i `npm run dev` ile başlatın.

---

### 2. Frontend Kullanım Akışı (Adım Adım)

#### 2.1. Kullanıcı Yönetimi (`UserPage.jsx`)
- **Kullanıcı ekleme:** Formu doldurup "Ekle" butonuna basın. Gerekli alanlar: e-posta, ad, soyad, telefon, adres, TC kimlik no.
- **Kullanıcı düzenleme:** Tablo üzerindeki "Düzenle" butonuna tıklayın, formda değişiklik yapıp "Güncelle"ye basın.
- **Kullanıcı silme:** Tablo üzerindeki "Sil" butonuna tıklayın, onaylayın.

#### 2.2. Araç Yönetimi (`VehiclePage.jsx`)
- **Araç ekleme:** Kullanıcı seçin, plaka, marka/model girin. TC kimlik no otomatik gelir.
- **Araç düzenleme:** Tablo üzerindeki "Düzenle" ile formu doldurup güncelleyin.
- **Araç silme:** Tablo üzerindeki "Sil" ile aracı kaldırın.

#### 2.3. Teklifler (`QuotePage.jsx` ve `QuoteCreatePage.jsx`)
- **Teklifleri Görüntüleme:** Tüm teklifleri tablo halinde görebilirsiniz.
- **Teklif Oluşturma:** 
  - Araç seçin veya plaka ile sorgulayın.
  - Araca ait sigorta şirketi teklifleri listelenir.
  - İstediğiniz teklifi seçin ve ödeme adımına geçin.

#### 2.4. Ödeme ve Poliçe Oluşturma (`PaymentPage.jsx`)
- **Ödeme işlemi:** Teklif seçildikten sonra ödeme formu doldurulur ve "Ödendi" butonuna basılır.
- **Başarılı ödeme sonrası:** Sistem otomatik olarak poliçe oluşturur ve ana sayfaya yönlendirir.
- **Ödemeleri görüntüleme, düzenleme, silme:** Tablo üzerinden işlemler yapılabilir.

#### 2.5. Poliçeler ve PDF İndirme (`PolicePage.jsx`)
- **Poliçeleri Görüntüleme:** Tüm poliçeler tablo halinde listelenir.
- **PDF İndirme:** "PDF İndir" butonuna tıklayarak poliçenin PDF dosyasını bilgisayarınıza indirebilirsiniz.

#### 2.6. Geri Bildirimler (`FeedbackPage.jsx`)
- **Geri bildirimleri görüntüleme:** Kullanıcıların puan ve yorumlarını tablo halinde görebilirsiniz.
- **Geri bildirim silme:** Tablo üzerindeki "Sil" butonuyla geri bildirimi kaldırabilirsiniz.

#### 2.7. Hata ve Yönlendirme (`PageNotFound.jsx`)
- Geçersiz bir sayfa adresine gidildiğinde kullanıcıya bilgilendirici bir hata sayfası gösterilir ve ana sayfaya dönmesi sağlanır.

---

### 3. Ek Notlar ve İpuçları

- Tüm formlar ve tablolar, kullanıcı dostu ve anlık geri bildirim (toast/alert) ile çalışır.
- Her işlem sonrası ilgili tablo otomatik güncellenir.
- Geliştirme ortamında değişiklikler anında arayüze yansır (Vite hot reload).
- Tüm API istekleri backend'deki REST endpoint'lerine yapılır.
- PDF indirme işlemi, backend'den dosya olarak alınır ve tarayıcıda otomatik indirilir.

---

Bu detaylı anlatım ile hem kurulum hem de uygulamanın tüm işlevlerini adım adım ve pratik olarak takip edebilirsiniz.  
Herhangi bir sorunda README'nin ilgili bölümüne veya Merve Nur Tepe'ye başvurabilirsiniz.

---

## 9. Kullanılan Paketlerin Detaylı Açıklamaları

### Backend Paketleri

- **express**: Node.js üzerinde hızlı ve esnek bir web sunucusu sağlar. API endpoint'lerinin ve HTTP isteklerinin yönetilmesinde kullanılır.
- **cors**: Farklı domainlerden gelen isteklerin backend'e ulaşmasını sağlar. Özellikle frontend ve backend farklı portlarda çalışırken gereklidir.
- **dotenv**: Ortam değişkenlerini `.env` dosyasından okuyarak uygulamaya aktarır. Hassas bilgiler (veritabanı şifresi gibi) koddan ayrılır.
- **mysql2**: MySQL veritabanı ile hızlı ve güvenli bağlantı kurmak için kullanılır. Sequelize ORM ile birlikte çalışır.
- **sequelize**: SQL sorgularını JavaScript nesneleriyle yönetmeyi sağlayan bir ORM'dir. Kodunuzu veritabanı bağımsız ve daha okunabilir hale getirir. ORM nedir ?
- **pdfkit**: Sunucu tarafında dinamik olarak PDF dosyaları oluşturmak için kullanılır. Poliçe çıktıları gibi dokümanlar üretir.
- **dayjs**: Tarih ve saat işlemlerini kolaylaştıran, hafif ve modern bir kütüphane. Tarih formatlama ve karşılaştırma işlemlerinde kullanılır.
- **nodemon**: Geliştirme sırasında dosya değişikliklerini izler ve sunucuyu otomatik olarak yeniden başlatır. Üretim ortamında kullanılmaz.

### Frontend Paketleri

- **react, react-dom**: Modern, bileşen tabanlı kullanıcı arayüzleri oluşturmak için temel kütüphanelerdir. `react-dom` tarayıcıya render işlemini yönetir.
- **vite**: Hızlı geliştirme sunucusu ve build aracı. Anında güncelleme (hot reload) ve modern modül desteği sunar.
- **@mui/material, @mui/icons-material, @mui/base, @mui/x-date-pickers**: Google'ın Material Design prensiplerine uygun, hazır ve özelleştirilebilir React bileşenleri sağlar.
- **@emotion/react, @emotion/styled**: CSS-in-JS yaklaşımıyla, JavaScript içinde dinamik ve temalı stiller yazmayı sağlar.
- **@fullcalendar/core, @fullcalendar/react, @fullcalendar/daygrid, fullcalendar**: Takvim ve etkinlik yönetimi için kullanılır. Kullanıcıya görsel takvim sunar.
- **@headlessui/react**: Erişilebilir ve tamamen özelleştirilebilir UI bileşenleri sunar. Tasarım özgürlüğü sağlar.
- **@tailwindcss/forms, tailwindcss**: Utility-first CSS framework. Hızlı ve tutarlı arayüz geliştirmeye olanak tanır. Formlar için özel stiller içerir.
- **axios**: HTTP isteklerini kolayca yapmak için kullanılır. API ile veri alışverişinde standarttır.
- **classnames**: Dinamik olarak CSS class'larını birleştirmek ve yönetmek için kullanılır.
- **dayjs, moment**: Tarih ve saat işlemleri için. `dayjs` daha hafif ve modern, `moment` ise eski ve daha kapsamlıdır.
- **file-saver**: Tarayıcıda dosya indirme işlemlerini kolaylaştırır. PDF veya diğer dosyaların indirilmesinde kullanılır.
- **material-react-table**: Material UI tabanlı, gelişmiş özelliklere sahip tablo bileşeni sunar.
- **react-flatpickr**: Kullanıcı dostu bir tarih seçici (datepicker) bileşeni.
- **react-leaflet**: Harita ve coğrafi veri görselleştirme için kullanılır. OpenStreetMap tabanlıdır.
- **react-phone-input-2**: Uluslararası telefon numarası girişi için özelleştirilebilir input bileşeni.
- **react-popper**: Tooltip, dropdown gibi açılır bileşenlerin konumlandırılmasını kolaylaştırır.
- **react-router-dom**: Tek sayfa uygulamalarda (SPA) sayfa yönlendirme ve URL yönetimi sağlar.
- **react-transition-group**: Bileşen geçiş animasyonları ve efektleri için kullanılır.
- **uuid**: Evrensel benzersiz kimlikler (ID) üretmek için kullanılır. Veri tabanında veya frontend'de eşsiz anahtarlar oluşturur.

#### Geliştirme Bağımlılıkları
- **@vitejs/plugin-react**: Vite ile React projelerini entegre eder.
- **autoprefixer, postcss, sass**: CSS işleme, tarayıcı uyumluluğu ve gelişmiş stil yazımı için kullanılır.
- **eslint, eslint-plugin-react, eslint-config-react-app, @eslint/js, globals**: Kod kalitesini ve tutarlılığını sağlamak için linter ve kurallar.