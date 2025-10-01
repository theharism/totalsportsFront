import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Head from 'next/head';

export default function NotFound() {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
        <div className="space-y-6 max-w-md mx-auto">
          <div className="space-y-2">
            <h1 className="text-6xl font-bold text-primary">404</h1>
            <h2 className="text-3xl font-semibold tracking-tight">Page Not Found</h2>
            <p className="text-muted-foreground">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/">
                Return Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
