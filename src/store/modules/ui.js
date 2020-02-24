const state = {
  drawer: false,
  notification: {
    display: false,
    text: 'Notification placeholder text',
    timeout: 3000,
    class: 'success'
  },
  displaySearchList: false
};

const getters = {
  getDrawer: state => state.drawer,
  notification: state => state.notification,
  getSearchBar: state => state.displaySearchList
};

const actions = {
  workDrawer: ({ commit }, value) => commit('setDrawer', value),
  workNotification: ({ commit }, value) => commit('setNotification', value),
  workSearchBar: ({ commit }, value) => commit('setSearchBar', value),
};

const mutations = {
  setDrawer: (state, payload) => state.drawer = payload,
  setNotification: (state, { display, text, alertClass }) => {
    state.notification.display = display;
    state.notification.text = text;
    state.notification.class = alertClass;
  },
  setSearchBar: (state, payload) => state.displaySearchList = payload
};


export default {
  state,
  getters,
  mutations,
  actions
}