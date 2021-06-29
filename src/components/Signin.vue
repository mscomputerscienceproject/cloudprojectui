<template>
  <v-container color="white" class="grid-list-xl fluid ma-0 pa-5 elevation-0"><br><br>
    <v-layout row wrap>
      <v-flex xs12 offset-sm1>
      <v-card class="elevation-5">
        <v-alert icon="mdi-lock"  text type="info">Login</v-alert>
          <form @submit.prevent="onSignIn">
            <v-card-text>
              <v-container>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field name="email" label="E-mail" placeholder=" " id="email" v-model="email" type="email" autofocus required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field name="password" label="Password" 
                    :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show3 ? 'text' : 'password'"
                    @click:append="show3 = !show3"
                    class="caption input-group--focused"
                    placeholder=" " id="password" v-model="password" required></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-chip class="caption" label outlined pill color="info" @click="resetPassword()">Forgot Password?</v-chip>
                <v-btn small class="caption info mx-5" :disabled="!formIsValid || loading" :loading="loading" type="submit" @click="onSignIn()">Sign In
                  <span slot="loader" class="custom-loader">
                    <v-icon light>cached</v-icon>
                  </span>
                </v-btn>
              </v-card-actions>
          </form><br>
          <v-alert v-if="error" label class="caption"  dense @click="onDismissed" type="error" >Signin Failed : Invalid Credentials</v-alert>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        email: '',
        show3: false,
        password: ''
      }
    },
    computed: {
      formIsValid () {
        return this.email !== '' && this.password !== ''
      },
      user () {
        return this.$store.getters.user
      },
      loading () {
        return this.$store.getters.loading
      },
      error () {
        return this.$store.getters.error
      }
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          return this.$router.push('/enroll')
        }
      }
    },
    methods: {
      onSignIn () {
        if (!this.formIsValid) return
        let credentials = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('signInAction', credentials)
      },
      onDismissed () {
        this.$store.dispatch('clearError')
      },
      resetPassword() {
        this.$router.replace('/Forgot')
      },
      enroll() {
        this.$router.replace('/Enroll')
      }
    }
  }
</script>