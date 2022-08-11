export class AddOrEditUserModel {
  id?: number;
  email!: string;
  firstName!: string;
  lastName!: string;
  roleId!: number;
  name?: string;
}

export default class UserModel {
  name!: string;
  mobile!: string;
  email!: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  phone1?: string;
  phone2?: string;
}
