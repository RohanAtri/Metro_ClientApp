import { UploadTypes } from "../../dashboard/uploadTypes";

export interface UploadFile {
    fileId: string;
    fileName: string;
    fileDataType: UploadTypes;
    status: UploadStatus;
    filePath: string;
    fileSize: number;
    fileExtension: string
    uploadedBy: number;
    uploadedAt: Date;
    totalRecord: number;
    success: number;
    error: number
    lastUpdatedAt: Date;
    lastUpdatedBy: number
}

export enum UploadStatus {
    UPLOADING = 1,
    UPLOADED = 2,
    FAILED = 3
}