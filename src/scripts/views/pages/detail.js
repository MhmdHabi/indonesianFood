import TheRestaurantSource from "../../data/therestaurant-source";
import CONFIG from "../../globals/config";
import LikeButtonRestaurant from "../../utils/favorite-button-resto";
import FavoriteRestaurantIdb from "../../data/favorite-restaurant-idb";
import LoadingIndicator from "../components/loading-indicator";
import { createLikeButtonTemplate } from "../templates/template-creator";

const Detail = {
  async render() {
    return `
      <div class="restaurant-detail">
        <h2 class="page-title">Detail Restaurant</h2>
        ${LoadingIndicator.render()} 
        <a href="#/" class="back-button" id="backButton">← Kembali ke Beranda</a>
        <div id="restaurant"></div>
      </div>
      <div id="likeButtonContainer"></div>
      <div id="reviewFormContainer"></div>
    `;
  },

  async afterRender() {
    const url = window.location.hash.split("/")[2];
    const backButton = document.getElementById("backButton");

    LoadingIndicator.show();
    backButton.style.display = "none";

    setTimeout(async () => {
      const restaurant = await TheRestaurantSource.getRestaurantDetail(url);
      this._displayRestaurantDetail(restaurant);

      LoadingIndicator.hide();
      backButton.style.display = "block";

      const likeButtonContainer = document.querySelector("#likeButtonContainer");
      likeButtonContainer.innerHTML = createLikeButtonTemplate();

      LikeButtonRestaurant.init({
        likeButtonContainer: document.querySelector("#likeButtonContainer"),
        favoriteRestaurant: FavoriteRestaurantIdb,
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          rating: restaurant.rating,
          city: restaurant.city,
          description: restaurant.description,
          pictureId: restaurant.pictureId,
        },
      });

      this._renderReviewForm(restaurant.id);
    }, 500);
  },

  _generateRatingStars(rating) {
    const maxStars = 5;
    let stars = "";

    for (let i = 0; i < Math.floor(rating); i++) {
      stars += "⭐";
    }

    if (rating % 1 !== 0) {
      stars += "⭐️";
    }

    for (let i = Math.ceil(rating); i < maxStars; i++) {
      stars += "☆";
    }

    return stars;
  },

  _displayRestaurantDetail(restaurant) {
    const restaurantContainer = document.getElementById("restaurant");
    restaurantContainer.innerHTML = `\
     <picture>
          <source media="(max-width: 680px)" data-src="${CONFIG.IMAGE_BASE_URL}${restaurant.pictureId}" />
          <img class="restaurant-image lazyload" data-src="${CONFIG.IMAGE_BASE_URL}${restaurant.pictureId}" alt="${restaurant.name}" />
      </picture>
      <h2 class="restaurant-name">${restaurant.name}</h2>

      <div class="restaurant-rating">
        <span>Rating: ${restaurant.rating}</span>
        <span class="rating-stars">${this._generateRatingStars(restaurant.rating)}</span>
      </div>

      <div class="restaurant-categories">
        <ul class="category-list">
          ${restaurant.categories.map((category) => `<li>${category.name}</li>`).join("")}
        </ul>
      </div>

      <p class="restaurant-address">${restaurant.address}, ${restaurant.city}</p>
      <p class="restaurant-description">${restaurant.description}</p>

      <div class="menu-section">
        <h3>Menu Makanan</h3>
        <ul class="menu-list">
          ${restaurant.menus.foods.map((food) => `<li>${food.name}</li>`).join("")}
        </ul>
      </div>

      <div class="menu-section">
        <h3>Menu Minuman</h3>
        <ul class="menu-list">
          ${restaurant.menus.drinks.map((drink) => `<li>${drink.name}</li>`).join("")}
        </ul>
      </div>

      <h3>Customer Reviews</h3>
      <ul class="review-list">
        ${restaurant.customerReviews
          .map(
            (review) => `
            <li class="review-item">
              <div class="review-header">
                <strong class="review-name">${review.name}</strong>
                <span class="review-date">${review.date}</span>
              </div>
              <p class="review-text">${review.review}</p>
            </li>`
          )
          .join("")}
      </ul>
    `;
  },

  _renderReviewForm(restaurantId) {
    const reviewFormContainer = document.getElementById("reviewFormContainer");
    reviewFormContainer.innerHTML = `
      <h3>Tambah Review</h3>
      <form id="reviewForm">
        <div class="form-group">
          <label for="name">Nama</label>
          <input type="text" id="name" name="name" class="form-input" required />
        </div>
        <div class="form-group">
          <label for="review">Review</label>
          <textarea id="review" name="review" class="form-input" required></textarea>
        </div>
        <button type="submit" class="submit-button">Kirim Review</button>
      </form>
    `;

    const reviewForm = document.getElementById("reviewForm");
    reviewForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const name = document.getElementById("name").value;
      const review = document.getElementById("review").value;

      const reviewData = {
        id: restaurantId,
        name,
        review,
      };

      try {
        const updatedReviews = await TheRestaurantSource.addReview(reviewData);
        this._updateCustomerReviews(updatedReviews);
      } catch (error) {
        console.error("Error submitting review:", error.message);
      }
    });
  },

  _updateCustomerReviews(reviews) {
    const reviewList = document.querySelector(".review-list");
    reviewList.innerHTML = reviews
      .map(
        (review) => `
          <li class="review-item">
            <div class="review-header">
              <strong class="review-name">${review.name}</strong>
              <span class="review-date">${review.date}</span>
            </div>
            <p class="review-text">${review.review}</p>
          </li>`
      )
      .join("");
  },
};

export default Detail;
