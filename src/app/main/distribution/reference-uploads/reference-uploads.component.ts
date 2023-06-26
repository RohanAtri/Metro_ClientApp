import { HttpEventType, HttpParams, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { UploadOptionTypes, UploadTypes } from '../../dashboard/uploadTypes';
import { ReferenceUploadService } from '../../master/services/referenceUploadService';
import { UploadFile } from '../models/uploadFile';
import { configMessages } from './messages';
import { Model } from './model';

@Component({
  selector: 'app-reference-uploads',
  templateUrl: './reference-uploads.component.html',
  styleUrls: ['./reference-uploads.component.scss']
})
export class ReferenceUploadsComponent implements OnInit {

  public message: string = ''
  public file: File;
  public fileName: string = '';
  public formData: any;
  public hasFile: boolean = false;
  public uploadTypes = UploadTypes;
  public selectedType: any;
  public allowedExtension = ['csv', 'xls', 'xlsx'];
  public enumKeys: Array<any> = [];
  public status: string;
  public subscription: Subscription = new Subscription();
  public errorMessage: string;
  public processedFile: UploadFile = <UploadFile>{};
  public isFileProcessed: boolean = false;
  public isFilePosted: boolean = false;
  public data: any;
  public isLoading = false;

  public statusClass: string;

  @ViewChild('file') files: ElementRef;

  constructor(private referenceUploadService: ReferenceUploadService,
    private modalService: NgbModal,
    private model: Model) {

    this.data = this.model.name;
    var uploadTypes = new UploadOptionTypes();
    this.enumKeys = uploadTypes.getData(this.data);
    // this.model.updated.subscribe(name => {

    // })

  }

  ngOnInit(): void {
    this.hasUploadingPending();
  }

  uploadFile(files: any) {
    this.isLoading = true;
    this.status = '';

    if (files.length === 0) {
      return;
    }

    this.hasFile = true;
    this.file = <File>files[0];
    this.fileName = this.file.name;
    let extension = this.file.name.split('.').pop()!;

    if (this.allowedExtension.indexOf(extension) !== -1) {
      this.formData = new FormData();
      this.formData.append('file', this.file, this.file.name);
      this.formData.append('uploadTypes', `${this.selectedType}`);
      this.upload();
    } else {
      //todo
      this.status = `${extension} is not allowed`;
    }

  }

  upload() {
    this.statusClass = '';
    this.status = '';
    this.status = configMessages.Progress;
    this.isFilePosted = true;
    this.subscription.add(
      this.referenceUploadService.uploadReferenceFile(this.formData).subscribe(
        (response) => {
          // console.log('File Uploaded Successfully');
          // this.isLoading = false;
          // this.hasUploadingPending();
        }, (error) => {
          this.errorMessage = configMessages.ErrorMessage
          this.status = ''
          console.error(error);
        }))
  }

  downLoadFile(data: any, type: string) {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.setAttribute('style', 'display:none');

    let blob = new Blob([data], { type: type });
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);

    a.href = url;
    a.download = "test.xlsx";
    a.click();

    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert('Please disable your Pop-up blocker and try again.');
    }
  }

  changeDropdownName(value: number) {
    this.selectedType = value;
  }

  clear() {
    this.status = '';
    this.selectedType = null;
    this.formData = new FormData();
    this.fileName = '';
    this.hasFile = false;
    this.files.nativeElement.value = null;
  }

  public closeModal() {
    this.modalService.dismissAll();
  }

  public hasUploadingPending() {
    this.subscription.add(
      this.referenceUploadService.getLastUploadedFileDetails().subscribe((response: any) => {
        this.isLoading = false;
        this.processedFile = response;

        if (response === null) {
          this.isFileProcessed = true;
        }else if(response == -1){
          this.isLoading = true;
        } else if (response) {
          this.isFileProcessed = this.processedFile.status === 1 ? false : true;
        }
      }, (error) => {
        console.log(error)
      })
    );
  }

  downloadProcessedFile() {
    var httpParams = new HttpParams();
    httpParams = httpParams.set("fileID", this.processedFile.fileId);
    this.referenceUploadService.downloadLastUploadedFile(this.processedFile.fileId);
  }
}
