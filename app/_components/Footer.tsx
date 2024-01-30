import Link from 'next/link';

function Footer() {
  return (
    <footer className="border-t bg-background/80 shadow">
      <div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            href="/"
            className="mb-4 flex items-center space-x-3 sm:mb-0 rtl:space-x-reverse"
          >
            <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
              Church Finder PH
            </span>
          </Link>
          <ul className="mb-6 flex flex-wrap items-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:mb-0">
            <li>
              <Link href="/about" className="me-4 hover:underline md:me-6">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="me-4 hover:underline md:me-6">
                Contact
              </Link>
            </li>
            <li>
              <a href="/faq" className="hover:underline">
                FAQs
              </a>
            </li>
          </ul>
        </div>
        <span className="block text-sm text-gray-400 sm:text-center">
          © {new Date().getFullYear()}{' '}
          <Link href="/" className="hover:underline">
            Church Finder PH
          </Link>
          . All Rights Reserved.
        </span>
        <p className="text-center text-sm text-gray-400">
          Made by{' '}
          <a
            href="http://jeffsegovia.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Jeff Segovia
          </a>
        </p>
      </div>

      <div className="container max-w-screen-xl text-sm"></div>
    </footer>
  );
}

export default Footer;
