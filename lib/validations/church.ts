import * as z from 'zod';

export const basicInfoSchema = z.object({
  name: z
    .string({ required_error: 'Church name is required.' })
    .min(1, { message: 'Church name is required.' }),
  region: z
    .string({ required_error: 'Region is required.' })
    .min(1, { message: 'Region is required.' }),

  province: z
    .string({ required_error: 'Province is required.' })
    .min(1, { message: 'Province is required.' }),

  city: z
    .string({ required_error: 'Town/City is required.' })
    .min(1, { message: 'Town/City is required.' }),

  barangay: z
    .string({ required_error: 'Barangay is required.' })
    .min(1, { message: 'Barangay is required.' }),

  street: z
    .string({ required_error: 'Street Address is required.' })
    .min(1, { message: 'Street Address is required.' }),
  welcome_message: z
    .string({ required_error: 'Welcome message is required.' })
    .min(1, { message: 'Welcome message is required.' }),
  logo: z
    .string({ required_error: 'Church logo is required.' })
    .url({ message: 'Invalid church logo url' }),
  full_address: z.string(),
});

export const churchProfileSchema = z.object({
  church_size: z
    .number({ required_error: 'Church size is required' })
    .int({ message: 'Please enter a whole number' })
    .positive(),
  communion_frequency: z.string({
    required_error: 'Communion frequency is required',
  }),
  confessions: z
    .array(
      z.object({
        title: z
          .string({ required_error: 'Confession title is required.' })
          .min(1, { message: 'Confession title is required.' }),
      })
    )
    .optional(),
  ministries: z
    .array(
      z.object({
        title: z
          .string({ required_error: 'Ministry title is required.' })
          .min(1, { message: 'Ministry title is required.' }),
      })
    )
    .min(3, { message: 'Provide at least 3 ministries' }),
  public_services: z
    .array(
      z.object({
        title: z
          .string({ required_error: 'Public service title is required.' })
          .min(1, { message: 'Public service title is required.' }),
      })
    )
    .min(1, { message: 'Provide at least 1 public service' }),
  services: z
    .array(
      z.object({
        title: z
          .string({ required_error: 'Service title is required.' })
          .min(1, { message: 'Service title is required.' }),
        day: z
          .string({ required_error: 'Service day is required.' })
          .min(1, { message: 'Service day is required.' }),
        time: z
          .string({ required_error: 'Service time is required.' })
          .min(1, { message: 'Service time is required.' }),
      })
    )
    .min(1, { message: 'Enter at least 1 service schedule.' }),
  mission: z
    .string({ required_error: 'Mission is required.' })
    .min(1, { message: 'Mission is required.' })
    .nullable(),
  vision: z
    .string({ required_error: 'Vision is required.' })
    .min(1, {
      message: 'Vision is required.',
    })
    .nullable(),
});

export const churchContactSchema = z.object({
  email: z
    .string({ required_error: 'Email is required.' })
    .email({ message: 'Enter a valid email.' }),
  website: z.string().url({ message: 'Enter a valid website url.' }).nullable(),
  contact_numbers: z
    .array(
      z.object({
        value: z
          .string({ required_error: 'Contact number is required.' })
          .min(1, { message: 'Contact number is required.' }),
      })
    )
    .min(1, { message: 'Enter at least 1 contact number.' }),
  social_links: z
    .array(
      z.object({
        url: z
          .string({ required_error: 'Social link url is required.' })
          .min(1, { message: 'Enter a valid url' })
          .url({ message: 'Enter a valid url.' }),
        platform: z
          .string({ required_error: 'Platform is required.' })
          .min(1, { message: 'Platform is required.' }),
      })
    )
    .optional(),
});

export const pastorProfileSchema = z.object({
  name: z
    .string({ required_error: "Pastor's name is required." })
    .min(1, { message: "Pastor's name is required." }),
  bio: z
    .string({ required_error: 'Bio is required.' })
    .min(1, { message: 'Bio is required.' }),
  photo: z
    .string({ required_error: 'Photo is required.' })
    .min(1, { message: 'Photo is required.' }),
});

export const churchMediaSchema = z.object({
  gallery: z
    .array(
      z.object({
        name: z.string(),
        size: z.number(),
        type: z.string(),
        url: z.string(),
      })
    )
    .optional(),
});

export const churchMapSchema = z.object({
  landmarks: z
    .array(
      z.object({
        name: z.string(),
      })
    )
    .optional(),
});

export const churchIdSchema = z.object({
  church_id: z.string({
    required_error: 'Church ID is required',
  }),
});

export const idSchema = z.object({
  id: z.string({
    required_error: 'ID is required',
  }),
});

// types
export type BasicInfoData = z.infer<typeof basicInfoSchema>;
export type ChurchProfileData = z.infer<typeof churchProfileSchema>;
export type ChurchContactData = z.infer<typeof churchContactSchema>;
export type PastorProfileData = z.infer<typeof pastorProfileSchema>;
export type ChurchMediaData = z.infer<typeof churchMediaSchema>;
export type ChurchMapData = z.infer<typeof churchMapSchema>;
