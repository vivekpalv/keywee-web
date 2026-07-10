export interface ProjectItem {
  _id: string;
  name: string;
  category?: string | { _id: string; name: string }; 
  categoryId?: string; 
  city: string;
  state: string;
  description?: string;
  media?: string[];
  tags?: string[];
  subCategories?: string[] | any[];
}

export interface QualificationItem {
  _id: string;
  degree?: string;
  university?: string;
  yearOfPassing?: number;
  coaNo?: string;
  coaCertUrl?: string;
}

export interface UserProfile {
  _id: string;
  name: string;
  mobile: string;
  gender: string;
  architectDetails?: {
    firmName?: string;
    email?: string;
    contact?: string;
    experience?: number;
    bio?: string;
    city?: string;
    state?: string;
    verified?: boolean;
    profilePictureUrl?: string;
    minBudget?: number; // Added to fix TS error
    maxBudget?: number; // Added to fix TS error
    
  };
}

export interface MediaItem {
  id: string;
  url: string;
  file?: File;
}

export interface CategoryItem {
  _id: string;
  name: string;
  iconUrl: string;
}