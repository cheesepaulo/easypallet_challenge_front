<template>
  <v-app>
    <Navbar />
    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "./components/layout/Navbar";

export default {
  name: "App",

  components: { Navbar }
};
</script>
