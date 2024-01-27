'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

function SearchChurchField() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-12 w-[80%] rounded-full text-base">
          Find a Church <MagnifyingGlassIcon className="ml-3 size-5" />{' '}
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0">
        <Command className="rounded-lg shadow-md">
          <CommandInput placeholder="Search for a church..." className="h-14" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem className="h-10">
                <span>Churches near me</span>
              </CommandItem>
              <CommandItem className="h-10">
                <span>Churches in Metro Manila</span>
              </CommandItem>
              <CommandItem className="h-10">
                <span>Most reviewed</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

export default SearchChurchField;
