import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

async function NavBar() {
  return (
    <nav className='flex justify-between h-full items-center'>
      <ul className='flex items-center gap-2'>
        <li>
          <Link className={buttonVariants({ variant: "ghost" })} href='/'>
            Churches
          </Link>
        </li>
        <li>
          <Link className={buttonVariants({ variant: "ghost" })} href='/about'>
            About
          </Link>
        </li>
        <li>
          <Link
            className={buttonVariants({ variant: "ghost" })}
            href='/contact'
          >
            Contact Us
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
