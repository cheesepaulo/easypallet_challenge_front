<template>
  <v-app>
    <Navigation />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Navigation from "./components/layout/Navigation";

export default {
  name: "App",
  components: { Navigation }
};
</script>
