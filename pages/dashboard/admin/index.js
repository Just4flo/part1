import Sidebar from '@/components/Sidebar';

export default function AdminDashboard() {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <main className="ml-64 p-8 w-full">
                <h2 className="text-2xl font-bold mb-6">Dashboard Admin</h2>

                {/* Ringkasan Stat */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-lg font-semibold mb-2 text-black">Total Pesanan</h3>
                        <p className="text-3xl font-bold text-blue-600">152</p>
                    </div>
                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-lg font-semibold mb-2 text-black">Pelanggan Aktif</h3>
                        <p className="text-3xl font-bold text-green-600">87</p>
                    </div>
                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-lg font-semibold mb-2 text-black">Menu Tersedia</h3>
                        <p className="text-3xl font-bold text-yellow-600">24</p>
                    </div>
                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-lg font-semibold mb-2 text-black">Pendapatan Hari Ini</h3>
                        <p className="text-3xl font-bold text-purple-600">Rp 1.200.000</p>
                    </div>
                </div>

                {/* Tabel Pemesanan Terbaru */}
                <div className="bg-white p-6 rounded shadow mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-black">Pemesanan Terbaru</h3>
                    <table className="w-full table-auto border-collapse">
                        <thead>
                            <tr className="bg-gray-200 text-left">
                                <th className="px-4 py-2 text-black">No</th>
                                <th className="px-4 py-2 text-black">Nama Pelanggan</th>
                                <th className="px-4 py-2 text-black">Menu</th>
                                <th className="px-4 py-2 text-black">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t">
                                <td className="px-4 py-2 text-black">1</td>
                                <td className="px-4 py-2 text-black">Yudha Purnama</td>
                                <td className="px-4 py-2 text-black">Martabak Telor</td>
                                <td className="px-4 py-2 text-green-600 font-semibold">Selesai</td>
                            </tr>
                            <tr className="border-t">
                                <td className="px-4 py-2 text-black">2</td>
                                <td className="px-4 py-2 text-black">Siti Aisyah</td>
                                <td className="px-4 py-2 text-black">Martabak Terang Bulan Spesial</td>
                                <td className="px-4 py-2 text-yellow-600 font-semibold">Diproses</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Grafik Placeholder */}
                <div className="bg-white p-6 rounded shadow">
                    <h3 className="text-xl font-semibold mb-4 text-black">Grafik Penjualan</h3>
                    <div className="h-48 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                        Grafik (akan ditampilkan di sini)
                    </div>
                </div>
            </main>
        </div>
    );
}
