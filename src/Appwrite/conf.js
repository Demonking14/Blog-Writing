import { Client, ID, Databases, Query, Storage } from "appwrite";
import config from "../config";

export class Services {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client.setEndpoint(config.appwriteURL).setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createDocument({ title, content, slug, featuredimage, userId, status }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId, 
                config.appwriteCollectionId,
                slug,
                { title, content, featuredimage, userId, status }
            );
        } catch (error) {
            console.log("Error: ", error);
            return null;
        }
    }

    async updateDocument(slug, { title, content, featuredimage, status }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId, 
                config.appwriteCollectionId, 
                slug,
                { title, content, featuredimage, status }
            );
        } catch (error) {
            console.log("Error: ", error);
            return null;
        }
    }

    async deleteDocument(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log("Error: ", error);
            return false;
        }
    }

    async getDocument(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("Error: ", error);
            return null;
        }
    }

    async getDocuments(queries = [Query.equal('status', 'active')]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.log("Error:", error);
            return false;
        }
    }
    
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                file
            );
        } catch (error) {
            console.log("Error:", error);
            return null;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.log("Error: ", error);
            return false;
        }
    }

    async getFilePreview(fileId) {
        try {
            return this.bucket.getFilePreview(
                config.appwriteBucketId,
                fileId
            );
        } catch (error) {
            console.log("Error: ", error);
            return null;
        }
    }
}

const services = new Services();
export default services;
