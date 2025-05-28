import { useEffect, useState } from "react";
import { db, auth } from "../../../../lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";

export default function OrderStatusPage() {
    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                router.push("/login");
            } else {
                setUser(user);
                fetchOrders(user.uid);
            }
        });

        return () => unsubscribe();
    }, []);

    const fetchOrders = async (userId) => {
        const q = query(collection(db, "orders"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        const userOrders = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setOrders(userOrders);
    };

    return (
        <div className="min-h-screen bg-white text-black p-6">
            <h1 className="text-xl font-bold mb-4">Status Pemesanan Anda</h1>
            {orders.length === 0 ? (
                <p>Belum ada pemesanan.</p>
            ) : (
                <div className="grid gap-4">
                    {orders.map((order) => (
                        <div key={order.id} className="border rounded p-4 shadow">
                            <h2 className="text-lg font-semibold">{order.productName}</h2>
                            <p>Harga: Rp{order.price.toLocaleString()}</p>
                            <p>Status: <span className="font-semibold">{order.status}</span></p>
                            <p>Tanggal: {order.timestamp?.toDate().toLocaleString() || "Belum tersedia"}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
