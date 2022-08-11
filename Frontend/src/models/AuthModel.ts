import internal from "stream";

export class ForgotPasswordModel {
  mobile!: string;
  email!: string;

  constructor() {
    this.mobile = "";
    this.email="";
  }
}


export class LoginModel {
  mobile!: string;
  password!: string;

  constructor() {
    this.mobile = "";
    this.password="";
  }
}

export class CreateUserModel {
  name!: string;
  mobile!: string;
  email!: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  phone1: string;
  phone2: string;


  constructor() {
    this.name = "";
    this.mobile = "";
    this.email = "";
    this.address = "";
    this.city = "";
    this.state = "";
    this.country = "";
    this.pincode = "";
    this.phone1 = "";
    this.phone2 = "";
  }
}

export class CreateAccountModel {
  customerId!: number;
  name!: string;
  mobile!: string;
  contactName: string;
  phone1: string;
  phone2: string;
  accounttypeid!: number;
  address: string;
  email: string;
  city: string;
  state: string;
  country: string;
  pincode: string;

  constructor() {
    this.contactName = "";
    this.accounttypeid = 1;
    this.name = "";
    this.mobile = "";
    this.email = "";
    this.address = "";
    this.city = "";
    this.state = "";
    this.country = "";
    this.pincode = "";
    this.phone1 = "";
    this.phone2 = "";
  }
}

export class UploadFileModel {
  
  name!: string;
  filepath!: string;
  folderid!: number;
  tags?:string;
  filebytesbase64!:string;
  accountId!: number;
  consultantid!: number;
  customerid!: number;
  extension!: string;
  disk_file_name?: string;
  constructor() {
    this.name = "";
    this.filepath = "";
    this.folderid = 1;
    this.tags = "";
    this.filebytesbase64 = "";
    this.accountId = 1;
    this.consultantid = 1;    
    this.customerid = 1;
    this.extension = "";
    this.disk_file_name = "";
    
  }
}


export class CreateFolderModel {
  accountId!: number;
  name!: string;
  parentid!: number;
  consultantid!: number;
  customerid!: number;
  disk_folder_name?: string;
  constructor() {
    this.accountId = 1;
    this.parentid = 1;
    this.name = "";
    this.customerid = 1;
    this.disk_folder_name = "";
    
  }
}