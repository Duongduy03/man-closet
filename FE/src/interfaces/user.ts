type Address = {
  id: string;
  city: string;
  district: string;
  wards: string;
  detailAddress: string;
  isDefault: boolean;
};

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  address?: Address[];
  phone?: string;
  isBlocked: boolean;
  role: string;
  avatar: string
}

export interface ILoginRegister {
  message: string;
  data: IUser;
  accessToken: string;
  refreshToken: string;
}
