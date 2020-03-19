<template>
  <v-container class="mt-5">
    <v-form>
      <v-row class="lg-12">
        <v-col class="lg-6">
          <v-text-field v-model="load.code" label="Codigo" required></v-text-field>
        </v-col>
        <v-col class="lg-6">
          <VueCtkDateTimePicker v-model="load.delivery_date" />
        </v-col>
      </v-row>
      <v-btn class="mr-4" @click="createLoad()">submit</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";

export default {
  components: { VueCtkDateTimePicker },
  data() {
    return {
      load: {
        code: "",
        delivery_date: ""
      }
    };
  },
  methods: {
    createLoad() {
      this.$api.post("/loads", this.load).then(res => {
        console.log(res.code);
      });
      this.$router.push("/loads");
    }
  }
};
</script>

<style>
</style>