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
  fetchBooks: state => state.books,
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
          commit('setCategories', res.data);
          resolve();
        })
        .catch(err => reject(err))
    })
  },
  addCategoryAction: ({ commit }, newCategory) => {
    return new Promise((resolve, reject) => {
      ax.post('/books', newCategory)
        .then(res => {
          commit('setCategories', res.data);
          resolve({ status: res.status, message: "Kategori eklendi.", error: false });
        })
        .catch(err => reject({ status: err.response.status, message: 'Bu isimde kategori var.', error: true, }))
    })
  },
  deleteCategoryAction: ({ commit }, id) => {
    return new Promise((resolve, reject) => {
      ax.post(`/books/${id}`)
        .then(res => {
          commit('setCategories', res.data);
          resolve({ status: res.status, message: "Kategori silindi.", error: false });
        })
        .catch(err => reject(err))
    })
  },
  searchCategoriesAction: ({ commit }, text) => commit('searchCategories', text),
  searchBooksAction: ({ commit }, text) => commit('searchBooks', text),
  getBooksAction: ({ commit }, id) => commit('getBooks', id),

  addBookAction: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      ax.post(`/books/category/${payload.category_id}`, { book: payload.book })
        .then(res => {
          commit('setCategories', res.data);
          resolve({ status: res.status, message: "Kitap eklendi.", error: false });
        })
        .catch(err => reject({ status: err.response.status, message: 'Bu isimde kitap var.', error: true, }))
    })
  },
  updateBookAction: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      ax.post(`/books/category/${payload.category_id}/update/${payload.book.book_id}`, payload.book)
        .then(res => {
          commit('setCategories', res.data);
          resolve({ status: res.status, message: "Kitap güncellendi.", error: false });
        })
        .catch(err => reject({ status: err.response.status, message: 'Bir hata oluştu.', error: true, }))
    })
  },
  deleteBookAction: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      ax.post(`/books/category/${payload.category_id}/book/${payload.book_id}`, payload)
        .then(res => {
          commit('setCategories', res.data);
          resolve({ status: res.status, message: "Kitap silindi.", error: false });
        })
        .catch(err => reject({ status: err.response.status, message: 'Bir hata oluştu.', error: true, }))
    })
  },
  changeReadAction: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      ax.post(`/books/category/${payload.category_id}/book/${payload.book_id}`, payload)
        .then(res => {
          commit('setCategories', res.data);
          resolve();
        })
        .catch(err => reject({ status: err.response.status, message: 'Bir hata oluştu.', error: true, }))
    })
  },
  sortBookAction: ({ commit }, payload) => commit('sortBook', payload)
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
  setCategories: (state, data) => state.categories = data,
  searchCategories: (state, text) => {
    state.categories = state.categories.filter(item => item.category.toLowerCase().includes(text.toLowerCase()))
  },
  getBooks: (state, id) => {
    state.books = state.categories.filter(item => item.category_id === id).map(list => list.books)[0]
  },
  searchBooks: (state, text) => {
    state.books = state.books.filter(item => item.title.toLowerCase().includes(text.toLowerCase()) || item.author.toLowerCase().includes(text.toLowerCase()))
  },
  sortBook: (state, data) => {
    switch (data.type) {
      case 'bookName':
        state.books = state.books.sort((a, b) => {
          if (a.title > b.title) {
            return 1;
          } else if (a.title < b.title) {
            return -1;
          }
          return 0;
        });
        break;
      case 'authorName':
        state.books = state.books.sort((a, b) => {
          if (a.author > b.author) {
            return 1;
          } else if (a.author < b.author) {
            return -1;
          }
          return 0;
        });
        break;
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}