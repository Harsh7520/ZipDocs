import { CreateAccountModel, CreateFolderModel, UploadFileModel, ForgotPasswordModel } from './../models/AuthModel';
import { CreateUserModel, LoginModel } from "../models/AuthModel";
import UserModel from "../models/UserModel";
import request from "./request";
import { Stream } from 'stream';
import axios from 'axios';
let token = localStorage.getItem("token");
const LTT = require('list-to-tree');
const request2 = axios.create({
    baseURL: 'https://localhost:44381/',
    timeout: 12400000,
    responseType: 'blob',
  });
let axiosConfig = {
    headers: { Authorization: `Bearer ${token}` }
  };
class AuthService {
    ENDPOINT = 'api';
    public async login(data: LoginModel): Promise<string> {
        const url = `${this.ENDPOINT}/consultant/login`;
        return request.post(url, data).then((res) => {
            return res.data["consultantDetails"]["token"];
        });
    }
    public async create(data: CreateUserModel): Promise<CreateUserModel> {
        const url = `${this.ENDPOINT}/consultant/register`;
        return request.post<CreateUserModel>(url, data ).then((res) => {
            return res.data;
        });
    }
    public async createcustomer(data: CreateUserModel): Promise<CreateUserModel> {
        const url = `${this.ENDPOINT}/consultant/createcustomer`;
        return request.post<CreateUserModel>(url, data, axiosConfig ).then((res) => {
            return res.data;
        });
    }
    public async createaccount(data: CreateAccountModel): Promise<CreateAccountModel> {
        const url = `${this.ENDPOINT}/consultant/createcustomeraccount`;
        return request.post<CreateAccountModel>(url, data, axiosConfig ).then((res) => {
            return res.data;
        });
    }
    public async createfolder(data: CreateFolderModel): Promise<CreateFolderModel> {
        const url = `${this.ENDPOINT}/consultant/createaccountfolder`;
        return request.post<CreateFolderModel>(url, data, axiosConfig ).then((res) => {
            return res.data;
        });
    }
    public async getcustomers(): Promise<Array<JSON>> {
        const url  = `${this.ENDPOINT}/consultant/getcustomers`;
        return request.get(url,axiosConfig).then((res) => {
            return (res.data["customersDetails"]);
        });
    }
    public async getaccounts(custid: number): Promise<Array<JSON>> {
        const url  = `${this.ENDPOINT}/consultant/customer/getaccounts?customerid=${custid}`;
        return request.get(url,axiosConfig).then((res) => {
            return (res.data["accountsDetails"]);
        });
    }
    public async getfolders(accid: number): Promise<Array<JSON>> {
        const url  = `${this.ENDPOINT}/account/getfolders?accountid=${accid}`;
        return request.get(url,axiosConfig).then((res) => {  
            return (res.data["foldersDetails"]);
        });
    }
    public async getfiles(foldid: number): Promise<Array<JSON>> {
        const url  = `${this.ENDPOINT}/account/getfiles?folderid=${foldid}`;
        return request.get(url,axiosConfig).then((res) => {  
            return (res.data["filesDetails"]);
        });
    }
    public async downloadfile(fileid: number): Promise<any> {
        const url  = `${this.ENDPOINT}/account/downloadfile?fileid=${fileid}`;
        return request2.get(url,axiosConfig).then((res) => {  
            return (res.data);
        });
    }
    public async uploadfile(data: UploadFileModel): Promise<UploadFileModel> {
        const url = `${this.ENDPOINT}/consultant/uploadfile`;
        return request.post<UploadFileModel>(url, data, axiosConfig ).then((res) => {
            return res.data;
        });
    }
    public async forgotpassword(data: ForgotPasswordModel) : Promise<any> {
        const url = `${this.ENDPOINT}/consultant/forgotpassword`;
        return request.post<ForgotPasswordModel>(url,data).then((res) => {
            return res.data;
        })
    }
}
export default new AuthService();
