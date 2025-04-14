import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using clsx and tailwind-merge for efficient class merging
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 