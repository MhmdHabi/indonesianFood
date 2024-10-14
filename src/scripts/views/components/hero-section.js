class HeroSection extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
           <section class="hero">
                <article class="hero-text">
                <h1>Welcome to Indonesian Food</h1>
                <p>Jelajahi restoran terbaik di daerah Anda.</p>
                <button id="explore-button"><a href="#">Explore Now</a></button>
                </article>
            </section>
        `;
  }
}

customElements.define("hero-section", HeroSection);
