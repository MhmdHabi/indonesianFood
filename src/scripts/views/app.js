import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor() {
    this._hamburgerButton = document.getElementById('hamburgerButton');
    this._drawerMenu = document.getElementById('drawer-menu');
    this._content = document.getElementById('main-content');

    // Initialize the drawer
    this._initDrawer();
  }

  _initDrawer() {
    DrawerInitiator.init({
      button: this._hamburgerButton,
      drawer: this._drawerMenu,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    document.querySelector('#main-content').innerHTML = await page.render();
    await page.afterRender();
    const skipLinkElem = document.querySelector('.skip-to-content');
    skipLinkElem.addEventListener('click', (event) => {
      event.preventDefault();
      document.querySelector('#main-content').focus();
    });
  }
}

export default App;
