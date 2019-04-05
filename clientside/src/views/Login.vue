<template>
  <b-container class="bv-example-row">
    <b-row class="justify-content-md-center text-left">
      <b-col cols="5">
        <h1>Login</h1>
        <b-form-group id="exampleInputGroup1" label="e-mail" label-for="exampleInput1">
          <b-form-input
            id="exampleInput1"
            type="email"
            v-model="email"
            v-bind:rules="emailRules"
            required
          />
        </b-form-group>
        <b-form-group id="exampleInputGroup2" label="password" label-for="exampleInput2">
          <b-form-input
            id="exampleInput2"
            type="password"
            v-model="password"
            v-bind:rules="passwordRules"
            required
          />
        </b-form-group>
        <b-button type="submit" variant="primary" @click="login">Login</b-button>
      </b-col>
    </b-row>
    <v-snackbar :timeout="6000" :right="true" v-model="showAlert">
      {{ loginError }}
      <v-btn flat color="pink" v-on:click="showAlert = false">Close</v-btn>
    </v-snackbar>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      dialog: true,
      message: "",
      showAlert: false,
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ],
      password: "",
      passwordRules: [v => !!v || "Password is required"]
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    loginError() {
      return this.$store.getters.loginError;
    }
  },
  methods: {
    login: function() {
      const payload = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch("loginEnter", payload).then(() => {
        if (this.isLoggedIn) {
          this.$router.push({ path: "/" });
        } 
        else {
          this.showAlert = true;
        }
      });
    },
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

<style>
</style>

