import conf from "../config";
import { Client, Databases, ID, Query, Storage } from "appwrite";

export class DatabasesService {
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client.setEndpoint(conf.appwrite_url)
            .setProject(conf.appwrite_project_id);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, Content, slug, image, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwrite_database_id,
                conf.appwrite_collection_id,
                slug,
                {
                    title,
                    Content,
                    image,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite :: createPost :: error", error);
        }
    }

    async updatePost(slug, { title, content, image, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwrite_database_id,
                conf.appwrite_collection_id,
                slug,
                {
                    title,
                    content,
                    image,
                    status,

                }
            )
        } catch (error) {
            console.log("Appwrite  :: updatePost :: error", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwrite_database_id,
                conf.appwrite_collection_id,
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite  :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwrite_database_id,
                conf.appwrite_collection_id,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite  :: getPost :: error", error);
            return false
        }
    }

    async getAllPost(query = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwrite_database_id,
                conf.appwrite_collection_id,
                query,
                

            )
        } catch (error) {
            console.log("Appwrite  :: getPosts :: error", error);
            return false
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwrite_bucket_id,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite  :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwrite_bucket_id,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite  :: deleteFile :: error", error);
            return false
        }
    }

    filePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwrite_bucket_id,
            fileId
        )
    }
};

const databasesService = new DatabasesService();
export default databasesService;
