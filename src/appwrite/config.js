import conf from "../conf/conf.js"

import { Client, Account, ID,Databases,Storage,Query } from "appwrite";
//error is here in get post and other methods,some methods require project id some not design appropriately.
export class Service{

    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        console.log("Appwrite serive :: createPost :: userId", userId);
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

        async updateDocument(slug,{title,content,featuredImage,status}){
            try {
                return await this.databases.updateDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    slug,
                    {
                        title,
                        content,
                        featuredImage,
                        status
                    }
                )
            } catch (error) {
                console.log("Error at appwrite::updateDocument: ",error)
            }
        }

        async deleteDocument(slug) {
            try {
                await this.databases.deleteDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,  // ✅ Fix typo
                    slug
                );
                return true; // ✅ Now reachable
            } catch (error) {
                console.log("Error at appwrite::deleteDocument: ", error);
                return false;
            }
        }
        

        async getPost(slug){
            try {
                return await this.databases.getDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    slug
                );
            } catch (error) {
                console.log("Error at appwrite::getPost: ",error);
            }
        }

        async getPosts(queries=[Query.equal("status","active")]){
            try {
                return await this.databases.listDocuments(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    queries
                )
            } catch (error) {
                console.log("Error at appwrite:: getPosts: ",error);
            }
        

        }

        //file services

        async uploadFile(file){
            try {
            return await this.bucket.createFile(
                    conf.appwriteBucketId,
                    ID.unique(),
                    file
                );
            } catch (error) {
                console.log("Error at appwrite::uploadFile: ",error);
            }
        }   

        async deleteFile(fileId) {
            try {
                await this.bucket.deleteFile(
                    conf.appwriteBucketId,
                    fileId
                );
                return true;
            } catch (error) {
                console.log("Appwrite service :: deleteFile :: error", error);
                return false;
            }
        }
        

        getFilePreview(fileId) {
            return this.bucket.getFilePreview(
                conf.appwriteBucketId, 
                fileId);
        }

        downloadFile(fileId) {  
            return this.bucket.downloadFile(
                conf.appwriteBucketId,
                fileId
            )
        }
}


const service = new Service();


export default service