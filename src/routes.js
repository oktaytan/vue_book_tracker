import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import BookTracker from './components/BookTracker';
import Books from './components/Books';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: BookTracker,
    name: 'bookTracker',
    children: [
      {
        name: 'books',
        path: 'books/:id',
        component: Books
      }
    ]
  },
  {
    path: '/login',
    component: Login,
    name: 'login',
  },
  {
    path: '/signup',
    component: Signup,
    name: 'signup'
  }
];

const router = new VueRouter({
  mode: 'history',
  routes,
  base: '/'
});

export default router;