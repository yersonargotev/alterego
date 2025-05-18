import { auth } from '@clerk/nextjs/server';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Zap, Code } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import CrabAlteregoAnimation from '@/components/crab-alterego-animation';

export default async function Home() {
  // Get the userId from auth() -- if null, the user is not signed in
  const { userId } = await auth();

  // If user is signed in, redirect to blog page
  if (userId) {
    redirect('/blog');
  }

  // Otherwise, show landing page to encourage login
  return (
    <main className="max-w-7xl mx-auto w-full p-6 pb-16">
      <div className="flex flex-col items-center text-center mb-16">
        <CrabAlteregoAnimation />
        <h1 className="head-text-lg mb-8">
          Find <span className="text-accent">Rust</span> Alternatives for Your Favorite Projects
        </h1>
        <p className="text-xl max-w-3xl mb-10">
          Discover <span className="font-bold">blazingly fast™</span>{' '}
          Rust-powered projects that can replace your current tools with better
          performance and safety.
        </p>
        <Link href="/sign-in">
          <Button size="lg" className="gap-2">
            Sign in to discover alternatives
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="flex flex-col items-center p-6 border rounded-lg">
          <Zap className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-xl font-bold mb-2">High Performance</h3>
          <p className="text-center text-muted-foreground">
            Rust projects deliver C/C++-level speed with the comfort of a modern
            language and zero-cost abstractions.
          </p>
        </div>

        <div className="flex flex-col items-center p-6 border rounded-lg">
          <Shield className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-xl font-bold mb-2">Memory Safety</h3>
          <p className="text-center text-muted-foreground">
            Rust's ownership system ensures safety without sacrificing
            performance or requiring a garbage collector.
          </p>
        </div>

        <div className="flex flex-col items-center p-6 border rounded-lg">
          <Code className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-xl font-bold mb-2">Growing Ecosystem</h3>
          <p className="text-center text-muted-foreground">
            More development tools, web servers, and libraries are being
            rewritten in Rust every day.
          </p>
        </div>
      </div>

      <div className="text-center">
        <p className="italic text-lg mb-4 text-muted-foreground">
          "I use Rust BTW" — Developers who never worry about segfaults or race
          conditions
        </p>
        <p className="font-semibold">
          Join us and discover what Rust alternatives you could be using right
          now.
        </p>
      </div>
    </main>
  );
}
