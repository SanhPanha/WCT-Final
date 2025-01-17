'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/context/context';
import { doCreateUserWithEmailAndPassword, doSignInWithGoogle } from '@/lib/firebase/auth';
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify'; // Import toast for success messages

const Register = () => {
  const router = useRouter();
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { userLoggedIn } = useAuth();

  useEffect(() => {
    if (userLoggedIn) {
      router.replace('/');
    }
  }, [userLoggedIn, router]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isRegistering) {
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match');
        return;
      }

      setIsRegistering(true);
      try {
        await doCreateUserWithEmailAndPassword(email, password);
        toast.success('Successfully registered! Please login.', { position: 'top-center' });
        router.push('/login'); // Navigate after successful registration
      } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
          setErrorMessage('This email is already registered.');
        } else {
          setErrorMessage('Failed to register. Please try again later.');
        }
      } finally {
        setIsRegistering(false);
      }
    }
  };

  const onGoogleSignIn = async (e: any) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithGoogle();
        toast.success('Successfully signed in with Google!', { position: 'top-center' });
        router.push('/'); // Navigate to the home page after Google sign-in
      } catch (err) {
        setErrorMessage('Google sign-in failed. Please try again.');
        setIsSigningIn(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-3xl font-semibold text-center text-gray-700">Create Account</h2>

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-600" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 mt-2 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full px-4 py-3 mt-2 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              autoComplete="new-password"
              disabled={isRegistering}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600" htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full px-4 py-3 mt-2 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              autoComplete="off"
              disabled={isRegistering}
            />
          </div>

          {errorMessage && (
            <div className="text-center text-red-600 font-semibold text-sm mt-2">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isRegistering}
            className={`w-full py-3 text-white font-semibold rounded-md transition duration-300 ${
              isRegistering
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500'
            }`}
          >
            {isRegistering ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="flex items-center justify-center w-full">
          <div className="w-full border-b-2 border-gray-300"></div>
          <span className="mx-2 text-gray-600">OR</span>
          <div className="w-full border-b-2 border-gray-300"></div>
        </div>

        <button
          disabled={isSigningIn}
          onClick={onGoogleSignIn}
          className={`w-full flex items-center justify-center gap-x-3 py-3 border rounded-md text-sm font-semibold transition duration-300 ${
            isSigningIn
              ? 'cursor-not-allowed bg-gray-100'
              : 'bg-gray-50 hover:bg-gray-100 focus:ring-2 focus:ring-indigo-500'
          }`}
        >
          <svg className="w-5 h-5" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
              fill="#4285F4"
            />
            <path
              d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
              fill="#34A853"
            />
            <path
              d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
              fill="#FBBC04"
            />
            <path
              d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
              fill="#EA4335"
            />
          </svg>
          {isSigningIn ? 'Signing In...' : 'Continue with Google'}
        </button>


        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-indigo-600 font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
