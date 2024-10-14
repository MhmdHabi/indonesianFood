import Swal from "sweetalert2"; // Import SweetAlert2
import FavoriteRestaurantIdb from "../../data/favorite-restaurant-idb";
import CONFIG from "../../globals/config";

const Favorites = {
  async render() {
    return `
      <div class="favorite-restaurants-container">
        <!-- Form pencarian restoran favorit -->
        <div class="search-container">
          <form id="searchForm">
            <input id="searchInput" type="text" placeholder="Cari restoran favorit..." class="search-bar" />
          </form>
        </div>
        <!-- Grid restoran favorit -->
        <div id="favorite-restaurants" class="favorite-restaurant"></div>
      </div>
    `;
  },

  async afterRender() {
    const favoriteRestaurants = await FavoriteRestaurantIdb.getAllRestaurant();
    const restaurantListContainer = document.getElementById("favorite-restaurants");
    const searchInput = document.getElementById("searchInput");

    this._displayRestaurants(favoriteRestaurants);

    // Event listener untuk pencarian
    searchInput.addEventListener("input", (event) => {
      const keyword = event.target.value.toLowerCase();
      const filteredRestaurants = favoriteRestaurants.filter((restaurant) => restaurant.name.toLowerCase().includes(keyword));
      this._displayRestaurants(filteredRestaurants);
    });

    this._addRemoveFavoriteEvent();
  },

  _displayRestaurants(restaurants) {
    const restaurantListContainer = document.getElementById("favorite-restaurants");

    // Jika tidak ada restoran favorit
    if (restaurants.length === 0) {
      restaurantListContainer.innerHTML = `
        <p class="message-not-found">Belum ada restoran favorit.</p>
      `;
      return;
    }

    restaurantListContainer.innerHTML = restaurants
      .map(
        (restaurant) => `
        <div class="restaurant-card">
            <div class="resto-city">${restaurant.city}</div>
            <picture>
              <source media="(max-width: 680px)" data-src="${CONFIG.IMAGE_BASE_URL}${restaurant.pictureId}" />
              <img class="resto-image lazyload" data-src="${CONFIG.IMAGE_BASE_URL}${restaurant.pictureId}" alt="${restaurant.name}" />
            </picture>
            <div class="resto-info">
                <div class="resto-rating">
                   ${restaurant.rating} ⭐
                </div>
                <h3 class="resto-title">${restaurant.name}</h3>
                <p class="resto-deskripsi">${restaurant.description}</p>
                <a class="resto-detail" href="#/detail/${restaurant.id}">View Details</a>
            </div>
            <button class="remove-favorite-button" data-id="${restaurant.id}">Hapus dari Favorit</button>
        </div>
      `
      )
      .join("");

    // Jika hasil pencarian tidak ada
    if (restaurants.length === 0) {
      restaurantListContainer.innerHTML = `
        <p class="message-not-found">Tidak ada pencarian yang cocok.</p>
      `;
    }

    this._addRemoveFavoriteEvent();
  },

  _addRemoveFavoriteEvent() {
    const removeButtons = document.querySelectorAll(".remove-favorite-button");
    removeButtons.forEach((button) => {
      button.addEventListener("click", async (event) => {
        const restaurantId = event.target.dataset.id;
        await FavoriteRestaurantIdb.deleteRestaurant(restaurantId);
        Swal.fire({
          title: "Restoran Dihapus!",
          text: "Restoran dihapus dari favorit.",
          icon: "success",
          confirmButtonText: "OK",
        });

        this.afterRender();
      });
    });
  },
};

export default Favorites;
