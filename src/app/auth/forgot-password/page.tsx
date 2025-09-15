'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiMail, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import { Logo } from '@/components/UI/icons';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    // Clear error when user starts typing
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Implement actual password reset logic here
      console.log('Password reset for email:', email);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Show success state
      setIsSubmitted(true);

    } catch (error) {
      console.error('Password reset error:', error);
      setErrors({ general: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement resend logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Could show a toast notification here
    } catch (error) {
      console.log("forgot password error: ", error)
      setErrors({ general: 'Failed to resend email. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Login */}
        <div className="mb-8">
          <Link
            href="/login"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <FiArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Link>
        </div>

        {/* Forgot Password Card */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <Logo className='w-12 h-12 mb-4 rounded-xl' />
            <h1 className="text-2xl font-bold text-foreground mb-2">Reset Password</h1>
            <p className="text-muted-foreground">
              Enter your email address and we&apis;ll send you a link to reset your password
            </p>
          </div>

          {!isSubmitted ? (
            /* Reset Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-colors ${errors.email
                      ? 'border-red-500 bg-red-50 dark:bg-red-950'
                      : 'border-border bg-background'
                      }`}
                    placeholder="Enter your email address"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* General Error */}
              {errors.general && (
                <div className="p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-sm text-red-600 dark:text-red-400">{errors.general}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="cursor-pointer w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          ) : (
            /* Success State */
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <FiCheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-2">Check Your Email</h2>
                <p className="text-muted-foreground mb-4">
                    We&apos;ve sent a password reset link to <span className="font-medium text-foreground">{email}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Click the link in the email to reset your password. The link will expire in 1 hour.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleResendEmail}
                  disabled={isLoading}
                  className="cursor-pointer w-full border border-border text-foreground py-3 px-4 rounded-lg font-semibold hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? 'Sending...' : 'Resend Email'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setEmail('');
                    setErrors({});
                  }}
                  className="cursor-pointer w-full text-primary hover:text-primary/90 font-medium"
                >
                  Use a different email address
                </button>
              </div>
            </div>
          )}

          {/* Additional Help */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                Don&apos;t see the email? Check your spam folder or{' '}
                <button
                  type="button"
                  onClick={handleResendEmail}
                  disabled={isLoading}
                  className="text-primary hover:text-primary/90 font-medium"
                >
                  try a different email address
                </button>
              </p>

              <p className="text-sm text-muted-foreground">
                Still having trouble?{' '}
                <Link href="/contact" className="text-primary hover:text-primary/90 font-medium">
                  Contact support
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Terms */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            By requesting a password reset, you agree to our{' '}
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

export default ForgotPasswordPage;