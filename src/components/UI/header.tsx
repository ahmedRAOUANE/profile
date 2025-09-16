"use client";

import Link from 'next/link'
import React, { useState } from 'react'
import { Logo } from './icons'
import { MdClose, MdMenu } from 'react-icons/md';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    return (
        <nav className="border-b border-border bg-card/90 backdrop-blur-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and brand */}
                    <div className="flex items-center space-x-2">
                        <Logo className='w-8 h-8 rounded-lg' />
                        <span className="text-xl font-bold text-foreground">ProfileQR</span>
                    </div>

                    {/* Desktop navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link>
                        <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How it works</Link>
                        <Link href="/auth/login" className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">Get Started</Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            type='button'
                            onClick={toggleMenu}
                            className="cursor-pointer inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                        >
                            <span className="sr-only">Toggle main menu</span>
                            {isMenuOpen ? (
                                <MdClose className='text-2xl' />
                            ) : (
                                <MdMenu className='text-2xl' />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu overlay */}
            <div
                className={`h-screen fixed inset-0 md:hidden z-40 transition-opacity duration-300 ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={toggleMenu}
            >
                {/* Slide-down panel */}
                <div
                    className={`absolute top-16 left-0 w-full bg-card/90 shadow-2xl border-b border-border transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-y-0" : "-translate-y-full"}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex flex-col p-4 space-y-4">
                        <Link
                            href="#features"
                            className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-base font-medium transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Features
                        </Link>
                        <Link
                            href="#how-it-works"
                            className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-base font-medium transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            How it works
                        </Link>
                        <Link
                            href="/dashboard"
                            className="bg-primary text-primary-foreground px-3 py-2 rounded-md text-base font-medium text-center hover:bg-primary/90 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header
