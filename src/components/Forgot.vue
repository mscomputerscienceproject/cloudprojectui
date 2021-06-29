<template>
  <v-container class="grid-list-xl fluid ma-1 pa-5"><br><br>
    <v-layout row justify-center>
      <v-flex xs12>
        <v-card class="elevation-10">
          <v-alert border="top" icon="mdi-shield-lock" type="info"  class = "caption elevation=2" text>Forget Password Request
          </v-alert>
            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-alert v-if="showMessage" outlined dense class="caption" type="success">PasswordReset email sent if the email exist in our records.</v-alert>
                <v-alert v-if="popupError" outlined dense class="caption" type="warning">Enter valid Email</v-alert>
                <v-card-text>
                  <v-text-field v-model="email" height="22" :rules="emailRules" label="E-mail" placeholder=" " required></v-text-field>
                </v-card-text>
                  <v-card-actions>
                    <v-chip small label class="ma-2 caption" pill color="primary" outlined @click="signin()">Go to Login</v-chip>
                    <v-spacer></v-spacer>
                    <v-btn dark small label color="info" outlined @click="reset()">Reset</v-btn>
                  </v-card-actions>
              </v-form>
            </v-card-text>
         </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    showMessage: false,
    popupError:  false,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ]
  }),
  methods: {
    signin() {
      this.$router.replace('/Signin')
    },
    reset() {
       if (!(this.email === null || this.email === '')) {
        this.popupError = false
        this.performingRequest = true
        const user = {
          email: this.email
        }
        this.$store.dispatch('sendPasswordResetEmail', user)
        setTimeout(() => {
            this.$router.replace('/Forgot')
            this.showMessage= true
            this.email = ''
          }, 200)
       } else {
          this.popupError = true
       }
    },
  }
}
</script>
