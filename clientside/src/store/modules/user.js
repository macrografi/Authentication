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
  registerError: ""
};

const getters = {
  isLoggedIn: state => state.isLoggedIn,
  userId: state => state.userId,
  loginError: state => state.loginError,

  isRegister: state => state.isRegister,
  registerError: state => state.registerError
};

const actions = {
  async loginEnter({ commit }, payload) {
    await Vue.axios
      .get("http://localhost:8000/user/email/" + payload.email)
      .then(resp => {
        let data = resp.data;
        if (data && data.length > 0) {
          console.log(data, data.length);
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
  },
  registerEnter(state, payload) {
    state.firstName = payload.firstName;
    state.lastName = payload.lastName;
    state.password = payload.password;
    state.email = payload.email;

    state.isRegister = true;
    console.log(payload);
  },
  registerError(state) {
    state.isRegister = false;
    state.registerError = "Register failed.";
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
