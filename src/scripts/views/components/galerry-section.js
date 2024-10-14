class GallerySection extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <section class="gallery-section">
        <h2 class="gallery-title">Galeri Kami</h2>
        <p>Jelajahi keindahan kuliner kami melalui foto-foto yang menggugah selera.</p>
        <div class="gallery-grid">
          <div class="gallery-item gallery-item-1">
            <img data-src="./images/gallery/hero-image_1.jpg" alt="Gallery Image 1" class="lazyload" />
          </div>
          <div class="gallery-item gallery-item-2">
            <img data-src="./images/gallery/hero-image_2.jpg" alt="Gallery Image 2" class="lazyload" />
          </div>
          <div class="gallery-item gallery-item-3">
            <img data-src="./images/gallery/hero-image_3.jpg" alt="Gallery Image 3" class="lazyload" />
          </div>
          <div class="gallery-item gallery-item-4">
            <img data-src="./images/gallery/hero-image_4.jpg" alt="Gallery Image 4" class="lazyload" />
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('gallery-section', GallerySection);
