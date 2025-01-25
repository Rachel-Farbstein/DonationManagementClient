export interface FileDetails {
    fileId: number,
    fileName: string
    s3FileKey: string
    s3FileUrl: string,
    s3BucketName: string,
    contentType: string,
    fileSize: string,
    uploadedAt: Date,
    isDeleted: boolean
}