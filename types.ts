export interface RepairShop {
  id: number;
  name: string;
  description: string;
  number_of_employees: number;
  street_address: string;
  postal_code: string;
  opening_time: string;
  closing_time: string;
  city: string;
  status: string;
  banner_img_url: string;
}

export interface UserProfile {
  id: number;
  user_id: string;
  first_name: string;
  surname: string;
  phone_number: string;
  shop_owner: boolean;
  avatar_url: string;
}

export interface ShopService {
  id: number;
  service_name: string;
  shop_id: number;
  duration: number;
  price: number;
}

export interface Booking {
  id: number;
  shop_id: number;
  user_id: string;
  shop_service_id: number;
  booking_start_date: string;
  price: number;
  status: string;
  vehicle_id?: number;
}

export interface BookingWithDetails extends Booking {
  service_booked: string;
  customer_name: string;
  shop_name: string;
}

export interface CustomerVehicle {
  id: number;
  associated_user: string;
  user_id: string;
  description: string;
  make: string;
  model: string;
  year_manufactured: number;
  registration_number: string;
}

export interface CustomerReview {
  id: number;
  repair_shop_id: number;
  customer_id: number;
  service_booked: string;
  review: string;
  rating: number;
}

export interface CustomerReviewWithDetails extends CustomerReview {
  customer_name: string;
}
