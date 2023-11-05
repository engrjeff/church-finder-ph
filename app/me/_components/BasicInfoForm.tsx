'use client';

import React, { useState } from 'react';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import {
  Barangay,
  City,
  getBarangaysByCity,
  getCitiesByProvince,
  getProvincesByRegion,
  getRegions,
  Province,
  Region,
} from '@/lib/address';
import { churchApi } from '@/lib/apiClient';
import { arrayToMap, cn, errorHandler } from '@/lib/utils';
import { basicInfoSchema, type BasicInfoData } from '@/lib/validations/church';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Autocomplete from '@/components/autocomplete';
import AvatarPicker from '@/components/avatar-picker';

import CreateChurchSuccessDialog from './CreateChurchSuccessDialog';

const defaultValues: BasicInfoData = {
  name: '',
  welcome_message: '',
  logo: '',
  region: '',
  province: '',
  city: '',
  barangay: '',
  street: '',
  full_address: '',
  status: 'DRAFT',
};

function BasicInfoForm({ basicInfoData }: { basicInfoData?: BasicInfoData }) {
  const form = useForm<BasicInfoData>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: basicInfoData ? basicInfoData : defaultValues,
    mode: 'onChange',
  });

  const [savingStatus, setSavingStatus] = useState<
    'idle' | 'saving' | 'saving-exit'
  >('idle');

  const isLoading = savingStatus !== 'idle';

  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [newChurchId, setNewChurchId] = useState<string>();

  const church_id = params.id;

  const [regions, setRegions] = useState<Region[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [barangays, setBarangays] = useState<Barangay[]>([]);

  const currentRegion = form.watch('region');
  const currentProvince = form.watch('province');
  const currentCity = form.watch('city');
  const currentBarangay = form.watch('barangay');
  const street = form.watch('street');

  const getFullAddress = () => {
    const regionName = arrayToMap(regions, 'region_code', 'region_name').get(
      currentRegion
    );
    const provinceName = arrayToMap(
      provinces,
      'province_code',
      'province_name'
    ).get(currentProvince);
    const cityName = arrayToMap(cities, 'city_code', 'city_name').get(
      currentCity
    );
    const barangayName = arrayToMap(barangays, 'brgy_code', 'brgy_name').get(
      currentBarangay
    );

    const full_address = [
      street,
      barangayName,
      cityName,
      provinceName,
      regionName,
    ].join(', ');

    return full_address;
  };

  React.useEffect(() => {
    const updateOptions = async () => {
      const regionsArr = await getRegions();
      const citiesArr = await getCitiesByProvince(currentProvince);
      const barangaysArr = await getBarangaysByCity(currentCity);
      const provincesArr = await getProvincesByRegion(currentRegion);

      setRegions(regionsArr);
      setProvinces(provincesArr);
      setCities(citiesArr);
      setBarangays(barangaysArr);
    };

    updateOptions();
  }, [currentProvince, currentRegion, currentCity]);

  const executeCreateChurch = async (data: BasicInfoData) => {
    const result = await churchApi.basicInfo.create(data);

    if (result.data.status === 'success') {
      const churchId = result.data.data.id;

      form.reset();

      setNewChurchId(churchId);

      revalidatePath('/me/church');
    }
  };

  const executeUpdateChurch = async (data: BasicInfoData) => {
    const result = await churchApi.basicInfo.update(church_id, data);

    console.log(result);

    if (result.data.status === 'success') {
      toast.success('Update successful!');

      router.push(`/me/church/${church_id}/edit?step=church-profile`);

      router.refresh();
    }
  };

  const handleSaveAndExit = async () => {
    try {
      if (!church_id) return;

      setSavingStatus('saving-exit');

      const values = form.getValues();
      const full_address = getFullAddress();

      const data = {
        ...values,
        full_address,
      };

      const result = await churchApi.basicInfo.update(church_id, data);

      if (result.data.status === 'success') {
        toast.success('Update successful!');

        router.push(`/me/church`);
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setSavingStatus('idle');
    }
  };

  const onSubmit: SubmitHandler<BasicInfoData> = async (values) => {
    try {
      setSavingStatus('saving');
      const full_address = getFullAddress();

      const data = {
        ...values,
        full_address,
      };

      if (church_id) {
        await executeUpdateChurch(data);
      } else {
        await executeCreateChurch(data);
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setSavingStatus('idle');
    }
  };

  const onError: SubmitErrorHandler<BasicInfoData> = (err) => {
    console.log(err);
  };

  return (
    <>
      <CreateChurchSuccessDialog
        churchId={newChurchId}
        open={Boolean(newChurchId)}
      />
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle>Basic Info</CardTitle>
          <CardDescription>
            Get started by adding some basic details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onError)}>
              <fieldset className="space-y-6" disabled={isLoading}>
                <FormField
                  control={form.control}
                  name="logo"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <AvatarPicker
                          src={field.value === null ? undefined : field.value}
                          label="Church Logo"
                          desc="Upload a church logo"
                          onAfterUpload={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Church Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="The name of your church"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="space-y-3">
                  <Label>Church Address</Label>
                  <div className="flex flex-col gap-4 md:flex-row">
                    <FormField
                      control={form.control}
                      name="region"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormDescription>Region</FormDescription>
                          <Autocomplete
                            searchText="Search region..."
                            placeholderText="Select a region"
                            value={field.value}
                            onChange={(value) => {
                              field.onChange(value);
                              form.setValue('province', '');
                              form.setValue('city', '');
                              form.setValue('barangay', '');
                            }}
                            options={regions.map((i) => ({
                              value: i.region_code,
                              label: i.region_name,
                            }))}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="province"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormDescription>Province</FormDescription>
                          <Autocomplete
                            searchText="Search province..."
                            placeholderText="Select a province"
                            value={field.value}
                            onChange={(value) => {
                              field.onChange(value);
                              form.setValue('city', '');
                              form.setValue('barangay', '');
                            }}
                            options={provinces.map((i) => ({
                              value: i.province_code,
                              label: i.province_name,
                            }))}
                            disabled={!currentRegion}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col gap-4 md:flex-row">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormDescription>Town</FormDescription>
                          <Autocomplete
                            searchText="Search town/city..."
                            placeholderText="Select a town/city"
                            value={field.value}
                            onChange={(value) => {
                              field.onChange(value);
                              form.setValue('barangay', '');
                            }}
                            options={cities.map((i) => ({
                              value: i.city_code,
                              label: i.city_name,
                            }))}
                            disabled={!currentProvince}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="barangay"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormDescription>Barangay</FormDescription>
                          <Autocomplete
                            searchText="Search barangay..."
                            placeholderText="Select a barangay"
                            value={field.value}
                            onChange={field.onChange}
                            options={barangays.map((i) => ({
                              value: i.brgy_code,
                              label: i.brgy_name,
                            }))}
                            disabled={!currentCity}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                      <FormItem>
                        <FormDescription>Street Address</FormDescription>
                        <FormControl>
                          <Textarea
                            rows={4}
                            placeholder="e.g. Church Street"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="full_address"
                  render={({ field }) => (
                    <FormItem className="hidden">
                      <FormControl>
                        <Input
                          key={getFullAddress()}
                          defaultValue={getFullAddress()}
                          type="hidden"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="welcome_message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Welcome Message</FormLabel>
                      <FormDescription>
                        Greet your potential visitors with this message
                      </FormDescription>
                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder="A welcome message for your potential guests"
                          {...field}
                          value={!field.value ? '' : field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="space-x-4 pt-4">
                  {church_id ? (
                    <>
                      <Button
                        type="button"
                        size="lg"
                        variant="outline"
                        className="ml-auto shadow-none"
                        onClick={handleSaveAndExit}
                      >
                        {savingStatus === 'saving-exit'
                          ? 'Saving...'
                          : 'Save And Exit'}
                      </Button>
                      <Button
                        type="submit"
                        size="lg"
                        className="ml-auto shadow-none"
                      >
                        {savingStatus === 'saving'
                          ? 'Saving...'
                          : 'Save And Continue'}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/listings"
                        className={cn(
                          buttonVariants({ variant: 'outline', size: 'lg' }),
                          'shadow-none'
                        )}
                      >
                        Cancel
                      </Link>
                      <Button
                        type="submit"
                        size="lg"
                        className="ml-auto shadow-none"
                      >
                        {savingStatus === 'saving' ? 'Saving...' : 'Save'}
                      </Button>
                    </>
                  )}
                </div>
              </fieldset>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}

export default BasicInfoForm;
