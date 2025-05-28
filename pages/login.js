import { useState } from "react";
import { auth, db } from "../lib/firebase";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [info, setInfo] = useState("");
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setInfo("");

        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            const user = res.user;

            // Ambil role user dari Firestore
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (!userDoc.exists()) {
                setError("Data user tidak ditemukan!");
                return;
            }

            const userData = userDoc.data();
            console.log("Login berhasil:", user.email, "Role:", userData.role);

            // Redirect sesuai role
            if (userData.role === "admin") {
                router.push("/dashboard/admin");
            } else {
                router.push("/dashboard/customer");
            }
        } catch (err) {
            console.error("Login error:", err.message);
            setError("Login gagal. Cek email dan password.");
        }
    };

    const handleForgotPassword = async () => {
        setError("");
        setInfo("");
        if (!email) {
            setError("Masukkan email untuk reset password.");
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            setInfo("Email reset password sudah dikirim. Periksa inbox/spam Anda.");
        } catch (err) {
            setError("Gagal mengirim email reset: " + err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-600 px-4">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
            >
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Login</h2>

                <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="Masukkan email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 mb-4 border border-gray-300 rounded bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                />

                <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
                    Password
                </label>
                <div className="relative mb-6">
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Masukkan password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-indigo-600 font-semibold"
                    >
                        {showPassword ? "Sembunyikan" : "Lihat"}
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white font-semibold py-3 rounded hover:bg-indigo-700 transition-colors"
                >
                    Login
                </button>

                {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
                {info && <p className="text-green-600 mt-4 text-center">{info}</p>}

                <p
                    onClick={handleForgotPassword}
                    className="mt-4 text-indigo-700 cursor-pointer text-center hover:underline"
                >
                    Lupa Password?
                </p>
            </form>
        </div>
    );
}
