import Link from 'next/link';

import getSession from '@/lib/getServerSession';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { ThemeToggler } from '@/components/theme-toggler';

import Logo from './Logo';
import NavBar from './NavBar';
import UserMenu from './UserMenu';

async function Header() {
  const session = await getSession();

  return (
    <header className="h-16 border-b">
      <div className="container flex h-full items-center">
        <Link href="/" className="mr-10">
          <Logo />
        </Link>
        <NavBar />
        <div className="ml-auto flex items-center gap-4">
          {session ? (
            <UserMenu />
          ) : (
            <Link
              href="/signin"
              className={cn(buttonVariants(), 'rounded-full')}
            >
              Sign In
            </Link>
          )}
          <ThemeToggler />
        </div>
      </div>
    </header>
  );
}

export default Header;
