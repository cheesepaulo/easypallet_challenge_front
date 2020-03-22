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

    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title class="headline">
          Tem certeza que deseja excluir o produto?
          <v-spacer />
          {{ order_product_to_remove.product_label }}
        </v-card-title>
        <v-card-text>Esta ação é irreversível!</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false">Cancelar</v-btn>
          <v-btn color="red" @click="remove()">Sim eu concordo!</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <template v-if="is_ordenated === false">
      <v-form ref="form">
        <v-row>
          <input id="product-id" type="hidden" v-model="order_product.id" />
          <v-col cols="12" md="3" lg="4" sm="12" xs="12">
            <v-select
              :items="products_for_select"
              item-text="label"
              item-value="id"
              v-model="order_product.product_id"
              label="Selecione o produto"
            ></v-select>
          </v-col>
          <v-col cols="12" md="3" lg="2" sm="12" xs="12">
            <v-text-field v-model="order_product.quantity" label="Quantidade" />
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
    </template>

    <v-simple-table>
      <thead>
        <tr>
          <th>Produto</th>
          <th v-if="is_ordenated">Camada</th>
          <th>Quantidade</th>
          <th>Lastro</th>
          <th v-if="is_ordenated === false">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in order_products" :key="product.id">
          <td>{{ product.product_label }}</td>
          <td v-if="is_ordenated">{{ product.layer }}</td>
          <td>{{ product.quantity }}</td>
          <td>{{ product.ballast }}</td>
          <td v-if="is_ordenated === false">
            <v-btn icon color="warning" @click="getOrderProduct(product)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon color="red" @click="confirmRemove(product)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <BackButton />
  </v-container>
</template>

<script>
import BackButton from "../BackButton";
import PageTitle from "../layout/PageTitle";
import { showError } from "@/global";

export default {
  name: "OrderProducts",
  components: { PageTitle, BackButton },
  props: ["is_ordenated", "order"],

  data() {
    return {
      dialog: false,
      order_product_to_remove: {},
      products_for_select: [],
      order_product: { product_id: "", quantity: "" },
      order_products: []
    };
  },

  methods: {
    getProductsForSelect() {
      this.$api
        .get("products")
        .then(res => {
          this.products_for_select = res.data;
        })
        .catch(showError);
    },

    getOrderProducts() {
      if (this.is_ordenated === true) {
        this.$api
          .get(`orders/${this.order.id}/ordenated_order_products`)
          .then(res => {
            this.order_products = res.data;
          })
          .catch(showError);
      } else {
        this.$api
          .get(`orders/${this.order.id}/order_products`)
          .then(res => {
            this.order_products = res.data;
          })
          .catch(showError);
      }
    },

    getOrderProduct(order_product) {
      this.order_product = { ...order_product };
    },

    reset() {
      this.$refs.form.reset();
      this.order_product.id = "";
    },

    save() {
      if (this.order_product.id) {
        this.$api
          .put(
            `orders/${this.order.id}/order_products/${this.order_product.id}`,
            this.order_product
          )
          .then(() => {
            this.$toasted.global.defaultSuccess();
            this.getOrderProducts();
            this.reset();
          })
          .catch(showError, this.getOrderProducts());
      } else {
        this.$api
          .post(`orders/${this.order.id}/order_products`, this.order_product)
          .then(() => {
            this.$toasted.global.defaultSuccess();
            this.getOrderProducts();
            this.reset();
          })
          .catch(showError, this.getOrderProducts());
      }
    },

    remove() {
      this.dialog = false;
      this.$api
        .delete(
          `/orders/${this.order.id}/order_products/${this.order_product_to_remove.id}`
        )
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.getOrderProducts();
        })
        .catch(showError);
    },

    confirmRemove(item) {
      this.dialog = true;
      this.order_product_to_remove = { ...item };
    }
  },

  mounted() {
    this.getProductsForSelect();
    this.getOrderProducts();
  }
};
</script>