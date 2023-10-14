import { ThemeToggler } from "@/components/theme-toggler";
import { Button, buttonVariants } from "@/components/ui/button";
import getSession from "@/lib/getServerSession";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";

async function NavBar() {
  const session = await getSession();

  return (
    <nav className='flex justify-between h-full items-center'>
      <span>Logo</span>

      <ul className='flex items-center gap-6'>
        <li>
          <Link href='/'>Churches</Link>
        </li>
        <li>
          <Link href='/'>About</Link>
        </li>
        <li>
          <Link href='/'>Contact Us</Link>
        </li>
      </ul>

      <div className='flex items-center gap-4'>
        <Link href='/me' className={buttonVariants({ variant: "outline" })}>
          <PlusIcon className='mr-2' />
          Add My Church
        </Link>
        {session?.user ? (
          <Link href='/api/auth/signout'>Log Out</Link>
        ) : (
          <Link href='/signin'>Sign In</Link>
        )}
        <ThemeToggler />
      </div>
    </nav>
  );
}

export default NavBar;
