-- Active: 1762329389992@@127.0.0.1@5432@MeetTime-Group

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE Users(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    nim VARCHAR(21) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
DROP TABLE Users;

CREATE TABLE MataKuliah(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nama_matkul VARCHAR(100) NOT NULL,
    nama_hari VARCHAR(10) NOT NULL,
    waktu_mulai TIME NOT NULL,
    waktu_selesai TIME NOT NULL,

    user_id UUID NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
        REFERENCES Users(id)
        ON DELETE CASCADE
);

INSERT INTO MataKuliah (nama_matkul, nama_hari, waktu_mulai, waktu_selesai, user_id) 
VALUES
    ('Wirausaha Digital', 'Jumat', '08:00', '09:40', '06a4d474-4d58-42e2-ad19-66d5d9334698'),
    ('Basis Data', 'Rabu', '14:40', '17:10', '06a4d474-4d58-42e2-ad19-66d5d9334698'),
    ('Struktur Data', 'Jumat', '13:50', '16:20', '06a4d474-4d58-42e2-ad19-66d5d9334698'),
    ('Pemrograman Web', 'Rabu', '08:00', '10:30', '06a4d474-4d58-42e2-ad19-66d5d9334698'),
    ('Kecerdasan Buatan', 'Selasa', '13:50', '16:20', '06a4d474-4d58-42e2-ad19-66d5d9334698'),
    ('IELTS Preparation', 'Selasa', '10:30', '12:10', '06a4d474-4d58-42e2-ad19-66d5d9334698'),
    ('Desain Interaksi', 'Senin', '10:30', '12:10', '06a4d474-4d58-42e2-ad19-66d5d9334698'),
    ('Etika Profesi', 'Rabu', '15:30', '17:10', '06a4d474-4d58-42e2-ad19-66d5d9334698'),
    ('Praktikum Basis Data', 'Senin', '13:50', '15:30', '06a4d474-4d58-42e2-ad19-66d5d9334698'),
    ('Praktikum Pemrograman Web', 'Jumat', '10:30', '12:10', '06a4d474-4d58-42e2-ad19-66d5d9334698'),
    ('Praktikum Struktur Data', 'Kamis', '13:00', '14:40', '06a4d474-4d58-42e2-ad19-66d5d9334698')
;


DROP TABLE MataKuliah;
