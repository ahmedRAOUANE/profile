import Link from 'next/link'
import React from 'react'
import { Logo } from './icons'

const Header = async () => {
    return (
        <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-2">
                        <Logo className='w-8 h-8 rounded-lg' />
                        <span className="text-xl font-bold text-foreground">ProfileQR</span>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link>
                        <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How it works</Link>
                        <Link href="/dashboard" className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">Get Started</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header