// pages/api/setup.js
import { db } from '@/lib/firebase'
import { collection, addDoc, setDoc, doc } from 'firebase/firestore'

export default async function handler(req, res) {
    try {
        // Tambah data dummy ke koleksi "pemesanan"
        const dummyPemesanan = {
            produk: "Paket Website",
            jumlah: 1,
            catatan: "Tolong cepat ya",
            status: "Menunggu Konfirmasi",
            dibuatPada: new Date()
        }

        await addDoc(collection(db, "pemesanan"), dummyPemesanan)

        // Tambah produk default (kalau kamu nanti buat fitur produk)
        await setDoc(doc(db, "produk", "produk1"), {
            nama: "Paket Website",
            harga: 1500000,
            deskripsi: "Pembuatan website profil usaha"
        })

        res.status(200).json({ message: "Setup Firestore selesai! Data awal dibuat." })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Setup gagal", error })
    }
}
