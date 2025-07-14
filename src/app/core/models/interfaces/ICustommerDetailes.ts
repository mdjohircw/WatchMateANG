export interface ICustomerDetailes {
  customerId: number;
  fullName: string;
  custmerImage: string | null;
  emailOrPhone: string;
  address: string;
  dateOfBirth: string;
  gender: string;
  nidOrPassportNumber: string;
  createdAt: string | null;
  createdBy: string | null;
  updatedAt: string | null;
  updatedBy: string | null;
  deleted: boolean | null;
  deletedAt: string | null;
  deletedBy: string | null;
  userId: number;
  users: any;

  }
  