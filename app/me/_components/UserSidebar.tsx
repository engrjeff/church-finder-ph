import UserDropdownMenu from './UserDropdownMenu';
import UserSideNavigation from './UserSideNavigation';

function UserSidebar() {
  return (
    <nav className="w-[220px] space-y-4">
      <UserDropdownMenu />
      <UserSideNavigation />
    </nav>
  );
}

export default UserSidebar;
