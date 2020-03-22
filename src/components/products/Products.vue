<template>
  <v-container fluid class="pl-10 pr-10 pt-5">
    <PageTitle icon="mdi-package" title="Produtos" />

    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title
          class="headline"
        >Tem certeza que deseja excluir o produto: {{ product_to_remove.label }} ?</v-card-title>
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
        <input id="product-id" type="hidden" v-model="product.id" />
        <v-col cols="12" md="3" lg="2" sm="12" xs="12">
          <v-text-field v-model="product.label" label="Nome do produto" />
        </v-col>
        <v-col cols="12" md="3" lg="2" sm="12" xs="12">
          <v-text-field v-model="product.ballast" label="Lastro do produto" />
        </v-col>
        <v-col cols="12" md="4" lg="3" sm="12" xs="12">
          <v-btn class="mr-4 primary mt-4" @click="save()">
            <v-icon left>mdi-content-save</v-icon>Salvar
          </v-btn>
          <v-btn class="mr-4 default mt-4" @click="reset()">
            <v-icon left>mdi-close</v-icon>Limpar
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
    <v-divider />
    <v-data-table hide-default-footer disable-pagination :items="products" :headers="headers">
      <template v-slot:item.actions="{ item }">
        <v-btn icon color="warning" @click="getProduct(item)">
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

export default {
  components: { PageTitle },
  data() {
    return {
      dialog: false,
      product_to_remove: {},
      product: { label: "", ballast: "" },
      products: [],
      headers: [
        { text: "Nome", value: "label" },
        { text: "Lastro", value: "ballast" },
        { text: "Ações", value: "actions", sortable: false }
      ]
    };
  },

  methods: {
    getProducts() {
      this.$api.get("/products").then(res => {
        this.products = res.data;
      });
    },

    getProduct(product) {
      this.product = { ...product };
    },

    reset() {
      this.$refs.form.reset();
      this.product = { label: "", ballast: "" };
    },

    save() {
      if (this.product.id) {
        this.$api
          .put(`/products/${this.product.id}`, this.product)
          .then(() => {
            this.$toasted.global.defaultSuccess();
            this.getProducts();
            this.reset();
          })
          .catch(showError, this.getProducts());
      } else {
        this.$api
          .post(`/products`, this.product)
          .then(() => {
            this.$toasted.global.defaultSuccess();
            this.getProducts();
            this.reset();
          })
          .catch(showError, this.getProducts());
      }
    },

    remove() {
      this.dialog = false;
      this.$api
        .delete(`/products/${this.product_to_remove.id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.getProducts();
        })
        .catch(showError);
    },

    confirmRemove(item) {
      this.dialog = true;
      this.product_to_remove = { ...item };
    }
  },

  mounted() {
    this.getProducts();
  }
};
</script>

<style scoped>
tbody tr:nth-of-type(even) {
  background-color: #fff;
}

tbody tr:nth-of-type(odd) {
  background-color: rgb(250, 250, 250);
}
</style>