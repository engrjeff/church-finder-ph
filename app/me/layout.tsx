import React from 'react';

import UserSidebar from './_components/UserSidebar';

function PersonalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container flex gap-10 py-10">
      <UserSidebar />
      <section className="flex-1">{children}</section>
    </div>
  );
}

export default PersonalLayout;
