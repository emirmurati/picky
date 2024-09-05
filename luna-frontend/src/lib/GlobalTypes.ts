export interface UserType {
  avatar?: any;
  banner?: string | null;
  description?: string | undefined;
  email?: string;
  firstName?: string | undefined;
  id?: string;
  lastName?: string;
  location?: string;
  phoneNumber?: string;
  thingILove?: string[] | undefined;
  username?: string;
}

export interface RestaurantType {
  category: string;
  city: string;
  comments?: string[];
  country: string;
  _id: string;
  image: string;
  name: string;
  openingHours?: string;
  priceLevel?: string;
  street: string;
  zip: string;
  user: UserType;
}

export interface ReviewType {
  comments?: string[];
  content: string;
  id: string;
  likes: number;
  rating: number;
  restaurant: RestaurantType[];
  user: UserType[];
}
