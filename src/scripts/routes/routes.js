import Favorites from '../views/pages/favorites';
import Detail from '../views/pages/detail';
import HomePage from '../views/pages/home-page';

const routes = {
  '/': HomePage,
  '/favorites': Favorites,
  '/detail/:id': Detail,
};

export default routes;
