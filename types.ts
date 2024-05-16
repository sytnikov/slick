export interface RepairShop {
  id: number;
  name: string;
  description: string;
  number_of_employees: number;
  street_address: string;
  postal_code: string;
  opening_time: string;
  closing_time: string;
  days_closed: string;
  city: string;
  status: string;
  banner_img_url: string;
  booking_buffer: number;
  days_in_calendar: number;
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
  booking_end_date: string;
  price: number;
  status: string;
  vehicle_id: number;
  customer_notes: string;
}

export interface BookingWithDetails
  extends Omit<Booking, "shop_service_id" | "shop_id" | "user_id"> {
  shop_service_id: ShopService;
  shop_id: RepairShop;
  user_id: UserProfile;
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
  user_id: number;
  service_booked: string;
  review: string;
  rating: number;
}

export interface CustomerReviewWithDetails
  extends Omit<CustomerReview, "user_id"> {
  user_id: UserProfile;
}

export interface Message {
  id: number;
  created_at: string;
  sender: UserProfile;
  receiver: UserProfile;
  message: string;
  conversation_id: number;
}

export interface MessageSender {
  userProfile: UserProfile;
  type: "currentUser" | "otherUser";
}

export interface Conversation {
  id: number;
  created_at: string;
  sender: UserProfile;
  receiver: UserProfile;
  last_message_id: Message;
}

// visual compoent props, for landing page, etc...

export interface HeroSectionProps {
  title: string;
  description: string;
}
