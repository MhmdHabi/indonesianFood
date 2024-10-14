class RestaurantList extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
           <section class="restaurant-list" id="restaurant-list">
                <h2>Explore Restaurants</h2>
                <div id="restaurants" class="restaurant-grid"></div>
                <button id="show-more" class="show-more-btn">Show More</button>
            </section>
        `;
  }
}

customElements.define('restaurant-list', RestaurantList);
