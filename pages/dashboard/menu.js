// pages/dashboard/menu.js
import Navbar from '@/components/Navbar';

export default function MenuPage() {
    const menu = [
        { nama: 'Nasi Goreng', harga: '15.000' },
        { nama: 'Mie Ayam', harga: '12.000' },
        { nama: 'Ayam Geprek', harga: '17.000' },
    ];

    return (
        <>
            <Navbar />
            <div className="p-6 max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Daftar Menu</h1>
                <ul className="space-y-2">
                    {menu.map((item, index) => (
                        <li key={index} className="border p-2 rounded bg-white shadow">
                            <span className="font-semibold">{item.nama}</span> - Rp{item.harga}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
