# Tes interview SehatQ. Projek ini mengedepankan Desain Maksimal, Performa Maksimal dan SEO Maksimal.

## Instalasi

1. Pastikan Docker sudah dinyalakan.
2. Jalankan cmd di bawah ini pada folder projek kita untuk build package :
```bash
docker build . -t ecommerce
```
3. Jalankan cmd di bawah ini pada folder projek kita agar websitenya bisa diakses :
```bash
docker run -p 3000:3000 ecommerce
```
4. Buka browser lalu akses url ini : [localhost:3000](http://localhost:3000)
5. Untuk login bisa menggunakan Login Google, Login Facebook dan bisa menggunakan login manual dengan username dan passwordnya bisa dilihat di bawah ini :
```bash
Username : admin
Password : admin
```

<br/>


## Desain Maksimal
https://user-images.githubusercontent.com/22767493/131552697-a89b4b2b-3d53-47cc-9010-aa0542371cfa.mp4


<br/>

## Performa maksimal
1. Projek ini dibangun dengan **NextJS**. Dengan **NextJS** performa website menjadi semakin meningkat.
2. Lalu untuk manajemen statenya menggunakan **React Query** yang membuat manajemen state tersinkronisasi dengan baik antara data yang ada di server dengan data state yang ada di local.
3. Projek ini sudah support PWA.

<br/>

## SEO Maksimal
1. Saya memakai robot.txt sehingga bisa mengcrawl data dari sitemap. Dan website yang saya buat ini sangat _sitemap friendly_. Sitemap sendiri menjadi salah satu hal yg penting untuk SEO.
2. URL di projek ini sudah sangat SEO friendly. Bisa dicek pada URL [page detail product](http://localhost:3000/product/nitendo-switch) dan [page hasil pencarian](http://localhost:3000/search/gitar-akustikh). Kedua page ini pun sudah SSR yang artinya sasngat bagus dan sangat sehat untuk SEO (Selain dari kedua page ini menggunakan CSR).
3. Saya sudah menambahkan canonical. Canonical sendiri sangat terpakai sekali karena bisa menghindari duplikasi data SEO.
4. Untuk metanya sudah saya set semua sehingga tidak ada celah untuk masalah SEO
5. Saya sudah memakai schema juga. schema mampu menyimpan data yang lebih mendetail. Seperti data judul produk, harga produk, rating produk, jumlah ulasan dan lain-lain. Data-data yang mendetail ini nantinya akan dimanfaatkan oleh pencarian google agar pencarian google bisa menampilkan data website kita lebih akurat dan informatif.
6. Pada projek yang saya buat kali ini skor SEO nya jika kita tes menggunakan **Google Chrome Lighthouse** maka hasilnya adalah **100** (Merupakan nilai SEO tertinggi. Mengalahkan Shopee yg memiliki skor 93 dan mengalahkan bukalapak yg memiliki skor 90).
- Berikut screenshot dari nilai SEO di bukalapak :

![image](https://user-images.githubusercontent.com/22767493/131561114-343536e9-f1c0-4302-a9cd-640760aa0ec1.png)

- Lalu berikut adalah screenshot nilai SEO dari website yang saya buat

![image](https://user-images.githubusercontent.com/22767493/131561253-8c416e2e-2cb0-4c37-8bb4-b1ea942eec89.png)

## Lainnya
1. Memakai **React Hook**
2. Memakai **useState**
3. memakai **useEffect**
4. memakai **useRef**
5. Saya membuat **API Backend** sendiri. Sehingga ketika kita mengklik tombol **Buy** pada [page detail product](http://localhost:3000/product/nitendo-switch) maka data [Purchase History](http://localhost:3000/cart) akan benar-benar bertambah sehingga ketika websitenya direload maka data [Purchase History](http://localhost:3000/cart) tidak akan kosong lagi.
6. Tampilan website bisa responsive mulai dari ukuran mobile kecil **(375)** sampai ukuran tablet **(768)**
