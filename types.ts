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
}

export interface UserProfile {
  id: number;
  user_id: string;
  first_name: string;
  surname: string;
  phone_number: string;
  shop_owner: boolean;
}

export interface Service {
  id: number;
  name: string;
}

export interface ShopService {
  id: number;
  service_id: number;
  duration: number;
  price: number;
}

export interface ShopServiceWithDetails {
  id: number;
  name: string;
  duration: number;
  price: number;
}

export interface RepairShopBooking {
  id: number;
  shop_id: number;
  booking_date: string;
  shop_name: string;
  service_booked: string;
  customer_name: string;
}

export interface Booking {
  id: number;
  shop_id: number;
  shop_service_id: number;
  user_id: string;
  booking_start_date: string;
  duration: number;
}

export interface BookingWithDetails {
  id: number;
  booking_start_date: string;
  duration: number;
  shopName: string;
  serviceName: string;
}
