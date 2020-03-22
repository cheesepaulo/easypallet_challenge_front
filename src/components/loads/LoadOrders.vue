<template>
  <v-container fluid class="pl-10 pr-10 pt-5">
    <PageTitle icon="mdi-package-variant-closed" :title="`Gravatas da carga: ${load_id}`" />

    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title
          class="headline"
        >Tem certeza que deseja excluir a gravata: {{ temp_order.code }} ?</v-card-title>
        <v-card-text>Esta ação é irreversível!</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false">Cancelar</v-btn>
          <v-btn color="red" @click="remove()">Sim eu concordo!</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-form ref="form">
      <v-row>
        <input id="order-id" type="hidden" v-model="order.id" />
        <v-col cols="12" md="3" lg="2" sm="12" xs="12">
          <v-text-field v-model="order.code" label="Codigo da Gravata" />
        </v-col>
        <v-col cols="12" md="3" lg="2" sm="12" xs="12">
          <v-text-field v-model="order.bay" label="Baia da Gravata" />
        </v-col>
        <v-col cols="12" md="4" lg="5" sm="12" xs="12">
          <v-btn class="mr-4 primary mt-4" @click="save()">
            <v-icon left>mdi-content-save</v-icon>Salvar
          </v-btn>
          <v-btn class="mr-4 default mt-4" @click="reset()">
            <v-icon left>mdi-close</v-icon>Limpar
          </v-btn>
          <BackButton />
        </v-col>
      </v-row>
    </v-form>

    <v-divider />

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

      <template v-slot:item.products="{ item }">
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

      <template v-slot:item.actions="{ item }">
        <v-btn icon color="warning" @click="getOrder(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon color="red" @click="confirmRemove(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import PageTitle from "../layout/PageTitle";
import { showError } from "@/global";
import BackButton from "../BackButton";
export default {
  name: "LoadOrders",
  components: { PageTitle, BackButton },
  props: ["load_id", "load"],
  data() {
    return {
      dialog: false,
      temp_order: {},
      order: { code: "", bay: "" },
      orders: [],
      headers: [
        { text: "Código da Gravata", value: "code" },
        { text: "Baia", value: "bay" },
        { text: "Status", value: "organized", sortable: true },
        { text: "Produtos", value: "products", sortable: false },
        { text: "Ações", value: "actions", sortable: false }
      ]
    };
  },

  methods: {
    reset() {
      this.$refs.form.reset();
      this.order.id = "";
    },

    getOrder(order) {
      this.order = { ...order };
    },

    getOrders() {
      console.log(this.load_id);

      this.$api.get(`loads/${this.load_id}/orders`).then(res => {
        this.orders = res.data;
        // this.load = res.data;
      });
    },

    save() {
      if (this.order.id) {
        this.$api
          .put(`/orders/${this.order.id}`, this.order)
          .then(() => {
            this.$toasted.global.defaultSuccess();
            this.getOrders();
            this.reset();
          })
          .catch(showError, this.getOrders());
      } else {
        this.$api
          .post(`/loads/${this.load.id}/orders`, this.order)
          .then(() => {
            this.$toasted.global.defaultSuccess();
            this.getOrders();
            this.reset();
          })
          .catch(showError, this.getOrders());
      }
    },

    confirmRemove(item) {
      this.dialog = true;
      this.temp_order = { ...item };
    },

    remove() {
      this.dialog = false;
      this.$api
        .delete(`/orders/${this.temp_order.id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.getOrders();
        })
        .catch(showError);
    },

    organizeOrder(order_id) {
      this.$api
        .post("/order/" + order_id + "/organize")
        .then(() => {
          this.getOrders();
        })
        .catch(showError);
    }
  },

  mounted() {
    this.getOrders();
  }
};
</script>

<style>
</style>