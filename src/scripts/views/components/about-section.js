class AboutSection extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
           <section class="about-cuisine">
                <article class="about-text">
                <h2>Nikmati <span>Keberagaman Kuliner Nusantara</span> Yang Kaya Akan Cita Rasa.</h2>
                <p>
                    Selamat datang di dunia masakan Indonesia, di mana cita rasa yang kaya dan aroma yang menggoda menjadi satu. Masakan kami adalah perayaan keanekaragaman budaya, dipenuhi dengan bumbu segar dan bahan alami yang dipilih dengan
                    teliti.
                </p>
                </article>
                <div class="about-images">
                <div class="image-left">
                    <aside>
                    <img class="lazyload" data-src="./images/gallery/hero-image_1.jpg" alt="Cuisine Image 1" />
                    </aside>
                    <aside>
                    <img class="lazyload" data-src="./images/gallery/hero-image_3.jpg" alt="Cuisine Image 2" />
                    </aside>
                </div>
                <div class="image-right">
                    <img class="lazyload" data-src="./images/gallery/hero-image_2.jpg" alt="Cuisine Image 3" />
                </div>
                </div>
            </section>
        `;
  }
}

customElements.define('about-section', AboutSection);
