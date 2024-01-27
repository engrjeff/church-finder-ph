'use client';

import { FormEventHandler, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { cn } from '@/lib/utils';
import { useProvinceByRegion } from '@/hooks/useProvinceByRegion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button, buttonVariants } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { type ChurchFilters } from '@/app/(site)/services/church';

function ChurchFilterGroup({ filters }: { filters: ChurchFilters }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [selectedRegion, setSelectedRegion] = useState(
    () => searchParams.get('region') ?? undefined
  );

  const { data: provinces } = useProvinceByRegion(selectedRegion);

  const handleApplyFilters: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const queryParams = new URLSearchParams();

    form.forEach((value, key) => {
      queryParams.append(key, value.toString());
    });

    const sort = searchParams.get('sort');

    if (sort) {
      queryParams.set('sort', sort);
    }

    const paramsString = queryParams.toString();

    router.push(
      paramsString.length > 0 ? `${pathname}?${paramsString}` : pathname
    );
  };

  const handleClearFilters = () => {
    setSelectedRegion(undefined);

    const queryParams = new URLSearchParams();

    const sort = searchParams.get('sort');

    if (sort) {
      queryParams.set('sort', sort);
    }

    const paramsString = queryParams.toString();

    router.push(
      paramsString.length > 0 ? `${pathname}?${paramsString}` : pathname
    );
  };

  return (
    <form onSubmit={handleApplyFilters}>
      <div className="flex justify-between">
        <p className="font-medium">Filters</p>
        {searchParams.size > 0 ? (
          <button
            className="text-sm underline hover:no-underline"
            onClick={handleClearFilters}
          >
            Clear Filters
          </button>
        ) : null}
      </div>
      <Accordion type="multiple" className="w-full" defaultValue={['region']}>
        <AccordionItem value="region">
          <AccordionTrigger>Region</AccordionTrigger>
          <AccordionContent>
            <RadioGroup
              key={searchParams.toString()}
              name="region"
              value={selectedRegion}
              onValueChange={setSelectedRegion}
            >
              {filters.region.map((region) => (
                <Label
                  key={`region-filter-${region.region_code}`}
                  htmlFor={region.region_code}
                  className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    'w-full hover:bg-white/10 flex justify-start gap-2 px-2 items-center'
                  )}
                >
                  <RadioGroupItem
                    value={region.region_code}
                    id={region.region_code}
                  />
                  <span>{region.region_name}</span>{' '}
                </Label>
              ))}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="province">
          <AccordionTrigger>Province</AccordionTrigger>
          <AccordionContent>
            {selectedRegion ? (
              <ul>
                {provinces?.map((province) => (
                  <li key={`province-filter-${province.province_code}`}>
                    <Label
                      htmlFor={province.province_code}
                      className={cn(
                        buttonVariants({ variant: 'ghost' }),
                        'w-full hover:bg-white/10 flex justify-start gap-2 px-2 items-center'
                      )}
                    >
                      <Checkbox
                        name="province"
                        defaultChecked={searchParams
                          .getAll('province')
                          ?.includes(province.province_code)}
                        value={province.province_code}
                        id={province.province_code}
                      />
                      <span>{province.province_name}</span>{' '}
                    </Label>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center">Select a region first</p>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button size="lg" className="mt-6 w-full">
        Apply Filters
      </Button>
    </form>
  );
}

export default ChurchFilterGroup;
