import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { API_INFO } from '../../data/api-info';
import { LoaderService } from '../../services/loader';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);
  const bearerToken = API_INFO.READ_ACCESS_TOKEN;

  loaderService.show();

  req = req.clone({
    headers: req.headers.set('Authorization', bearerToken),
    setParams: { language: 'en-US' },
  });

  return next(req).pipe(
    finalize(() => {
      loaderService.hide();
    })
  );
};
