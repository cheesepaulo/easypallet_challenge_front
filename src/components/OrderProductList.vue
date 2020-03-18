<template>
  <v-container class="mt-5">
    <h3>List of Products</h3>
    <v-simple-table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Order ID</th>
          <th>Product</th>
          <th>Quantity</th>
          <th>Ballast</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="op in order_products" :key="op.id">
          <th>{{ op.id }}</th>
          <td>{{ op.order_id }}</td>
          <td>{{ op.product_label }}</td>
          <td>{{ op.quantity }}</td>
          <td>{{ op.ballast }}</td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      order_products: []
    };
  },
  props: ["id"],
  created() {
    this.$api.get("orders/" + this.id).then(res => {
      this.order_products = res.data["order_products"];
    });
  }
};
</script>

<style>
</style>