<template>
  <v-simple-table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Code</th>
        <th>Delivery Date</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="load in loads" :key="load.id">
        <th>{{ load.id }}</th>
        <th>{{ load.code }}</th>
        <th>{{ load.delivery_date }}</th>
        <th>
          <router-link :to="{ path: 'load/'+ load.id}">Detail</router-link>
        </th>
      </tr>
    </tbody>
  </v-simple-table>
</template>

<script>
export default {
  data() {
    return {
      loads: []
    };
  },

  created() {
    this.$api.get("/loads").then(res => {
      this.loads = res.data;
    });
  }
};
</script>

<style>
</style>