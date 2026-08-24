INSERT INTO MataKuliah (nama_matkul, nama_hari, waktu_mulai, waktu_selesai, user_id) 
SELECT data.nama_matkul, data.nama_hari, data.waktu_mulai, data.waktu_selesai, users.id
FROM (
    VALUES
        ('Basis Data', 'Rabu', '14:40'::time, '17:10'::time),
        ('Struktur Data', 'Jumat', '13:50'::time, '16:20'::time),
        ('Pemrograman Web', 'Rabu', '08:00'::time, '10:30'::time)
) AS data(nama_matkul, nama_hari, waktu_mulai, waktu_selesai)
JOIN Users users ON users.nim = 'DEMO-001';
