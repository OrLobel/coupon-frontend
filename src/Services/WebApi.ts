import axios, { AxiosResponse } from "axios";
import { CompanyModel, CompanyModelRequest } from "../Models/Company";
import { CouponModel } from "../Models/Coupon";
import { CustomerModel } from "../Models/Customer";
// import { TodoModel, TodoPayloadModel } from "../Models/Todo";
import { CredentialsModel, UserModel } from "../Models/Welcome";
import store from "../Redux/Store";
import globals from "./Globals";
import tokenAxios from "./InterceptorAxios";

class WebApi {
    // private taskApi = globals.urls.tasks;
    private welcomeApi = globals.urls.welcome;


    public async register(credentials: CredentialsModel): Promise<any> {
        return await axios.post<any>(this.welcomeApi + 'register', credentials);
    }

    public async login(credentials: CredentialsModel): Promise<any> {
        // console.log("login")
        return await axios.post<UserModel>(this.welcomeApi + 'auth/login', credentials);
    }
    // public async getSingleCompany(id: number): Promise<any> {
    //     return await tokenAxios.get<CompanyModel>(this.welcomeApi + '/api/company');
    // }

    public async getCompanies(): Promise<AxiosResponse<CompanyModel[]>> {
        const headers = { "Authorization": store.getState().authReducer.user?.token };
        return await axios.get<CompanyModel[]>(`${this.welcomeApi}api/admin/company`, { headers })
    }


    public async getMyCompany(): Promise<AxiosResponse<CompanyModel[]>> {
        const headers = { "Authorization": store.getState().authReducer.user?.token };
        return await axios.get<CompanyModel[]>(`${this.welcomeApi}api/company/companyinfo`, { headers })
    }

    public async deleteCompany(id: number): Promise<AxiosResponse<any>> {
        const headers = { "Authorization": store.getState().authReducer.user?.token };
        return await axios.delete<any>(`${this.welcomeApi}api/admin/company/${id}`, { headers })
    }

    public async updateCompany(id: number, company: CompanyModel): Promise<AxiosResponse<any>> {
        const headers = { "Authorization": store.getState().authReducer.user?.token };
        return await axios.put<any>(`${this.welcomeApi}api/admin/company/${id}`, company, { headers })
    }

    public async getSingleCompany(companyNum: number): Promise<AxiosResponse<CouponModel[]>> {
        const headers = { "Authorization": store.getState().authReducer.user?.token };
        return await axios.get<CompanyModel[]>(`${this.welcomeApi}api/admin/company/${companyNum}`, { headers })
    }

    public async getSingleCustomer(customerNum: number): Promise<AxiosResponse<CustomerModel[]>> {
        const headers = { "Authorization": store.getState().authReducer.user?.token };
        return await axios.get<CustomerModel[]>(`${this.welcomeApi}api/admin/customer/${customerNum}`, { headers })
    }

    public async getMyCustomer(): Promise<AxiosResponse<CustomerModel[]>> {
        const headers = { "Authorization": store.getState().authReducer.user?.token };
        return await axios.get<CustomerModel[]>(`${this.welcomeApi}api/customer/info`, { headers })
    }

    public async addCompany(company: CompanyModel): Promise<AxiosResponse<any>> {
        const headers = { "Authorization": store.getState().authReducer.user?.token };
        return await axios.post<any>(`${this.welcomeApi}api/admin/company`, company, { headers })
    }
    public async addCustomer(customer: CustomerModel): Promise<AxiosResponse<any>> {
        const headers = { "Authorization": store.getState().authReducer.user?.token };
        return await axios.post<any>(`${this.welcomeApi}api/admin/customer`, customer, { headers })
    }

    public async getCustomers(): Promise<AxiosResponse<CustomerModel[]>> {
        const headers = { "Authorization": store.getState().authReducer.user?.token };
        return await axios.get<CustomerModel[]>(`${this.welcomeApi}api/admin/customer `, { headers })
    }

