<template>
  <v-container fluid class="pl-10 pr-10 pt-5">
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title
          class="headline"
        >Tem certeza que deseja excluir a carga: {{ temp_load.code }} ?</v-card-title>
        <v-card-text>Esta ação é irreversível!</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false">Cancelar</v-btn>
          <v-btn color="red" @click="remove()">Sim eu concordo!</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <PageTitle icon="mdi-package" title="Cargas" />
    <v-form ref="form">
      <v-row>
        <input id="load-id" type="hidden" v-model="load.id" />
        <v-col cols="12" md="3" lg="2" sm="12" xs="12">
          <v-text-field v-model="load.code" label="Codigo" />
        </v-col>
        <v-col cols="12" md="3" lg="2" sm="12" xs="12">
          <v-datetime-picker
            required
            clearText="Limpar"
            label="Data da entrega"
            v-model="load.delivery_date"
            dateFormat="dd/MM/yyyy"
            timeFormat="HH:mm"
            format="24hr"
          >
            <v-icon slot="dateIcon">mdi-calendar-range</v-icon>
            <v-icon slot="timeIcon">mdi-clock</v-icon>
          </v-datetime-picker>
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
    <v-data-table hide-default-footer disable-pagination :items="loads" :headers="headers">
      <template v-slot:item.actions="{ item }">
        <v-btn icon :to="{ name: 'loadOrders', params: { load_id: item.id, load: item } }">
          <v-icon left>mdi-newspaper-variant-multiple</v-icon>
        </v-btn>
        <v-btn icon color="warning" @click="getLoad(item)">
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
import Vue from "vue";
import DatetimePicker from "vuetify-datetime-picker";
import PageTitle from "../layout/PageTitle";
import { showError } from "@/global";

Vue.use(DatetimePicker);

export default {
  name: "Loads",
  components: { PageTitle },
  data() {
    return {
      dialog: false,
      temp_load: {},
      load: { code: "", delivery_date: "" },
      loads: [],
      headers: [
        { text: "ID", value: "id" },
        { text: "Código", value: "code" },
        { text: "Data de Entrega", value: "delivery_date" },
        { text: "Ações", value: "actions", sortable: false }
      ]
    };
  },

  methods: {
    getLoads() {
      this.$api.get("/loads").then(res => {
        this.loads = res.data;
      });
    },

    getLoad(load) {
      this.load = { ...load };
    },

    reset() {
      this.$refs.form.reset();
      this.load = { code: "", delivery_date: "" };
    },

    save() {
      if (this.load.id) {
        this.$api
          .put(`/loads/${this.load.id}`, this.load)
          .then(() => {
            this.$toasted.global.defaultSuccess();
            this.getLoads();
            this.reset();
          })
          .catch(showError, this.getLoads());
      } else {
        this.$api
          .post(`/loads`, this.load)
          .then(() => {
            this.$toasted.global.defaultSuccess();
            this.getLoads();
            this.reset();
          })
          .catch(showError, this.getLoads());
      }
    },

    remove() {
      this.dialog = false;
      this.$api
        .delete(`/loads/${this.temp_load.id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.getLoads();
        })
        .catch(showError);
    },

    confirmRemove(item) {
      this.dialog = true;
      this.temp_load = { ...item };
    }
  },

  mounted() {
    this.getLoads();
  }
};
</script>

<style>
tbody tr:nth-of-type(even) {
  background-color: #fff;
}

tbody tr:nth-of-type(odd) {
  background-color: rgb(250, 250, 250);
}
</style>