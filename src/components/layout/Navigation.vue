<template>
  <nav>
    <v-app-bar app dark>
      <v-app-bar-nav-icon @click="toogle()" class="grey--text" />
      <v-toolbar-title class="headline text-uppercase mr-4">
        <span>Easy Pallet</span>
        <span class="font-weight-light ml-2">/ Desafio</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-list class="mt-2">
        <v-subheader>Administração</v-subheader>
        <v-list-item-group>
          <v-list-item to="/loads">
            <v-list-item-icon>
              <v-icon>mdi-package</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Cargas</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/products">
            <v-list-item-icon>
              <v-icon>mdi-package-variant-closed</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Produtos</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      item: 1,
      items: [
        { text: "Real-Time", icon: "mdi-clock" },
        { text: "Audience", icon: "mdi-account" },
        { text: "Conversions", icon: "mdi-flag" }
      ]
    };
  },
  methods: {
    toogle() {
      this.drawer = !this.drawer;
    }
  }
};
</script>

<style>
</style>