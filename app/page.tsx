import { ThemeToggler } from "@/components/theme-toggler";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Church Finder PH</h1>
      <ThemeToggler />
      <Link href='/signin'>Sign In</Link>
      <Link href='/register'>Register</Link>
    </main>
  );
}
