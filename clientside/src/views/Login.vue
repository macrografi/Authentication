<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Login</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field label="E-mail" v-model="email" v-bind:rules="emailRules" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Password*" v-model="password" v-bind:rules="passwordRules" v-bind:type="'password'" required></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat v-on:click="cancel">Cancel</v-btn>
            <v-btn color="blue darken-1" flat v-on:click="login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-snackbar :timeout="6000" :top="true" v-model="showAlert">{{loginError}}<v-btn flat color="pink" v-on:click="showAlert = false">Close</v-btn></v-snackbar>
  </v-container>
</template>
6
<script>
export default {
  data() {
    return {
      dialog: true,
      message: "",
      showAlert: false,
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "E-mail must be valid"
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
    cancel: function() {
      console.log("cancel");
    }
  }
};
</script>

<style>
</style>

