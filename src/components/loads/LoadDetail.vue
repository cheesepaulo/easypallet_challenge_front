<template>
  <v-container class="mt-5">
    <h3>Orders of Load: {{ id }}</h3>
    <v-simple-table>
      <thead>
        <tr>
          <th>Load ID</th>
          <th>Code</th>
          <th>Bay</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <th>{{ order.load_id }}</th>
          <th>{{ order.code }}</th>
          <th>{{ order.bay }}</th>
          <th>
            <template v-if="order.organized === true">
              <v-chip
                :to="/orders/+order.id+'/organized'"
                class="ma-2"
                color="green"
                text-color="white"
              >
                <v-icon class="mr-2">mdi-sort-descending</v-icon>List Organized Products
              </v-chip>
              <v-btn text>
                <v-icon class="mr-2">mdi-sort-ascending</v-icon>Product List
              </v-btn>
            </template>
            <template v-else>
              <v-btn text @click="organizeOrder(order.id)">
                <v-icon class="mr-2">mdi-sort-ascending</v-icon>Organize
              </v-btn>
            </template>
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
      orders: []
    };
  },
  props: ["id"],

  created() {
    this.$api.get("loads/" + this.id).then(res => {
      this.orders = res.data["orders"];
    });
  },

  methods: {
    organizeOrder: function(id) {
      this.$api.post("/order/" + id + "/organize").then(res => {
        console.log(res);
      });
      this.$router.push({ path: "/orders/" + id + "/ordenated" });
    }
  }
};
</script>

<style>
</style>