import { ax } from '../../util/settings';

const state = {
  user: {},
  isLogin: false,
};

const getters = {
  getUser: state => state.user,
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
  }
};

const mutations = {
  login: (state) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user !== null) {
      state.user = user;
      state.isLogin = true;
    }
  },
  setLogin: (state, value) => state.isLogin = value,
  logout: state => {
    state.user = null,
      state.isLogin = false
  }
};


export default {
  state,
  getters,
  mutations,
  actions
}