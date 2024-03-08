export interface RepairShop {
  id: number;
  name: string;
  description: string;
  street_address: string;
  postal_code: string;
  city: string;
  status: string;
}

export interface Inquiry {
  id: number;
  shop_id: number;
  customer_id: number;
  message: string;
}

export interface Proposal {
  id: number;
  inquiry_id: number;
  price_estimate: number;
  service_description: string;
  work_start_date: string;
  work_end_date: string;
  status: string;
}

export interface UserProfile {
  id: number;
  first_name: string;
  surname: string;
  phone_number: string;
  shop_owner: boolean;
}

export interface Service {
  id: number;
  name: string;
}
