"use client";
import Link from 'next/link';


export default function Navigation() {
    return (
        <nav className={styles.navigation}>
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/contact">Contact</Link></li>
            </ul>
        </nav>
    );
}