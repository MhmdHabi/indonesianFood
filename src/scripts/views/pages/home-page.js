import TheRestaurantSource from "../../data/therestaurant-source";
import CONFIG from "../../globals/config";
import "../components/hero-section";
import "../components/about-section";
import "../components/restaurant-list";
import "../components/galerry-section";

const HomePage = {
  visibleCount: 3,
  showAll: false,

  async render() {
    return `
      <hero-section></hero-section>
      <about-section></about-section>
      <restaurant-list></restaurant-list> 
      <gallery-section></gallery-section>
    `;
  },

  async afterRender() {
    const restaurantsContainer = document.getElementById("restaurants");
    const showMoreButton = document.getElementById("show-more");
    const exploreButton = document.getElementById("explore-button");
    let restaurants = [];

    try {
      restaurants = await TheRestaurantSource.getRestaurants();
      this.displayRestaurants(restaurants, this.visibleCount);

      exploreButton.addEventListener("click", (event) => {
        event.preventDefault();
        document.getElementById("restaurant-list").scrollIntoView({ behavior: "smooth" });
      });

      showMoreButton.addEventListener("click", () => {
        this.showAll = !this.showAll;
        this.updateDisplay(restaurants);
      });
    } catch (error) {
      console.error("Failed to fetch restaurant data:", error);
      restaurantsContainer.innerHTML = `<p>Error loading restaurants: ${error.message}</p>`;
    }
  },

  displayRestaurants(restaurants, count) {
    const restaurantsContainer = document.getElementById("restaurants");
    restaurantsContainer.innerHTML = "";

    const visibleRestaurants = this.showAll ? restaurants : restaurants.slice(0, count);
    visibleRestaurants.forEach((restaurant) => {
      const restaurantItem = document.createElement("div");
      restaurantItem.classList.add("restaurant-item");
      restaurantItem.innerHTML = `
          <div class="city">${restaurant.city}</div>
          <picture>
            <source media="(max-width: 680px)" data-src="${CONFIG.IMAGE_BASE_URL}${restaurant.pictureId}" />
            <img class="restaurant-image lazyload" src="${CONFIG.IMAGE_BASE_URL}${restaurant.pictureId}" alt="${restaurant.name}" />
          </picture>
          <article>
            <div class="restaurant-rating">
                </i>${restaurant.rating} ⭐
            </div>
            <h3 class="resto-title">${restaurant.name}</h3>
            <p class="description">${restaurant.description}</p>
            <a class="resto-detail" href="#/detail/${restaurant.id}">View Details</a>
          </article>
      `;
      restaurantsContainer.appendChild(restaurantItem);
    });
  },

  updateDisplay(restaurants) {
    this.displayRestaurants(restaurants, this.visibleCount);
    const showMoreButton = document.getElementById("show-more");
    showMoreButton.textContent = this.showAll ? "Show Less" : "Show More";
  },
};

export default HomePage;
