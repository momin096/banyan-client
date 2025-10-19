import React, { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="bg-background text-foreground shadow-2xl  w-full z-50">
            <div className="container mx-auto flex justify-between items-center p-4">
                <h1 className="text-2xl font-bold">BANYAN</h1>

                {/* Desktop Links */}
                <div className="hidden md:flex space-x-6">
                    <a href="#" className="hover:text-[var(--primary)] transition">
                        Home
                    </a>
                    <a href="#" className="hover:text-[var(--primary)] transition">
                        Products
                    </a>
                    <a href="#" className="hover:text-[var(--primary)] transition">
                        About
                    </a>
                    <a href="#" className="hover:text-[var(--primary)] transition">
                        Contact
                    </a>
                </div>

                {/* Mobile Toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </Button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div
                    ref={menuRef}
                    className="md:hidden bg-[var(--background)] border-t border-[var(--border)] flex flex-col items-center py-4 space-y-3"
                >
                    <a
                        href="#"
                        className="hover:text-[var(--primary)] transition"
                        onClick={() => setIsOpen(false)}
                    >
                        Home
                    </a>
                    <a
                        href="#"
                        className="hover:text-[var(--primary)] transition"
                        onClick={() => setIsOpen(false)}
                    >
                        Products
                    </a>
                    <a
                        href="#"
                        className="hover:text-[var(--primary)] transition"
                        onClick={() => setIsOpen(false)}
                    >
                        About
                    </a>
                    <a
                        href="#"
                        className="hover:text-[var(--primary)] transition"
                        onClick={() => setIsOpen(false)}
                    >
                        Contact
                    </a>
                </div>
            )}
        </nav>
    );
}