    public async deleteCustomer(id: number): Promise<AxiosResponse<any>> {
        const headers = { "Authorization": store.getState().authReducer.user?.token };
        return await axios.delete<any>(`${this.welcomeApi}api/admin/customer/${id}`, { headers })
    }

    public async updateCustomer(id: number, customer: CustomerModel): Promise<AxiosResponse<any>> {
        const headers = { "Authorization": store.getState().authReducer.user?.token };
        return await axios.put<any>(`${this.welcomeApi}api/admin/customer/${id}`, customer, { headers })
    }

    public async getCoupons(): Promise<AxiosResponse<CouponModel[]>> {
        const headers = { "Authorization": store.getState().authReducer.user?.token };
        return await axios.get<CouponModel[]>(`${this.welcomeApi}api/company/coupon`, { headers })
    }

    public async getCustomerCoupons(): Promise<AxiosResponse<CouponModel[]>> {
        const headers = { "Authorization": store.getState().authReducer.user?.token };
        return await axios.get<CouponModel[]>(`${this.welcomeApi}api/customer/coupon`, { headers })
    }

    public async getAllCoupons(): Promise<AxiosResponse<CouponModel[]>> {
        const headers = { "Authorization": store.getState().authReducer.user?.token };
        return await axios.get<CouponModel[]>(`${this.welcomeApi}api/customer/all/coupon`, { headers })
    }

    public async getCouponsWithMaxPrice(maxPrice: number): Promise<AxiosResponse<CouponModel[]>> {
        const headers = { "Authorization": store.getState().authReducer.user?.token };
        return await axios.get<CouponModel[]>(`${this.welcomeApi}api/company/coupon/max-price/${maxPrice}`, { headers })
    }

    public async getCustomerCouponsWithMaxPrice(maxPrice: number): Promise<AxiosResponse<CouponModel[]>> {
        const headers = { "Authorization": store.getState().authReducer.user?.token };
        return await axios.get<CouponModel[]>(`${this.welcomeApi}api/customer/coupon/max-price/${maxPrice}`, { headers })
    }

    public async getCouponsWithCategory(category: string): Promise<AxiosResponse<CouponModel[]>> {
        const headers = { "Authorization": store.getState().authReducer.user?.token };
        return await axios.get<CouponModel[]>(`${this.welcomeApi}api/company/coupon/category/${category}`, { headers })
    }

    public async getCustomerCouponsWithCategory(category: string): Promise<AxiosResponse<CouponModel[]>> {
        const headers = { "Authorization": store.getState().authReducer.user?.token };
        return await axios.get<CouponModel[]>(`${this.welcomeApi}api/customer/coupon/category/${category}`, { headers })
    }



    public async deleteCoupon(id: number): Promise<AxiosResponse<any>> {
        const headers = { "Authorization": store.getState().authReducer.user?.token };
        return await axios.delete<any>(`${this.welcomeApi}api/company/coupon/${id}`, { headers })
    }

    public async buyCoupon(id: number): Promise<AxiosResponse<any>> {
        const headers = { "Authorization": store.getState().authReducer.user?.token };
        return await axios.get<any>(`${this.welcomeApi}api/customer/purchase/${id}`, { headers })
    }

    public async updateCoupon(id: number, coupon: CouponModel): Promise<AxiosResponse<any>> {
        const headers = { "Authorization": store.getState().authReducer.user?.token };
        return await axios.put<any>(`${this.welcomeApi}api/company/coupon/${id}`, coupon, { headers })
    }
    
    public async addCoupon(coupon: CouponModel): Promise<AxiosResponse<any>> {
        const headers = { "Authorization": store.getState().authReducer.user?.token };
        return await axios.post<any>(`${this.welcomeApi}api/company/coupon`, coupon, { headers })
    }


}
const web = new WebApi();

export default web;
