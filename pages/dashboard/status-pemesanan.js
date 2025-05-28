// pages/dashboard/status-pemesanan.js
import Navbar from '@/components/Navbar';

export default function StatusPemesanan() {
    const dataDummy = [
        { id: 1, menu: 'Nasi Goreng', jumlah: 2, status: 'Diproses' },
        { id: 2, menu: 'Mie Ayam', jumlah: 1, status: 'Selesai' },
    ];

    return (
        <>
            <Navbar />
            <div className="p-6 max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Status Pemesanan</h1>
                <table className="w-full border text-left">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-2">#</th>
                            <th className="p-2">Menu</th>
                            <th className="p-2">Jumlah</th>
                            <th className="p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataDummy.map((item) => (
                            <tr key={item.id} className="border-t">
                                <td className="p-2">{item.id}</td>
                                <td className="p-2">{item.menu}</td>
                                <td className="p-2">{item.jumlah}</td>
                                <td className="p-2">{item.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
