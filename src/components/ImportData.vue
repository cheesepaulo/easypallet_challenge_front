<template>
  <v-container fluid class="pl-10 pr-10 pt-5">
    <PageTitle icon="mdi-file-upload" title="Importar dados de um arquivo .CSV" />

    <v-progress-linear
      :active="loading"
      :indeterminate="loading"
      absolute
      top
      color="green"
      height="10"
    ></v-progress-linear>
    <v-form ref="form">
      <v-row>
        <v-col lg="3">
          <v-file-input v-model="file" show-size accept=".csv" label="Selecione o arquivo" />
        </v-col>
        <v-col>
          <v-btn class="mr-4 primary mt-4" @click="submitFile()">
            <v-icon left>mdi-content-save</v-icon>Salvar
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import PageTitle from "./layout/PageTitle";
import { showError } from "@/global";
export default {
  components: { PageTitle },
  data() {
    return {
      file: [],
      loading: false
    };
  },

  methods: {
    reset() {
      this.$refs.form.reset();
    },

    disableLoading() {
      this.loading = false;
    },

    submitFile() {
      this.loading = true;

      let formData = new FormData();
      formData.append("file", this.file);

      this.$api
        .post("/import", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
          this.disableLoading();
        })
        .catch(() => {
          showError, this.reset();
          this.disableLoading();
        });
    }
  }
};
</script>