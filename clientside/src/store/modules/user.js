import Vue from "vue";

const state = {
  email: "",
  userId: null,
  isLoggedIn: false,
  loginError: ""
};

const getters = {
  isLoggedIn: state => state.isLoggedIn,
  userId: state => state.userId,
  loginError: state => state.loginError
};

const actions = {
  async loginEnter({ commit }, payload) {
    await Vue.axios
      .get("http://localhost:8000/user/email/" + payload.email)
      .then(resp => {
        let data = resp.data;
        console.log(data);
        if (data && data.length > 0) {
          if (data[0].password === payload.password) {
            payload.userId = data[0]._id;
            commit("loginEnter", payload);
          } 
          else {
            commit("loginError", payload);
          }
        }
      })
      .catch(() => {
        commit("loginError", payload);
      });
  }
};

const mutations = {
  loginEnter(state, payload) {
    state.email = payload.email;
    state.userId = payload.userId;
    //Login true
    state.isLoggedIn = true;
  },
  loginError(state) {
    //login false
    state.isLoggedIn = false;
    state.loginError = "Email and/or Password are invalid. Login failed.";
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
