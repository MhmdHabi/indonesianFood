import CONFIG from '../globals/config';
import API_ENDPOINT from '../globals/api-endpoint';

class TheRestaurantSource {
  static async getRestaurants() {
    const response = await fetch(`${CONFIG.API_BASE_URL}/list`);
    const responseJson = await response.json();
    if (responseJson.error) {
      throw new Error(responseJson.message);
    }
    return responseJson.restaurants;
  }

  static async searchRestaurant(query) {
    const response = await fetch(`${CONFIG.API_BASE_URL}/search?q=${query}`);
    const responseJson = await response.json();
    if (responseJson.error) {
      throw new Error(responseJson.message);
    }
    return responseJson.restaurants;
  }

  static async getRestaurantDetail(id) {
    const response = await fetch(API_ENDPOINT.RESTAURANT_DETAIL(id));
    const responseJson = await response.json();
    return responseJson.restaurant;
  }

  // Add review method
  static async addReview(reviewData) {
    const response = await fetch(`${CONFIG.API_BASE_URL}/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    });

    const responseJson = await response.json();
    if (responseJson.error) {
      throw new Error(responseJson.message);
    }

    return responseJson.customerReviews; // Return the updated customer reviews
  }
}

export default TheRestaurantSource;
