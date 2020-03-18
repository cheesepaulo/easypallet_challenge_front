<template>
  <v-container class="mt-5">
    <h3>List of Loads</h3>
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
            <v-btn text :to="/loads/+load.id">
              <v-icon class="mr-2">mdi-format-list-bulleted-square</v-icon>View Orders
            </v-btn>
          </th>
        </tr>
      </tbody>
    </v-simple-table>
  </v-container>
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