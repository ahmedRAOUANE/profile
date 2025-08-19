import Link from 'next/link';
import { Logo, Plus, QRCode, Share } from '../components/UI/icons';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Logo className='w-8 h-8 rounded-lg'/>
              <span className="text-xl font-bold text-foreground">ProfileQR</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link>
              <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How it works</Link>
              <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">Login</Link>
              <Link href="/signup" className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">Get Started</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Your Digital Identity
              <span className="text-primary block">In One QR Code</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Create your personal profile, add all your social media links, and generate a unique QR code.
              Share it anywhere - business cards, social media, or in person. One scan connects to everything.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors">
                Create Your Profile
              </Link>

              <Link href="#how-it-works" className="border border-border text-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-muted transition-colors">
                See How It Works
              </Link>
            </div>
          </div>
        </div>

        {/* QR Code Preview */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="flex justify-center">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
              <div className="w-48 h-48 bg-muted rounded-xl flex items-center justify-center mb-4">
                <div className="w-32 h-32 bg-foreground rounded-lg flex items-center justify-center">
                  <span className="text-background text-2xl font-bold">QR</span>
                </div>
              </div>

              <p className="text-center text-muted-foreground">Your unique QR code</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need
            </h2>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple, powerful, and designed for the modern world
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Plus className="w-6 h-6 text-primary" />
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-2">Easy Setup</h3>
              <p className="text-muted-foreground">Create your profile in minutes. Add your social media links and customize your appearance.</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <QRCode className="w-6 h-6 text-secondary" />
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-2">QR Generation</h3>
              <p className="text-muted-foreground">Instantly generate a unique QR code that links directly to your profile page.</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Share className="w-6 h-6 text-accent" />
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-2">Share Anywhere</h3>
              <p className="text-muted-foreground">Print on business cards, share on social media, or display anywhere. One scan connects to all your links.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to create your digital identity
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Create Account</h3>
              <p className="text-muted-foreground">Sign up and create your personal profile in just a few clicks.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Add Your Links</h3>
              <p className="text-muted-foreground">Add all your social media profiles, websites, and contact information.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Generate & Share</h3>
              <p className="text-muted-foreground">Get your unique QR code and share it anywhere you want to connect.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Create Your Digital Identity?
          </h2>

          <p className="text-xl mb-8 opacity-90">
            Join thousands of people who are already sharing their profiles with QR codes
          </p>

          <Link href="/signup" className="bg-primary-foreground text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-foreground/90 transition-colors inline-block">
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">P</span>
              </div>

              <span className="text-lg font-bold text-foreground">ProfileQR</span>
            </div>
            
            <div className="flex space-x-6 text-muted-foreground">
              <Link href="/login" className="hover:text-foreground transition-colors">Login</Link>
              <Link href="/signup" className="hover:text-foreground transition-colors">Sign Up</Link>
              <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground">
            <p>&copy; 2024 ProfileQR. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
