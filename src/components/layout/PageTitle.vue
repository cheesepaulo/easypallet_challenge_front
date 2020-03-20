<template>
  <div class="page-title">
    <h1>
      <v-icon v-if="icon">{{ icon }}</v-icon>
      {{ title }}
    </h1>
    <h2>{{ subtitle }}</h2>
    <v-divider />
  </div>
</template>

<script>
export default {
  props: ["icon", "title", "subtitle"]
};
</script>

<style>
.page-title h1 {
  margin: 0px;
}

.page-title h2 {
  color: #777;
  margin-top: 5px;
  font-size: 1.3rem;
}
</style>