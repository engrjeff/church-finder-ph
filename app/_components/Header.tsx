import Link from "next/link";
import NavBar from "./NavBar";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import { ThemeToggler } from "@/components/theme-toggler";
import getSession from "@/lib/getServerSession";
import { buttonVariants } from "@/components/ui/button";

async function Header() {
  const session = await getSession();

  return (
    <header className='h-16 border-b'>
      <div className='container h-full flex items-center'>
        <Link href='/' className='mr-10'>
          <Logo />
        </Link>
        <NavBar />
        <div className='ml-auto flex items-center gap-4'>
          <ThemeToggler />
          {session ? (
            <UserMenu />
          ) : (
            <Link href='/signin' className={buttonVariants()}>
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
