<template>
  <v-container fluid class="pl-10 pr-10 pt-5">
    <template v-if="is_ordenated">
      <PageTitle
        icon="mdi-package-variant-closed"
        :title="`Produtos organizados da gravata: ${order.code} `"
      />
    </template>
    <template v-else>
      <PageTitle icon="mdi-package-variant-closed" :title="`Produtos da gravata: ${order.code} `" />
    </template>

    <v-simple-table>
      <thead>
        <tr>
          <th>Produto</th>
          <th v-if="is_ordenated">Camada</th>
          <th>Quantidade</th>
          <th>Lastro</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.product_label }}</td>
          <td v-if="is_ordenated">{{ product.layer }}</td>
          <td>{{ product.quantity }}</td>
          <td>{{ product.ballast }}</td>
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
    if (this.is_ordenated === true) {
      this.$api.get("orders/" + this.order_id + "/ordenated").then(res => {
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