# MeetTime

MeetTime adalah project mata kuliah/kelompok berupa aplikasi web untuk membantu mahasiswa mengelola agenda, membandingkan jadwal dalam grup, dan berkomunikasi melalui chat. Repository ini memisahkan API dan antarmuka web; pembagian kontribusi setiap anggota kelompok belum didokumentasikan pada history repository.

## Fitur

- registrasi dan login pengguna;
- agenda pribadi dan jadwal kuliah;
- pencarian waktu kosong bersama;
- pembuatan grup dan pengelolaan anggota;
- chat dan pengumuman grup;
- pembersihan agenda kedaluwarsa melalui cron job.

## Teknologi

- Backend: Node.js, Express, PostgreSQL, JWT, dan node-cron
- Frontend: React, Vite, Tailwind CSS, dan Axios

## Struktur Project

```text
MeetTime-Backend/   API, service, controller, skema database, dan cron job
MeetTime-Frontend/  aplikasi React
```

## Persyaratan

- Node.js 20 atau lebih baru;
- PostgreSQL;
- dua file konfigurasi lokal yang dibuat dari `.env.example`.

## Menjalankan Secara Lokal

Siapkan skema PostgreSQL dari `MeetTime-Backend/database/database.sql`. Setelah itu, salin contoh konfigurasi dan isi nilainya melalui environment lokal. `JWT_SECRET` wajib tersedia dan minimal 32 karakter pada production; production juga mewajibkan origin frontend HTTPS dan konfigurasi database yang lengkap.

```bash
cd MeetTime-Backend
cp .env.example .env
npm install
npm run dev
```

Pada terminal lain:

```bash
cd MeetTime-Frontend
cp .env.example .env
npm install
npm run dev
```

File `.env` hanya untuk mesin lokal dan tidak boleh di-commit.

## Fixture Development

Seeder hanya menyediakan akun fiktif dan menolak dijalankan pada `NODE_ENV=production`. Password fixture tidak berada di source; isi `MEETTIME_SEED_PASSWORD` dengan nilai development minimal 12 karakter, lalu jalankan:

```bash
cd MeetTime-Backend
npm run seed:dev
```

Jangan menggunakan fixture atau password development untuk deployment nyata.

## Pengujian

Backend memiliki unit test untuk invariant authorization grup, validasi konfigurasi startup, dan keamanan fixture development.

```bash
cd MeetTime-Backend
npm test

cd ../MeetTime-Frontend
npm run lint
npm run build
```

## Catatan Keamanan

- semua resource anggota, jadwal, dan chat grup memeriksa membership berdasarkan `req.user.id` dari middleware autentikasi;
- operasi pengelolaan anggota dan penghapusan grup memerlukan hak admin;
- akses ke grup yang bukan milik pengguna menghasilkan respons generik agar keberadaan resource privat tidak bocor;
- login dan registrasi memiliki rate limit per alamat jaringan tanpa lockout permanen;
- request yang memakai cookie autentikasi pada method perubahan data wajib berasal dari origin frontend yang dikonfigurasi;
- koneksi database production memverifikasi sertifikat TLS dan mendukung CA dari environment atau file;
- secret production wajib diberikan saat runtime dan tidak memiliki fallback source-controlled.

Current tree telah disanitasi, tetapi credential yang pernah masuk Git history tetap harus dirotasi dan history perlu ditangani melalui proses terpisah sebelum repository dipublikasikan ulang.

## Status Project

Project pembelajaran kolaboratif yang sudah memperoleh hardening dasar dan pengujian authorization. Validasi end-to-end dengan database nyata masih diperlukan sebelum deployment production.
