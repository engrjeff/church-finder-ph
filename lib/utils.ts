import { isAxiosError } from 'axios';
import { clsx, type ClassValue } from 'clsx';
import toast from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function removeDuplicates<T>(arr: T[], uniqueKey: keyof T) {
  return arr.filter(
    (v, i, a) => a.findIndex((v2) => v2[uniqueKey] === v[uniqueKey]) === i
  );
}

export function arrayToMap<T>(
  arr: T[],
  keyProperty: keyof T,
  valueKey: keyof T
) {
  return new Map(arr.map((entry) => [entry[keyProperty], entry[valueKey]]));
}

export function errorHandler(error: unknown) {
  if (isAxiosError(error)) {
    if (error.status === 500) {
      toast.error(error.message);
      return;
    }

    const errorData = error.response?.data.error;

    if (Array.isArray(errorData)) {
      toast.error(errorData[0]?.message);
    } else {
      toast.error(errorData);
    }
  }
}
