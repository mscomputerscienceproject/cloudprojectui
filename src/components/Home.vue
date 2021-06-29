<template>
 <div id="app">
  <v-card class="elevation-0">
    <v-container class="grid-list-xl fluid ma-0 pa-9">
      <v-layout row wrap>
        <v-col v-for="card in cards" :key="card.title" :cols="card.flex" auto @click="navigateTo(card)"> 
          <v-card color="#79B7D1" dark >
          <v-img :src="card.src" class="white--text align-top" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="100%" width= "100%">
            <v-card-title v-text="card.title" class="caption"></v-card-title>
          </v-img>
          </v-card>
        </v-col>
      </v-layout>
    </v-container>
  </v-card>
 </div>
</template>

<script>
  export default {
    data: () => ({
      cards: [
        //  <!--{ title: 'Payments', src: 'https://www.freeiconspng.com/uploads/money-icon-21.png', flex: 6 },
        { title: 'Login', src: require('@/assets/login.png'),  route: 'Signin'},
        { title: 'Register', src: require('@/assets/register.png'),  route: 'Enrollment'},
        { title: 'Profile', src: require('@/assets/profile.png'), route: 'Profile'},
        { title: 'MembershipList', src: require('@/assets/dashboard.png'), route: 'MembershipList'},        
        { title: 'Events', src: require('@/assets/events.png'), route: 'Events'},
        { title: 'Payments', src: require('@/assets/payments.png'), route: 'Payments'},
        { title: 'Contactus', src: require('@/assets/aboutus.png'), route: 'Contactus'},
        { title: 'AboutUs', src: require('@/assets/contactus.png'), route: 'AboutUs'}
      ]
    }),
    methods: {
     navigateTo (card) {
      this.$router.push({name: card.route})
      }
    },
  }
</script>