class DrawerInitiator {
  static init({ button, drawer }) {
    button.addEventListener('click', (event) => {
      this._toggleDrawer(event, drawer);
    });

    document.addEventListener('click', (event) => {
      if (!drawer.contains(event.target) && !button.contains(event.target)) {
        drawer.classList.remove('open');
      }
    });
  }

  static _toggleDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.toggle('open');
  }
}

export default DrawerInitiator;
