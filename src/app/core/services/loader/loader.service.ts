import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private _showLoader$ = new BehaviorSubject<boolean>(false);

  showLoader$ = this._showLoader$.asObservable();

  show(): void {
    this._showLoader$.next(true);
  }

  hide(): void {
    this._showLoader$.next(false);
  }
}
