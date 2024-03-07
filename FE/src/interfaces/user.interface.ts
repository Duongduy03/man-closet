export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: {
    city: string;
    district: string;
    wards: string;
    detailAdress: string;
  }[];
  avatar?: string
}
