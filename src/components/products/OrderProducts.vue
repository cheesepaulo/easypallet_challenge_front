<template>
  <v-container fluid class="mt-5 pl-5 pr-5">
    <PageTitle icon="mdi-package-variant-closed" :title="`Produtos da gravata: ${order.code} `" />
    <v-simple-table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Order ID</th>
          <th>Product</th>
          <th v-if="is_ordenated">Layer</th>
          <th>Quantity</th>
          <th>Ballast</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <th>{{ product.id }}</th>
          <th>{{ product.order_id }}</th>
          <th>{{ product.product_label }}</th>
          <th v-if="is_ordenated">{{ product.layer }}</th>
          <th>{{ product.quantity }}</th>
          <th>{{ product.ballast }}</th>
        </tr>
      </tbody>
    </v-simple-table>
  </v-container>
</template>

<script>
import PageTitle from "../layout/PageTitle";
export default {
  components: { PageTitle },
  props: ["is_ordenated", "order_id", "order"],

  data() {
    return {
      products: []
    };
  },

  created() {
    console.log(this.order);
    if (this.is_ordenated === true) {
      this.$api.get("orders/" + this.order_id + "/ordenated").then(res => {
        console.log(this.order_id);
        this.products = res.data;
      });
    } else {
      this.$api.get("orders/" + this.order_id).then(res => {
        this.products = res.data["order_products"];
      });
    }
  }
};
</script>