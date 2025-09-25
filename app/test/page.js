import Link from 'next/link';

export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">✅ Deployment Working!</h1>
        <p className="text-gray-600 mb-4">
          Your Vercel deployment is working correctly.
        </p>
        <div className="space-y-2 text-sm text-gray-500">
          <p>Environment: {process.env.NODE_ENV}</p>
          <p>NextAuth URL: {process.env.NEXTAUTH_URL || 'Not set'}</p>
          <p>Trust Host: {process.env.NEXT_PUBLIC_TRUST_HOST || 'Not set'}</p>
        </div>
        <div className="mt-6">
          <Link 
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
