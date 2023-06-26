import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { LoaderService } from './../services/loader.service';
import { ToastService } from './../shared/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptorService implements HttpInterceptor {
  private totalRequests = 0;
  constructor(private loader: LoaderService, public toastService: ToastService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    this.totalRequests++;
    this.loader.setLoading(true);

    return next.handle(request).pipe(
      tap(data => {
        if (request.method !== 'GET') {
          if (data.type == 2 || data.type == 4) {
            this.getStatus(data.status);
          }
        }
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        }
        //this.toastService.show(error.error, { classname: 'bg-danger text-light', delay: 3000 });
        this.loader.setLoading(false);
        return throwError(error);
      }),
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests === 0) {
          this.loader.setLoading(false);
        }
      })

    )
  }

  getStatus(status: number) {
    switch (status) {
      // case 200:
      //   this.toastService.show('Data Updated Successfully', { classname: 'bg-danger text-light', delay: 3000 });
      //   break;
      case 201:
        this.toastService.show('Data Saved Successfully', { classname: 'bg-danger text-light', delay: 3000 });
        break;
      case 204:
        this.toastService.show('No Content Found', { classname: 'bg-danger text-light', delay: 3000 });
        break;
      case 400:
        this.toastService.show('Bad Request', { classname: 'bg-danger text-light', delay: 3000 });
        break;
      case 401:
        this.toastService.show('Unauthorized Access', { classname: 'bg-danger text-light', delay: 3000 });
        break;
      case 202:
        this.toastService.show('Delete Successfully', { classname: 'bg-danger text-light', delay: 3000 });
        break;
    }
  }
}
