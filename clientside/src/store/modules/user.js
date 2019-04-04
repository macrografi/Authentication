import Vue from "vue";

const state = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  userId: null,
  isLoggedIn: false,
  loginError: "",
  isRegister: false,
  registerError: "",
  token: null,
  isLogout: false
};

const getters = {
  isLoggedIn: state => state.isLoggedIn,
  isLogout: state => state.isLogout,
  userId: state => state.userId,
  loginError: state => state.loginError,
  isRegister: state => state.isRegister,
  registerError: state => state.registerError
};

const actions = {
  async loginEnter({ commit }, payload) {
    await Vue.axios
      .post("http://localhost:8000/user/login", payload)
      .then(resp => {
        let data = resp.data;

        if (data) {
          localStorage.setItem('token', data.token);
          commit("loginEnter", payload);
          commit('updateAccessToken', data.token);
        }
        else {
          commit("loginError", payload);
          commit('updateAccessToken', null);
        }
      })
      .catch(() => {
        commit("loginError", payload);
        commit('updateAccessToken', null);
      });
  },
  fetchAccessToken({ commit }) {
    commit('updateAccessToken', localStorage.getItem('token'));
  },
  async registerEnter({ commit }, payload) {
    await Vue.axios
      .post("http://localhost:8000/user", payload)
      .then(resp => {
        if (resp.status === 200) {
          if (resp.statusText === "OK") {
            // console.log(resp.status,resp.statusText);
            commit("registerEnter", payload);
          }
          else {
            commit("registerError", payload);
          }
        }
      })
      .catch(() => {
        commit("registerError", payload);
      });
  },
  logoutEnter({ commit }) {
    commit("logoutEnter")
     commit('updateAccessToken', localStorage.removeItem('token'));
  }
};

const mutations = {
  loginEnter(state, payload) {
    state.email = payload.email;
    state.userId = payload.userId;
    //Login true
    state.isLoggedIn = true;
  },
  logoutEnter(state, token){
    state.accessToken = token;
    state.isLogout = true;
  },
  loginError(state) {
    //login false
    state.isLoggedIn = false;
    state.loginError = "Email and/or Password are invalid. Login failed.";
  },
  registerEnter(state, payload) {
    state.firstName = payload.firstName;
    state.lastName = payload.lastName;
    state.password = payload.password;
    state.email = payload.email;
    state.isRegister = true;
  },
  registerError(state) {
    state.isRegister = false;
    state.registerError = "Register failed.";
  },
  updateAccessToken: (state, token) => {
    state.accessToken = token;
    // state.isLogout = true;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
