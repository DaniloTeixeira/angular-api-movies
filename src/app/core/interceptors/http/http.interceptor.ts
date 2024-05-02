import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize } from 'rxjs';
import { API_INFO } from '../../data/api-info';
import { LoaderService } from '../../services/loader';
import { NotificationService } from '../../services/notification';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);
  const bearerToken = API_INFO.READ_ACCESS_TOKEN;
  const notification = inject(NotificationService);

  loaderService.show();

  req = req.clone({
    headers: req.headers.set('Authorization', bearerToken),
    setParams: { language: 'en-US' },
  });

  return next(req).pipe(
    catchError((e: HttpErrorResponse) => {
      if (e.status >= 400) {
        notification.error(`Error ${e.status} - ${e.error.status_message}`);
      }
      throw new Error(e.error);
    }),
    finalize(() => {
      loaderService.hide();
    })
  );
};
