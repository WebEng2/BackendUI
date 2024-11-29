
import HomePage from '../pages/home.jsx';
import BookView from '../pages/book-view.jsx';
import AboutPage from '../pages/about.jsx';

import DynamicRoutePage from '../pages/dynamic-route.jsx';
import NotFoundPage from '../pages/404.jsx';
import path from 'path';

var routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/book-view/',
    component: BookView,
  },
  {
    path: '/about/',
    component: AboutPage,
  },
  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
