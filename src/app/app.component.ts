import { ViewportScroller } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, ResolveEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly viewPortScroller = inject(ViewportScroller);

  protected showHomeButton!: boolean;

  @ViewChild('pageTop') pageTop!: ElementRef;
  @HostListener('window:scroll', ['$event'])
  onWindowsScroll() {
    const scrollTop =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;

    this.shouldScrollToTopIcon = scrollTop > 400;
  }

  protected shouldScrollToTopIcon!: boolean;

  ngOnInit(): void {
    this.setShowHomeButton();
    this.scrollToTopAfterNavigation();
  }

  scrollToTopAfterNavigation(): void {
    this.router.events
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe(() => this.viewPortScroller.scrollToPosition([0, 0]));
  }

  onScrollToTop(): void {
    this.pageTop.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  private setShowHomeButton(): void {
    this.router.events
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((event) => event instanceof ResolveEnd)
      )
      .subscribe((e) => {
        if (e instanceof ResolveEnd) {
          this.showHomeButton = e.urlAfterRedirects.includes('/details');
        }
      });
  }
}
