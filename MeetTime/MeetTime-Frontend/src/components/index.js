import Footer from "./components/footer"
import Header from "./components/header"
import MainLayout from "./components/main"

import { InputBox } from "./components/form-input"
import { AksiCepat } from "./components/aksi-cepat"
import { ListGroup } from "../components/components/list-group";
import { CaraKerja } from "./components/cara-kerja"
import { JadwalSaya } from "./components/jadwal-saya"
import { SideBarAunt } from "./components/side-bar-auntifikasi"
import GuestRoute from "./protected/GuestRoute"
import ProtectedRoute from "./protected/ProtectedRoute"

export {
    Header, Footer, MainLayout, InputBox, 
    AksiCepat, ListGroup, CaraKerja, JadwalSaya,
    SideBarAunt, ProtectedRoute, GuestRoute
}

import { DataGroup } from "./dataset/data-group"
import { DataJadwalSaya } from "./dataset/data-jadwal"
import { CaraKerjaData } from "./dataset/data-carakerja"

export {
    DataGroup, CaraKerjaData, DataJadwalSaya
}