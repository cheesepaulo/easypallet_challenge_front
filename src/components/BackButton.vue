<template>
  <v-btn class="ml-5 default mt-4" @click="$router.go(-1)">
    <v-icon left>mdi-arrow-left</v-icon>Voltar
  </v-btn>
</template>

<script>
export default {
  name: "BackButton"
};
</script>

<style>
</style>