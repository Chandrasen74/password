/*
 * Copyright (c) 2026 Chandrasen. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, distribution, or use is prohibited.
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
