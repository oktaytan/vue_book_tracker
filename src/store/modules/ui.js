const state = {
  drawer: false,
  notification: {
    display: false,
    text: 'Notification placeholder text',
    timeout: 3000,
    class: 'success'
  },
  colors: {
    primary: '#2680C2',
    secondary: '#DE911D',
    bg: '#f0f4f8',
    text: '#486581',
  }
};

const getters = {
  getDrawer: state => state.drawer,
  notification: state => state.notification,
  getColors: state => state.colors
};

const actions = {
  workDrawer: ({ commit }, value) => commit('setDrawer', value),
  workNotification: ({ commit }, value) => commit('setNotification', value),
};

const mutations = {
  setDrawer: (state, payload) => state.drawer = payload,
  setNotification: (state, { display, text, alertClass, timeout }) => {
    return new Promise((resolve, reject) => {
      state.notification.display = display;
      state.notification.text = text;
      state.notification.class = alertClass;
      state.notification.timeout = timeout;
      resolve();
    })
  },
};


export default {
  state,
  getters,
  mutations,
  actions
}