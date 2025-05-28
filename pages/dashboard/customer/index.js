import { useEffect, useState } from "react";
import { auth, db } from "../../../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import Navbar from "@/components/Navbar"; // Ganti Sidebar dengan Navbar

export default function CustomerDashboard() {
    const [userData, setUserData] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserData({ uid: user.uid, ...docSnap.data() });
                } else {
                    router.push("/login");
                }
            } else {
                router.push("/login");
            }
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        router.push("/login");
    };

    if (!userData) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div>
            <Navbar /> {/* Navbar seperti Home */}
            <main className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Dashboard Pelanggan</h1>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>

                <p className="text-lg mb-6">
                    Selamat datang,{" "}
                    <span className="font-semibold">{userData.name || userData.email}</span> 👋
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="bg-blue-100 p-4 rounded">
                        <h2 className="text-lg font-semibold mb-2 text-black">Pesan Produk / Jasa</h2>
                        <p className="text-sm text-black">Lanjutkan ke halaman pemesanan produk atau jasa.</p>
                        <button
                            onClick={() => router.push("/dashboard/customer/order")}
                            className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Pesan Sekarang
                        </button>
                    </div>

                    <div className="bg-green-100 p-4 rounded">
                        <h2 className="text-lg font-semibold mb-2 text-black">Status Pesanan</h2>
                        <p className="text-sm text-black">Belum ada pesanan aktif.</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
