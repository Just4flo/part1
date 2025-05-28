// pages/dashboard/pesan.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';

export default function PesanPage() {
    const [menu, setMenu] = useState('');
    const [jumlah, setJumlah] = useState('');
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simpan ke database Firebase atau API di sini
        alert(`Pesanan berhasil: ${menu} x${jumlah}`);
        setMenu('');
        setJumlah('');
    };

    return (
        <>
            <Navbar />
            <div className="p-6 max-w-xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Form Pemesanan</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1">Pilih Menu:</label>
                        <select
                            className="w-full p-2 border"
                            value={menu}
                            onChange={(e) => setMenu(e.target.value)}
                            required
                        >
                            <option value="">-- Pilih Menu --</option>
                            <option value="Nasi Goreng">Nasi Goreng</option>
                            <option value="Mie Ayam">Mie Ayam</option>
                            <option value="Ayam Geprek">Ayam Geprek</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1">Jumlah:</label>
                        <input
                            type="number"
                            className="w-full p-2 border"
                            value={jumlah}
                            onChange={(e) => setJumlah(e.target.value)}
                            required
                            min="1"
                        />
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
                        Pesan
                    </button>
                </form>
            </div>
        </>
    );
}
