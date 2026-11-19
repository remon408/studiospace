// src/lib/types.ts
export interface User {
  _id?: string;
  name: string;
  email: string;
  image?: string;
  role: 'creator' | 'host' | 'admin';
  bio?: string;
  phone?: string;
  location?: string;
  subscription: 'free' | 'pro' | 'enterprise';
  createdAt?: Date;
  bookings?: Booking[];
  studios?: Studio[];
}

export interface Studio {
  _id?: string;
  name: string;
  description: string;
  category: StudioCategory;
  subCategory?: string;
  location: string;
  city: string;
  hourlyRate: number;
  rating: number;
  reviewCount: number;
  images: string[];
  amenities: string[];
  capacity: number;
  availableSlots: DateSlot[];
  ownerId: string;
  ownerName?: string;
  isActive: boolean;
  createdAt?: Date;
}

export interface DateSlot {
  date: string;
  slots: { time: string; available: boolean }[];
}

export interface Booking {
  _id?: string;
  studioId: string;
  studioName?: string;
  userId: string;
  userName?: string;
  date: string;
  timeSlot: string;
  duration: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt?: Date;
}

export interface Review {
  _id?: string;
  studioId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt?: Date;
}

export type StudioCategory =
  | 'photo'
  | 'sound'
  | 'podcast'
  | 'music'
  | 'art'
  | 'video'
  | 'dance'
  | 'other';

export type UserRole = 'creator' | 'host' | 'admin';

export interface BookingFormData {
  studioId: string;
  date: string;
  timeSlot: string;
  duration: number;
}

export interface StudioFormData {
  name: string;
  description: string;
  category: StudioCategory;
  subCategory: string;
  location: string;
  city: string;
  hourlyRate: number;
  capacity: number;
  amenities: string[];
  images: string[];
}
