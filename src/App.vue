<template>
  <v-app>
    <v-card class="mx-auto overflow-hidden" height="100%" width="100%">
      <v-app-bar dark color="blue darken-2" height="55">
        <v-app-bar-nav-icon
          v-if="this.loggedInUser != 'Member'"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>

        <v-list-item-subtitle class="caption pa-4" @click.stop="goHome()"
          >Final Project</v-list-item-subtitle
        >
        <div v-if="this.loggedInUser" class="caption pa-4">
          {{ this.loggedInUser }}
        </div>
        <v-btn
          v-if="this.loggedInUser"
          small
          rounded
          color="blue darken-2"
          @click.stop="logoutFromFirebase()"
        >
          <v-icon xs-small>mdi-logout-variant</v-icon>
        </v-btn>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        color="blue darken-2"
        dark
        width="10%"
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              Profile
            </v-list-item-title>
            <v-list-item-subtitle></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list dense small>
          <v-list-item
            v-for="item in items"
            :key="item.route"
            @click.stop="navigateTo(item)"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <div class="pa-10" v-if="this.loggedInUser">
          <v-btn
            small
            rounded
            color="blue darken-2"
            @click.stop="logoutFromFirebase()"
            >Log out</v-btn
          >
        </div>
      </v-navigation-drawer>
      <v-card-text>
        <router-view />
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
export default {
  watch: {
    group() {
      this.drawer = false
    },
  },
  computed: {
    items() {
      let items = [
        { title: "Signup", icon: "mdi-account", route: "Signup" },
        { title: "Login", icon: "mdi-lock-open-outline", route: "Signin" },
      ]
      if (this.loggedInUser === "SuperAdmin") {
        items = [
          { title: "Register", icon: "mdi-calendar-month", route: "Enroll" },
        ]
      }
      return items
    },
    loggedInUser() {
      var user = this.$store.getters.email
      if (user) return "SuperAdmin"
      else return null
    },
  },
  methods: {
    goHome() {
      this.$router.replace("/")
    },
    navigateTo(item) {
      this.$router.push({ name: item.route })
    },
    logoutFromFirebase() {
      this.$store
        .dispatch("signOutAction")
        .then(() => this.$router.replace("/Signin"))
    },
  },
  data: () => ({
    dialog: false,
    drawer: false,
    user: "",
  }),
}
</script>
