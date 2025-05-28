import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { getAuth, signOut } from "firebase/auth";
import app from "../lib/firebase";
import { FiHome, FiMessageCircle, FiCheckCircle, FiMenu, FiX } from "react-icons/fi";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const router = useRouter();
    const auth = getAuth(app);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push("/login");
        } catch (error) {
            console.error("Gagal logout:", error);
        }
    };

    const menuItems = [
        { name: "Dashboard", href: "/dashboard", icon: <FiHome size={20} /> },
        { name: "Pesan", href: "/dashboard/pesan", icon: <FiMessageCircle size={20} /> },
        { name: "Status", href: "/dashboard/status-pemesanan", icon: <FiCheckCircle size={20} /> },
    ];

    return (
        <div className="flex">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 bg-gray-800 text-white fixed top-4 left-4 z-50 rounded flex items-center justify-center"
                aria-label={isOpen ? "Tutup menu" : "Buka menu"}
            >
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            {isOpen && (
                <div className="w-64 h-screen bg-gray-800 text-white p-6 fixed top-0 left-0 z-40 flex flex-col">
                    <h1 className="text-2xl font-bold mb-8">Admin</h1>
                    <nav className="flex flex-col space-y-4 flex-grow">
                        {menuItems.map(({ name, href, icon }) => (
                            <Link
                                key={name}
                                href={href}
                                className={`flex items-center space-x-3 p-2 rounded hover:bg-gray-700 transition-colors ${router.pathname === href ? "bg-gray-700" : ""
                                    }`}
                            >
                                <span>{icon}</span>
                                <span className="text-lg">{name}</span>
                            </Link>
                        ))}
                    </nav>

                    <button
                        onClick={handleLogout}
                        className="mt-auto w-full bg-red-600 text-white p-3 rounded hover:bg-red-700 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}
