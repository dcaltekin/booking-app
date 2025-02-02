# Hotel Room Booking App

Bu proje, basit düzeyde otel odası kiralama uygulamasını içermektedir. Kullanıcılar rezervasyon yapabilmekte, yöneticiler ise bu ekosistemi kontrol edebilmektedir. Oda durumu güncelleme, oda tipini güncelleme gibi işlemleri sadece yönetici rolündeki üyeler gerçekleştirebilmektedir.

## Kullanılan Teknolojiler

- Backend
  - Node.js (Express.js)
- Frontend
  - React.js
- Database
  - MongoDB
- Auth
  - JWT

## Gereksinimler

Bu projeyi çalıştırmak için aşağıdaki yazılıma ihtiyacınız var:

- [Node.js](https://nodejs.org/)

## Kurulum

Projeyi yerel makinenize klonlayın:

```bash
git clone https://github.com/dcaltekin/booking-app.git
```

Klonlanan dosyayı açtıktan projemizin server tarafındaki bağımlılıkları yükleyin:

```bash
cd booking
cd backend
npm install
```

Daha sonra çevre değişkenlerini belirlemek için backend klasöründeki ana dizinde .env dosyası oluşturun ve içini şu şekilde doldurun:

```bash
MONGODB_URL=mongodb+srv://dcaltekin:T6aLCAN9H57CsnH7@cluster0.u3la1.mongodb.net/hotelbooking?retryWrites=true&w=majority
JWT_SECRET=I6s7b7fP8a9VQ3jR5fdgA1l2Ejv!t3Wo3z@lm12
PORT=5000
```

Ardından serverı ayağa kaldırın:

```bash
npm run dev
```

Ekstra terminal açarak client tarafının bağımlılıklarını yükleyin:

```bash
cd booking
cd frontend
npm install
```

Daha sonra çevre değişkenlerini belirlemek için frontend klasöründeki ana dizinde .env dosyası oluşturun ve içini şu şekilde doldurun:

```bash
REACT_APP_BASE_URL=http://localhost:5000
```

Ardından client'ı başlatın:

```bash
npm start
```

---

Benimle iletişime geçebilirsiniz: [dcaltekin@gmail.com](mailto:dcaltekin@gmail.com)
