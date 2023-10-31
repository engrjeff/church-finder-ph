import UserSideNavLink from './UserSideNavLink';

const userNavItems = [
  { label: 'Listings', href: '/me/church' },
  { label: 'Reviews', href: '/me/reviews' },
];

function UserSideNavigation() {
  return (
    <ul className="space-y-2">
      {userNavItems.map((navItem) => (
        <li key={`user-nav-${navItem.label}`}>
          <UserSideNavLink href={navItem.href}>{navItem.label}</UserSideNavLink>
        </li>
      ))}
    </ul>
  );
}

export default UserSideNavigation;
