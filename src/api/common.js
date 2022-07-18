
export default{
    UPLOAD_FILE_URL: "/api/file/upload",
    getUploadFileUrl(){
        return process.env.VUE_APP_BASE_API + this.UPLOAD_FILE_URL;
    }
}