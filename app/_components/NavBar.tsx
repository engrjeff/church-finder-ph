import { siteLinks } from '@/lib/site';

import NavItem from './NavItem';

async function NavBar() {
  return (
    <nav className="hidden h-full items-center justify-between lg:flex">
      <ul className="flex items-center gap-2">
        {siteLinks.map((siteLink) => (
          <li key={`site-link-${siteLink.label}`}>
            <NavItem href={siteLink.path}>{siteLink.label}</NavItem>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;
