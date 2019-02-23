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
  loginEnter({ commit }, payload) {
    if (payload.email === "test1@user.com" && payload.password === "test111") {
      payload.userId = "5a777f0a75f64a1698221d98";

      commit("loginEnter", payload);
    } 
    else {
      commit("loginError");
    }
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
