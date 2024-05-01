import { Component, inject } from '@angular/core';
import { LoaderService } from '../../services/loader';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  public showLoader$ = inject(LoaderService).showLoader$;
}
