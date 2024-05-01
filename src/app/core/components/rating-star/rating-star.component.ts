import { Component, Input, OnInit } from '@angular/core';
import { RATING_STARS } from '../../data/rating-stars';

@Component({
  selector: 'app-rating-star',
  templateUrl: './rating-star.component.html',
  styleUrls: ['./rating-star.component.scss'],
})
export class RatingStarComponent implements OnInit {
  @Input({ required: true }) rating!: number;

  protected ratingStars!: string[];

  ngOnInit(): void {
    this.setRatingStars();
  }

  setRatingStars(): void {
    const ratingIndex = Math.min(Math.floor(this.rating), 10);
    const ratingStar: { [key: number]: number } = {
      10: 9,
      9: 8,
      8: 7,
      7: 6,
      6: 5,
      5: 4,
      4: 3,
      3: 2,
      2: 1,
      1: 0,
    };

    this.ratingStars = RATING_STARS[ratingStar[ratingIndex]];
  }
}
