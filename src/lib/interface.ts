export interface RegistrationFormData {
  email: string;
  whatsappNumber: string;
  Salutations: "Mr." | "Ms." | "Mrs." | "Dr." | "Prof.";
  name: string;
  affiliation: string;
  designation: string;
  gender: "Male" | "Female" | "Other";
  imageUrl: string;
  dob: string;
  AadharNumber: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  institute: string;
  memberId: string;
  registrationType: string;
  abstractSubmitted: boolean;
  needAccommodation: boolean;
  dietaryRequirements: string;
  specialAssistance: string;
  abstractId: string | null;
  includeGalaDinner: boolean;
}

export interface RegistrationInfo {
  abstract: {
    url?: string;
    qrCodeUrl?: string;
    temporyAbstractCode?: string;
    AbstractCode?: string;
    Status?: string;
    title?: string;
    name?: string;
    email?: string;
    affiliation?: string;
    coAuthor?: string;
    presentationType?: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
    whatsappNumber?: string;
    abstractFileUrl?: string;
    rejectionComment?: string;
    createdAt?: string;
    updatedAt?: string;
    articleType?: string;
  };

  registration: {
    _id?: string;
    email?: string;
    whatsappNumber?: string;
    Salutations?: string;
    name?: string;
    affiliation?: string;
    designation?: string;
    imageUrl?: string;
    gender?: string;
    dob?: string;
    AadharNumber?: number;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
    country?: string;
    institute?: string;
    registrationType?: string;
    abstractSubmitted?: boolean;
    abstractId?: string;
    paymentStatus?: string;
    needAccommodation?: boolean;
    dietaryRequirements?: string;
    specialAssistance?: string;
    registrationStatus?: string;
    createdAt?: string;
    updatedAt?: string;
    paymentAmount?: number;
    paymentDate?: string;
    registrationCode?: string;
    transactionId?: string;
    qrCodeUrl?: string;
    presentationType?: string;
    articleType?: string;
  };
}

export interface Plan {
  name: string;
  description: string;
  earlyBird: number;
  regular: number;
  spot: number;
}

// Interfaces for type safety
export interface IAbstract {
  _id?: string;
  email: string;
  whatsappNumber?: string;
  name?: string;
  affiliation?: string;
  coAuthor?: string;
  designation?: string;
  title?: string;
  subject?: string;
  abstractFileUrl?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  qrCodeUrl?: string;
  temporyAbstractCode?: string;
  AbstractCode?: string;
  rejectionComment?: string;
  Status?: string;
  registrationCompleted?: boolean;
  registrationCode?: string;
  articleType?: string;
  presentationType?: "Oral" | "E-Poster" | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IRegistration {
  _id?: string;
  groupCode?: string;
  email: string;
  whatsappNumber?: string;
  Salutations?: "Mr." | "Ms." | "Mrs." | "Dr." | "Prof.";
  name: string;
  affiliation?: string;
  designation?: string;
  imageUrl?: string;
  gender?: "Male" | "Female" | "Other";
  dob?: Date;
  AadharNumber?: number;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  country?: string;
  institute?: string;
  qrCodeUrl?: string;
  registrationType?: string;
  abstractSubmitted?: boolean;
  abstractId?: string;
  paymentStatus?: "Pending" | "Completed" | "Failed";
  paymentAmount?: number;
  paymentDate?: Date;
  transactionId?: string;
  memberId?: string;
  needAccommodation?: boolean;
  dietaryRequirements?: string;
  specialAssistance?: string;
  includeGalaDinner?: boolean;
  registrationStatus?: "Pending" | "Confirmed";
  registrationCode?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
