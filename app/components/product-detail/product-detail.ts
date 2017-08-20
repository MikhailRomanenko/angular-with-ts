import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product, Review, ProductService} from '../../services/product-service';
import {StarsComponent} from '../stars/stars';

@Component({    
    selector: 'auction-product-page',    
    templateUrl: 'app/components/product-detail/product-detail.html'
})
export class ProductDetailComponent {
    product: Product;
    reviews: Review[];

    newComment: string;
    newRating: number;

    isReviewHidden: boolean = true;

    constructor(route: ActivatedRoute, productService: ProductService) {
        let prodId: number = parseInt(route.snapshot.params['productId']);
        this.product = productService.getProductById(prodId);
        this.reviews = productService.getReviewsForProduct(this.product.id);        
    }

    addReview() {
        let review = new Review(0, this.product.id, new Date(), 'Anonymous',
        this.newRating, this.newComment);
        console.log("Adding review " + JSON.stringify(review));
        this.reviews = [...this.reviews, review];

        this.product.rating = this.averageRating(this.reviews);

        this.resetForm();
    }

    resetForm() {
        this.newRating = 0;
        this.newComment = null;
        this.isReviewHidden = true;
    }

    averageRating(reviews: Review[]) {
        let sum = reviews.reduce((average, review) => average + review.rating, 0);
        return sum / reviews.length;
    }
}