import { GridIcon, ReaderIcon } from '@radix-ui/react-icons';

import UserSideNavLink from './UserSideNavLink';

const userNavItems = [
  {
    label: 'Listings',
    href: '/me/church',
    icon: <GridIcon className="mr-3 size-4" />,
  },
  {
    label: 'Reviews',
    href: '/me/reviews',
    icon: <ReaderIcon className="mr-3 size-4" />,
  },
];

function UserSideNavigation() {
  return (
    <ul className="space-y-2">
      {userNavItems.map((navItem) => (
        <li key={`user-nav-${navItem.label}`}>
          <UserSideNavLink href={navItem.href}>
            <span>{navItem.icon}</span>
            <span>{navItem.label}</span>
          </UserSideNavLink>
        </li>
      ))}
    </ul>
  );
}

export default UserSideNavigation;
