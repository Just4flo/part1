import { useEffect, useState } from "react";
import { db, auth } from "../../../../lib/firebase";
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";

export default function OrderPage() {
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState(null);
    const router = useRouter();

    // Cek login
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push("/login");
            } else {
                setUser(user);
            }
        });

        return () => unsubscribe();
    }, []);

    // Ambil produk dari Firestore (atau dummy dulu)
    useEffect(() => {
        const fetchProducts = async () => {
            // Dummy produk
            const dummy = [
                { id: "1", name: "Jasa Cuci AC", price: 100000 },
                { id: "2", name: "Servis Komputer", price: 150000 },
            ];
            setProducts(dummy);

            // Kalau pakai Firestore, ganti dengan ini:
            /*
            const querySnapshot = await getDocs(collection(db, "products"));
            const fetched = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProducts(fetched);
            */
        };

        fetchProducts();
    }, []);

    const handleOrder = async (product) => {
        try {
            await addDoc(collection(db, "orders"), {
                userId: user.uid,
                productId: product.id,
                productName: product.name,
                price: product.price,
                quantity: 1,
                status: "pending",
                timestamp: serverTimestamp(),
            });
            alert("Pemesanan berhasil!");
        } catch (err) {
            console.error("Gagal memesan:", err);
            alert("Terjadi kesalahan saat memesan.");
        }
    };

    return (
        <div className="min-h-screen bg-white text-black p-6">
            <h1 className="text-xl font-bold mb-4">Pesan Produk / Jasa</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                    <div key={product.id} className="border rounded p-4 shadow hover:shadow-lg">
                        <h2 className="text-lg font-semibold">{product.name}</h2>
                        <p className="text-sm text-gray-700">Rp{product.price.toLocaleString()}</p>
                        <button
                            onClick={() => handleOrder(product)}
                            className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Pesan Sekarang
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
