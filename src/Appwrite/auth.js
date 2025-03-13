import config from '../config';
import { Client, Account, ID } from 'appwrite';

export class AuthServices {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async signin(email, password, name) {
        try {
            // Create the user account
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            
            // Automatically create a session for the new user
            if (userAccount) {
                return await this.login(email, password);
            }
        } catch (error) {
            console.error("Error during sign in:", error);
            throw error;
        }
    }

    async login(email, password) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            console.error("Error during login:", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("Error fetching current user:", error);
            throw error;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error("Error during logout:", error);
            throw error;
        }
    }
}

const authservice = new AuthServices();
export default authservice;