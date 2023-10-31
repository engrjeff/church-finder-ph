import Image from 'next/image';

function Logo() {
  return (
    <>
      <Image
        src="/logos/church-finder-white-text.svg"
        alt="Church Finder PH logo"
        width={150}
        height={40}
        className="hidden h-12 w-[150px] object-cover dark:inline"
      />
      <Image
        src="/logos/church-finder-black-text.svg"
        alt="Church Finder PH logo"
        width={150}
        height={40}
        className="h-12 w-[150px] object-cover dark:hidden"
      />
    </>
  );
}

export default Logo;
