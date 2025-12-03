-- Active: 1762329389992@@127.0.0.1@5432@MeetTime-Group

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ini untuk user
CREATE TABLE Users(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    nim VARCHAR(21) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
DROP TABLE Users;

-- ini untuk krs
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
DROP TABLE MataKuliah;

-- ini untuk waktu dinamis
CREATE TABLE KegiatanDinamis(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nama_kegiatan VARCHAR(100) NOT NULL,
    nama_hari VARCHAR(10) NOT NULL,
    waktu_mulai TIME NOT NULL,
    waktu_selesai TIME NOT NULL,

    user_id UUID NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
        REFERENCES Users(id)
        ON DELETE CASCADE
);
DROP TABLE KegiatanDinamis;

-- ini untuk data grup
CREATE TABLE Groups(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nama_group VARCHAR(150) NOT NULL,
    kode_undangan UUID DEFAULT gen_random_uuid() UNIQUE,
    deskripsi TEXT,
    admin_grup UUID NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_group_creator
        FOREIGN KEY(admin_grup)
        REFERENCES Users(id)
        ON DELETE CASCADE
);
DROP TABLE Groups;

-- ini untuk penghubung grup dan user
CREATE TABLE GroupMembers(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    group_id UUID NOT NULL,
    user_id UUID NOT NULL,
    role VARCHAR(20) DEFAULT 'member',
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_group
        FOREIGN KEY(group_id)
        REFERENCES Groups(id)
        ON DELETE CASCADE,
        
    CONSTRAINT fk_member
        FOREIGN KEY(user_id)
        REFERENCES Users(id)
        ON DELETE CASCADE,


    CONSTRAINT unique_member_per_group 
        UNIQUE(group_id, user_id) 
);
DROP TABLE GroupMembers;

-- ini untuk chat dalam grup
CREATE TABLE ChatGroups(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    group_id UUID NOT NULL,
    user_id UUID NOT NULL,
    pesan TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    jenis_pesan VARCHAR(20) DEFAULT 'pesan', -- 'pesan' atau 'pengumuman'

    CONSTRAINT fk_chat_group
        FOREIGN KEY(group_id)
        REFERENCES Groups(id)
        ON DELETE CASCADE,
        
    CONSTRAINT fk_chat_user
        FOREIGN KEY(user_id)
        REFERENCES Users(id)
        ON DELETE CASCADE
);
DROP TABLE ChatGroups;