<template>
  <v-container color="white" class="grid-list-xl fluid ma-0 pa-5 elevation-0"><br><br>
      <v-layout row wrap v-if="error">
    <v-flex offset-sm0>
      <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
    </v-flex>
    </v-layout>
    <v-layout row wrap>
    <v-flex>
      <v-card class="elevation-10">
        <v-alert icon="mdi-lock"  text type="info">Create User</v-alert>
          <form @submit.prevent="onSignUp">
            <v-card-text>
              <v-container>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field name="email" outlined dense label="E-mail" id="email" v-model="email" background-color="green lighten-5" placeholder=" " type="email" autofocus required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field name="password" outlined dense label="Password" id="password" background-color="green lighten-5" placeholder=" " :rules="nameRules" v-model="password" type="password" required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field name="confirmPassword" outlined dense label="Confirm Password" background-color="green lighten-5" id="confirmPassword" placeholder=" " v-model="confirmPassword" type="password" :rules="[comparePasswords]"></v-text-field>
                  </v-flex>
                </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn small label color="caption success" :disabled="!formIsValid || loading" :loading="loading" type="submit" @click="login()">Sign Up
              <span slot="loader" class="custom-loader">
                <v-icon light>cached</v-icon>
              </span>
            </v-btn>
          </v-card-actions>
        </form>
          <v-alert v-if="error" label class="caption"  dense @click="onDismissed" type="error" >Signin Failed : Invalid Credentials</v-alert>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ReportServices from '@/services/ReportServices'

  export default {
    data: () => ({
      isSuccess: false,
      email: '',
      password: '',
      confirmPassword: '',
      flag: false,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length >= 6) || 'Minimim 6 characters',
      ],
      e13: 1,
      form: false,
      phone: undefined,
      Json: {
        _id: '',
        firstname: '',
        lastname: '',
        primaryemail: '',
        mobile: '',
        address: '',
        secondryphone: '',
        membershipcategory: '',
        paymentstatus: 'Not Paid'
      },
      rules: {
        email: v => (v || '').match(/@/) || 'Please enter a valid email',
        length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
        password: v => (v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) || 'Password must contain an upper case letter, a numeric character, and a special character',
        required: v => !!v || 'This field is required',
      },
    }),
    computed: {
      comparePasswords () {
        return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
      },
      formIsValid () {
        return this.email !== '' && this.password !== '' && this.confirmPassword !== '' && (this.password == this.confirmPassword)
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
        return this.$router.push('/ThankYou')
      }
    }
  },
  methods: {
     onSignUp () {
      if (!this.formIsValid) return
      let credentials = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('signUpAction', credentials)
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    },
    async cleardata () {
      this.Json.firstname = ''
      this.Json.lastname = ''
      this.Json.primaryemail = ''
      this.Json.mobile = ''
      this.Json.address = ''
      this.Json.secondryphone = ''
      this.Json.membershipcategory = ''
      this.Json.paymentstatus = ''
    },
    async submit () {
      if (this.$refs.form.validate()) {
        ReportServices.addmembership(this.Json)
        setTimeout(() => {
          this.e13 = 2
        }, 200)
      }
    }
  }
}
</script>
