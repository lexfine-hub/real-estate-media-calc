import { Suspense } from 'react';
import SignInContent from './signin-content';

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-slate-600">Loading...</div>
      </div>
    }>
      <SignInContent />
    </Suspense>
  );
}
