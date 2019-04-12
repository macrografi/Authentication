<template>
  <b-container class="bv-example-row">
    <b-row class="justify-content-md-center text-left">
      <b-col cols="5">
        <h1>Profile</h1>

        <b-form-group id="exampleInputGroup1" label="first name" label-for="exampleInput1">
          <b-form-input
            id="exampleInput1"
            type="text"
            v-model="firstName"
            v-bind:rules="firstNameRules"
            required
          />
        </b-form-group>

        <b-form-group id="exampleInputGroup2" label="last name" label-for="exampleInput2">
          <b-form-input
            id="exampleInput2"
            type="text"
            v-model="lastName"
            v-bind:rules="lastNameRules"
            required
          />
        </b-form-group>
        <b-form-group id="exampleInputGroup4" label="password" label-for="exampleInput2">
          <b-form-input
            id="exampleInput4"
            type="password"
            v-model="password"
            v-bind:rules="passwordRules"
            required
          />
        </b-form-group>
        <b-button type="submit" variant="primary" @click="register">Save</b-button>
      </b-col>
    </b-row>
    <v-snackbar :timeout="6000" :right="true" v-model="showAlert">
      {{ registerError }}
      <v-btn flat color="pink" v-on:click="showAlert = false">Close</v-btn>
    </v-snackbar>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      dialog: true,
      message: "",
      showAlert: false,
      firstName: "",
      firstNameRules: [v => !!v || "First name is required"],
      lastName: "",
      lastNameRules: [v => !!v || "Last name is required"],
      password: "",
      passwordRules: [v => !!v || "Password is required"]
    };
  },
  computed: {
    isRegister() {
      return this.$store.getters.isRegister;
    },
    registerError() {
      return this.$store.getters.registerError;
    }
  },
  methods: {
    register: function() {
      const payload = {
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password
      };

      this.$store.dispatch("registerEnter", payload).then(() => {
        if (this.isRegister) {
          this.$router.push({ path: "/" });
        } 
        else {
          this.showAlert = true;
        }
      });
    }
  }
};
</script>

<style>
</style>
