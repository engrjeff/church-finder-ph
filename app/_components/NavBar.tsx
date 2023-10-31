import { siteLinks } from '@/lib/site';

import NavItem from './NavItem';

async function NavBar() {
  return (
    <nav className="flex h-full items-center justify-between">
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
