'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import SignoutConfirmDialog from './SignoutConfirmDialog';

function UserMenu() {
  const [open, setOpen] = useState(false);
  const session = useSession();

  const user = session.data?.user;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label="menu"
          variant="secondary"
          className="h-auto w-auto gap-3 rounded-full p-1.5"
        >
          <Avatar className="h-6 w-6">
            <AvatarImage src={user?.image!} alt={user?.name!} />
            <AvatarFallback className="bg-primary">
              {user?.name?.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel> {user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup onClick={() => setOpen(false)}>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/me">Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/me/church">My Listings</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup onClick={() => setOpen(false)}>
          <DropdownMenuItem>
            <Link href="/me/church/new">Add My Church</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Favorites</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <SignoutConfirmDialog />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserMenu;
