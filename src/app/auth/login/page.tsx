import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { Logo } from '@/components/UI/icons';
import LoginForm from '@/components/login-form';

const LoginPage = () => {

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <FiArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Login Card */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <Logo className="w-12 h-12 mb-4 rounded-xl" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Sign in to your account</h1>
            <p className="text-muted-foreground">
              Enter your email and password to access your ProfileQR dashboard
            </p>
          </div>

          {/* Email/Password Form */}
          <LoginForm />

          {/* Future Google Login (disabled for now) */}
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Or sign in with Google (coming soon 🚀)
            </p>
          </div>

          {/* Signup Link */}
          <div className="text-center mt-6">
            <p className="text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/auth/signup" className="text-primary hover:text-primary/90 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Terms */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            By signing in, you agree to our{' '}
            <Link href="/terms" className="text-primary hover:text-primary/90">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-primary hover:text-primary/90">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
