import Link from 'next/link';

import getSession from '@/lib/getServerSession';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { ThemeToggler } from '@/components/theme-toggler';

import Logo from './Logo';
import MobileNav from './MobileNav';
import NavBar from './NavBar';
import UserMenu from './UserMenu';

async function Header() {
  const session = await getSession();

  return (
    <header className="h-16 border-b">
      <div className="container flex h-full items-center px-4">
        <MobileNav />
        <Link href="/" className="ml-4 md:ml-0 md:mr-10">
          <Logo />
        </Link>
        <NavBar />
        <div className="ml-auto flex items-center gap-2 md:gap-4">
          <div className="hidden md:block">
            <ThemeToggler />
          </div>
          {session ? (
            <UserMenu />
          ) : (
            <>
              <Link
                href="/register"
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'rounded-full hidden md:inline'
                )}
              >
                Register
              </Link>
              <Link
                href="/signin"
                className={cn(buttonVariants(), 'rounded-full')}
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
