export interface Country {
  id: string;
  country: string;
  cities: City[];
}

export interface City {
  id: string;
  city: string;
  zipCode: string;
}
export interface CustomerDetails {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  street: string;
  website: string;
  company: string;
  cityId: string;
  countryId: string;
  newPassword: string;
  industryId: string;
  isBlocked: boolean;
  qrs: QrCode[];
  subscriptions: Subscription[];
  qrsModified: QrsModified[];
}

export interface Subscription {
  id: string;
  name: string;
  price: number;
  qrLimit: number;
  activatedCodesCount: number;
  activeDate: string;
}

export interface QrCode {
  id: string;
  name: string;
  qrType: string;
  folder: string;
  dateCreated: string;
  scansCount: number;
}
export interface Customer {
  industryId: null;
  company: string;
  countryId: null;
  cityId: null;
  street: string;
  website: string;
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
}
export interface QrsModified {
  id: string;
  qrName: string;
  qrIndex: string;
  versionsCount: number;
  activatedVersion: number;
}
