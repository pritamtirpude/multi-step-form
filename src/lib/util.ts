import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import iconAdvanced from '../assets/images/icon-advanced.svg';
import iconArcade from '../assets/images/icon-arcade.svg';
import iconPro from '../assets/images/icon-pro.svg';
import { AddOnType, PlanType } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const planItems: PlanType[] = [
  {
    plan: 'arcade',
    icon: iconArcade,
    monthly: 9,
    yearly: 90,
  },
  {
    plan: 'advanced',
    icon: iconAdvanced,
    monthly: 12,
    yearly: 120,
  },
  {
    plan: 'pro',
    icon: iconPro,
    monthly: 15,
    yearly: 150,
  },
];

export const addOnItems: AddOnType[] = [
  {
    addOn: 'Online Service',
    addOnDesc: 'Access to multiplayer games',
    monthly: 1,
    yearly: 10,
  },
  {
    addOn: 'Larger storage',
    addOnDesc: 'Extra 1TB of cloud save',
    monthly: 2,
    yearly: 20,
  },
  {
    addOn: 'Customizable profile',
    addOnDesc: 'Custom theme on your profile',
    monthly: 2,
    yearly: 20,
  },
];
