<template>
  <v-app>
    <Navbar />
    <v-content>
      <v-container class="mt-10">
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
