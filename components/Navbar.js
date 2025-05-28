import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const user = localStorage.getItem('user');
        setIsLoggedIn(!!user);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user'); // atau hapus token
        router.push('/login');
    };

    if (!mounted) return null;

    return (
        <nav className="bg-black text-white p-4 flex justify-between">
            <span className="font-bold text-lg">Pemesanan Online</span>
            <div className="space-x-4">
                <Link href="/">Home</Link>
                <Link href="/dashboard/menu">Menu</Link>
                {isLoggedIn ? (
                    <>
                        <Link href="/dashboard/pesan">Pesan</Link>
                        <Link href="/dashboard/status-pemesanan">Status</Link>
                        <button onClick={handleLogout} className="ml-2 underline">Logout</button>
                    </>
                ) : (
                    <Link href="/login">Login</Link>
                )}
            </div>
        </nav>
    );
}
