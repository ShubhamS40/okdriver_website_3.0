'use client';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import logo_black from '../../../../public/assets/okdriverblack_logo.png';

export default function UserLoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.backendId) {
      router.push('/user/dashboard');
    }
  }, [session, router]);

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/user/dashboard' });
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 relative overflow-hidden">
      
      {/* Background Accent Circles */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-black/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-gray-400/10 rounded-full blur-3xl"></div>

      {/* Back Button */}
      <button
        onClick={() => router.push('/')}
        className="absolute top-6 left-6 flex items-center text-gray-600 hover:text-black transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back
      </button>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md mx-auto text-center relative z-10"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
            <Image
              src={logo_black}
              alt="OKDriver"
              width={40}
              height={40}
              className="invert"
            />
          </div>
        </motion.div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome Back 👋
        </h1>
        <p className="text-gray-600 mb-8">
          Sign in to continue to your OKDriver account
        </p>

        {/* Google Sign In Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGoogleSignIn}
          className="w-full cursor-pointer flex items-center justify-center gap-3 px-4 py-3 bg-white border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span className="text-gray-800 font-medium">Continue with Google</span>
        </motion.button>

      

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-8">
          By continuing, you agree to OKDriver’s{' '}
          <a href="/terms" className="underline hover:text-black">Terms of Service</a> and{' '}
          <a href="/privacy" className="underline hover:text-black">Privacy Policy</a>.
        </p>
      </motion.div>
    </div>
  );
}
