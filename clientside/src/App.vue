<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">Auth.</b-navbar-brand>
      <b-navbar-toggle target="nav_collapse"/>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item router-link to="/">Home</b-nav-item>
          <b-nav-item router-link to="/about">About</b-nav-item>

          <b-nav-item v-if="!isLogin" router-link to="/login">
            <i class="material-icons md-18 orange600">person</i>
            Login
          </b-nav-item>
          <b-nav-item v-if="!isLogin" router-link to="/register">
            <i class="material-icons md-18 orange600">person_add</i>
            Register
          </b-nav-item>
          <b-nav-item-dropdown v-if="isLogin" right>
            <template slot="button-content">Welcome User</template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#" @click="logout">Signout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-jumbotron>
      <router-view/>
    </b-jumbotron>

    <p>Login bool: "{{ isLogin }}"</p>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  computed: {
    isLogout() {
      return this.$store.getters.isLogout;
    },
    isLogin() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logoutEnter").then(() => {
        if (this.isLogout) {
          this.$router.push({ path: "/" });
        }
      });
    },
    ...mapActions(["fetchAccessToken"])
  },
  created() {
    this.fetchAccessToken();
  }
};
</script>

<style lang="scss">
@import "../node_modules/vuetify/dist/vuetify.min.css";
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons");

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
