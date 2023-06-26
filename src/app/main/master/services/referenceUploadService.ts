import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppConfigService } from "src/app/services/app-config.service";
import { UploadFile } from "../../distribution/models/uploadFile";
@Injectable({
    providedIn: 'root'
})
export class ReferenceUploadService {

    baseUrl: string;

    constructor(private _httpClient: HttpClient, private appConfigService: AppConfigService) {
        this.baseUrl = this.appConfigService.apiBaseUrl;
    }

    uploadReferenceFile(referenceUpload: FormData): Observable<any> {
        return this._httpClient.post(`${this.baseUrl}/api/referenceupload/Post`, referenceUpload, { responseType: 'arraybuffer' })
    }

    getLastUploadedFileDetails(): Observable<UploadFile> {
        return this._httpClient.get<UploadFile>(`${this.baseUrl}/api/referenceupload/GetUploadedFile`)
    }

    downloadLastUploadedFile(fileId: string) {
        window.open(`${this.baseUrl}/api/referenceupload/GetProcessedFile/${fileId.toString()}`, "_blank");
    }
}