import Link from 'next/link';

function Footer() {
  return (
    <footer className="m-4 rounded-lg bg-slate-900 shadow">
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
              <Link href="faq" className="me-4 hover:underline md:me-6">
                FAQs
              </Link>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-500 dark:text-gray-400 sm:text-center">
          © {new Date().getFullYear()}{' '}
          <a href="https://flowbite.com/" className="hover:underline">
            Church Finder PH
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
