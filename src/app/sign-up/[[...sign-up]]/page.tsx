'use client';

import { SignUp } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';
import { dark } from '@clerk/themes';

export default function Page() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect_url');

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-background">
      <div className="w-full max-w-md rounded-lg border border-card bg-card text-card-foreground shadow-sm">
        <div className="p-6">
          <h2 className="text-2xl font-semibold font-heading tracking-tight text-primary mb-6 text-center">
            Sign Up
          </h2>
          <SignUp
            appearance={{
              baseTheme: dark,
              elements: {
                formButtonPrimary: 'bg-primary hover:bg-primary/90 text-primary-foreground transition-colors duration-200',
                card: 'shadow-none bg-transparent',
                headerTitle: 'hidden',
                headerSubtitle: 'hidden',
                formFieldLabel: 'text-muted-foreground',
                formFieldInput: 'bg-input border-input',
                footerActionLink: 'text-primary hover:text-primary/90 transition-colors',
                socialButtonsBlockButton: 'border border-input bg-background hover:bg-muted transition-colors',
                dividerLine: 'bg-border',
                dividerText: 'text-muted-foreground',
              }
            }}
            fallbackRedirectUrl={redirectUrl || '/dashboard'}
          />
        </div>
      </div>
    </div>
  );
}
