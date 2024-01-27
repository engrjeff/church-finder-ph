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
          className="size-auto gap-3 rounded-full p-1.5"
        >
          <Avatar className="size-6">
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
          <DropdownMenuItem asChild>
            <Link href="/me" className="block">
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/me/church" className="block">
              My Listings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup onClick={() => setOpen(false)}>
          <DropdownMenuItem asChild>
            <Link href="/me/church/new" className="block">
              Add My Church
            </Link>
          </DropdownMenuItem>
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
