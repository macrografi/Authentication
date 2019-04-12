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
  token: null
};

const getters = {
  email: state => state.email,
  firstName: state => state.firstName,
  isLoggedIn: state => state.isLoggedIn,
  userId: state => state.userId,
  loginError: state => state.loginError,
  isRegister: state => state.isRegister,
  registerError: state => state.registerError,
  token: state => state.token
};

const actions = {
  async loginEnter({ commit }, payload) {
    await Vue.axios
      .post("http://localhost:8000/user/login", payload)
      .then(resp => {
        let data = resp.data;
        if (data) {
          localStorage.setItem('token', data.token);

          commit('updateAccessToken', data.token);
          commit("loginEnter", payload);

          Vue.axios
            .get("http://localhost:8000/user/email/user1@test.com", data.email)
            .then(
              resp => {
                let data = resp.data;
                console.log(data);

                commit("updateUserinfo", data);
              }
            )
            .catch(() => {
              commit("loginError", payload);
            });
        }
        else {
          commit("loginError", payload);
        }
      })
      .catch(() => {
        commit("loginError", payload);
      });
  },
  logoutEnter({ commit }) {
    commit('updateAccessToken', localStorage.removeItem('token'));
    commit("logoutEnter");
  },
  async registerEnter({ commit }, payload) {
    await Vue.axios
      .post("http://localhost:8000/user/register", payload)
      .then(resp => {
        if (resp.status === 200) {
          if (resp.statusText === "OK") {
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
  fetchAccessToken({ commit }) {
    commit('updateAccessToken', localStorage.getItem('token'));
  }
  // ,
  // async updateUserinfo({ commit }) {
  // }
};

const mutations = {
  loginEnter(state, payload) {
    state.email = payload.email;
    state.userId = payload.userId;
  },
  logoutEnter(state) {
    state.token = null;
    state.isLoggedIn = false;
  },
  loginError(state) {
    state.isLoggedIn = false;
    state.loginError = "Email and/or Password are invalid. Login failed.";
  },
  registerEnter(state, payload) {
    state.firstName = payload.firstName;
    state.lastName = payload.lastName;
    state.isRegister = true;
  },
  registerError(state) {
    state.isRegister = false;
    state.registerError = "Register failed.";
  },
  updateAccessToken(state, token) {
    state.token = token;

    if (token) {
      state.isLoggedIn = true;
    }
  },
  updateUserinfo(state, data) {
    let updateData = data[0];
    
    state.firstName = updateData.firstName;
    state.lastName = updateData.lastName;
    state.password = updateData.password;
    state.email = updateData.email;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
