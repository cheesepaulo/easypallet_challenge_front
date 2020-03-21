<template>
  <v-container fluid class="pl-10 pr-10 pt-10">
    <PageTitle
      icon="mdi-package-variant-closed"
      :title="`Gravatas da carga: ${load.code}`"
      :subtitle="`Data da entrega: ${load.delivery_date}`"
    />

    <v-data-table hide-default-footer disable-pagination :items="orders" :headers="headers">
      <template v-slot:item.actions="{ item }">
        <v-btn
          :to="{ name: 'orderProducts', params: { order_id: item.id, is_ordenated: false, order: item} }"
        >
          <v-icon left>mdi-sort-variant-remove</v-icon>Listar Produtos
        </v-btn>
        <template v-if="item.organized === true">
          <v-chip
            :to="{ name: 'orderProducts', params: { order_id: item.id, is_ordenated: true, order: item} }"
            class="ma-2"
            color="green"
            text-color="white"
          >
            <v-icon class="mr-2">mdi-sort-descending</v-icon>List Organized Products
          </v-chip>
        </template>
        <template v-else>
          <v-btn text @click="organizeOrder(item.id)">
            <v-icon class="mr-2">mdi-sort-ascending</v-icon>Organize
          </v-btn>
        </template>
        <!-- <v-btn icon :to="{ name: 'LoadOrders', params: { id: item.id, load: item } }">
          <v-icon left>mdi-newspaper-variant-multiple</v-icon>
        </v-btn>
        <v-btn icon color="warning" @click="getLoad(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon color="red" @click="confirmRemove(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>-->
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import PageTitle from "../layout/PageTitle";
export default {
  components: { PageTitle },
  props: ["id"],
  data() {
    return {
      orders: [],
      load: [],
      headers: [
        { text: "Codigo da Ordem", value: "id" },
        { text: "Código da Gravata", value: "code" },
        { text: "Baia", value: "bay" },
        { text: "Ações", value: "actions", sortable: false }
      ]
    };
  },

  methods: {
    getOrders() {
      this.$api.get(`loads/${this.id}`).then(res => {
        this.orders = res.data["orders"];
        this.load = res.data;
      });
    },

    organizeOrder(order_id) {
      this.$api.post("/order/" + order_id + "/organize").then(() => {
        this.getOrders();
      });
    }
  },

  mounted() {
    this.getOrders();
  }
};
</script>

<style>
</style>