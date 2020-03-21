<template>
  <v-container fluid class="pl-10 pr-10 pt-10">
    <PageTitle
      icon="mdi-package-variant-closed"
      :title="`Gravatas da carga: ${load.code}`"
      :subtitle="`Data da entrega: ${load.delivery_date}`"
    />

    <v-data-table hide-default-footer disable-pagination :items="orders" :headers="headers">
      <template v-slot:item.organized="{ item }">
        <v-chip v-if="item.organized" class="ma-2" color="green" text-color="white">
          <v-icon right>mdi-checkbox-marked-circle</v-icon>
        </v-chip>
        <v-tooltip v-else left color="success">
          <template v-slot:activator="{ on }">
            <v-chip
              @click="organizeOrder(item.id)"
              v-on="on"
              class="ma-2"
              color="grey"
              text-color="white"
            >
              <v-icon left>mdi-checkbox-blank-circle</v-icon>
            </v-chip>
          </template>
          <span>Clique para organizar</span>
        </v-tooltip>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-tooltip v-if="item.organized" left color="success">
          <template v-slot:activator="{ on }">
            <v-chip
              v-on="on"
              class="mr-2"
              :to="{ name: 'orderProducts', params: { order_id: item.id, is_ordenated: true, order: item} }"
              color="green"
              text-color="white"
            >
              <v-icon>mdi-sort-reverse-variant</v-icon>
            </v-chip>
          </template>
          <span>Produtos Organizados</span>
        </v-tooltip>

        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-chip
              v-on="on"
              class="mr-2"
              :to="{ name: 'orderProducts', params: { order_id: item.id, is_ordenated: false, order: item} }"
              text-color="white"
            >
              <v-icon>mdi-sort-variant</v-icon>
            </v-chip>
          </template>
          <span>Produtos</span>
        </v-tooltip>
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
        { text: "Status", value: "organized", sortable: true },
        { text: "Produtos", value: "actions", sortable: false }
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