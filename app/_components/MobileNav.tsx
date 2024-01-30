'use client';

import { useState } from 'react';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';

import { siteLinks } from '@/lib/site';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ThemeToggler } from '@/components/theme-toggler';

import Logo from './Logo';
import NavItem from './NavItem';

function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="block lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            aria-label={open ? 'close menu' : 'open menu'}
            variant="ghost"
            size="icon"
          >
            <HamburgerMenuIcon className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader className="text-left">
            <div className="px-4">
              <Logo />
            </div>
            <SheetDescription className="mt-4 pl-4">Menu</SheetDescription>
          </SheetHeader>
          <nav onClick={() => setOpen(false)}>
            <ul className="py-6">
              {siteLinks.map((siteLink) => (
                <li key={`site-link-${siteLink.label}`}>
                  <NavItem
                    href={siteLink.path}
                    className="w-full justify-start px-4 py-6 text-lg"
                  >
                    {siteLink.label}
                  </NavItem>
                </li>
              ))}
            </ul>
          </nav>
          <div className="hidden items-center gap-3 px-4">
            <span>Toggle theme</span>
            <ThemeToggler />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNav;
