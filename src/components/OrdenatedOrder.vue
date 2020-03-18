<template>
  <v-container class="mt-5">
    <h3>List of Products</h3>
    <v-simple-table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Order ID</th>
          <th>Product</th>
          <th>Layer</th>
          <th>Quantity</th>
          <th>Ballast</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="op in ordenated_products" :key="op.id">
          <th>{{ op.id }}</th>
          <th>{{ op.order_id }}</th>
          <th>{{ op.product }}</th>
          <th>{{ op.layer }}</th>
          <th>{{ op.quantity }}</th>
          <th>{{ op.ballast }}</th>
        </tr>
      </tbody>
    </v-simple-table>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      ordenated_products: []
    };
  },
  props: ["id"],

  created() {
    this.$api.get("orders/" + this.id + "/ordenated").then(res => {
      this.ordenated_products = res.data;
    });
  }
};
</script>

<style>
</style>