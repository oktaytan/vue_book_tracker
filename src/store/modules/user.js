import { ax } from '../../util/settings';

const state = {
  userInfo: {},
  isLogin: false,
  categories: [],
  books: []
};

const getters = {
  getUser: state => state.userInfo,
  fetchCategories: state => state.categories,
  fetchBooks: state => state.books[0],
  isLogin: state => state.isLogin
};

const actions = {
  registerAction: ({ commit }, user) => {
    return new Promise((resolve, reject) => {
      ax.post('/auth/register', user)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        })
    })
  },
  loginAction: ({ commit }, user) => {
    return new Promise((resolve, reject) => {
      ax.post('/auth/login', user)
        .then(res => {
          localStorage.setItem('user', JSON.stringify(res.data));
          commit('login');
          resolve();
        })
        .catch(err => {
          reject(err);
        })
    })
  },
  hasToken: ({ commit }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user === null) {
      commit('logout');
    } else {
      commit('login');
    }
  },
  logoutAction: ({ commit }) => {
    return new Promise((resolve, reject) => {
      localStorage.removeItem('user');
      commit('logout');
      resolve(true);
    })
  },
  getCategoriesAction: ({ commit }) => {
    return new Promise((resolve, reject) => {
      ax.get('/books')
        .then(res => {
          commit('setCategories', res.data[0]);
          resolve();
        })
        .catch(err => reject(err))
    })
  },
  addCategoryAction: ({ commit }, newCategory) => {
    return new Promise((resolve, reject) => {
      ax.post('/books', newCategory)
        .then(res => {
          resolve();
        })
        .catch(err => reject(err))
    })
  },
  deleteCategoryAction: ({ commit }, id) => {
    return new Promise((resolve, reject) => {
      ax.post(`/books/${id}`)
        .then(res => {
          resolve();
        })
        .catch(err => reject(err))
    })
  },
  getBooksAction: ({ commit }, id) => commit('getBooks', id)
};

const mutations = {
  login: (state) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user !== null) {
      state.userInfo = user;
      state.isLogin = true;
    }
  },
  setLogin: (state, value) => state.isLogin = value,
  logout: state => {
    state.userInfo = null,
      state.isLogin = false
  },
  setCategories: (state, data) => state.categories = data.categories,
  getBooks: (state, id) => {
    state.books = state.categories.filter(item => item.category_id === id).map(list => list.books)
  }
};


export default {
  state,
  getters,
  mutations,
  actions
}