import conf from "../config";
import { Client, ID } from "appwrite";

import { Account } from "appwrite";
export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client.setEndpoint(conf.appwrite_url)
            .setProject(conf.appwrite_project_id);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            if (typeof this.account.create === 'function') {
                const user = await this.account.create(ID.unique(), email, password , name);
                if (user) {
                    return this.login({ email, password });
                }
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        console.log(this.account)
        try {
            await this.logOut();
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getUser() {
        try {
            if (typeof this.account.get === 'function') {
                const user = await this.account.get();
                return user;
            } else {
                throw new Error('get method is not available on Account');
            }
        } catch (error) {
            throw new Error(error.message);
        }


    }

    async logOut() {
        try {
            await this.account.deleteSession('current');
        } catch (error) {
            console.log("Appwrite :: logout :: error", error);
        }

    }
}

const authService = new AuthService();
export default authService;