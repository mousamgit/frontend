<template>
  <div class="q-mb-md q-gutter-sm">
    <div class="text-h5 text-negative" v-if="title">
      <q-icon color="negative" name="mdi-information-outline" />
      {{ title }}
    </div>
    <template v-for="(errorItems, index) in errors">
      <q-banner
        :key="'validItem' + i + index"
        rounded
        class="bg-red-5 text-white"
        v-for="(error, i) in errorItems"
        >{{ error }}</q-banner
      >
    </template>
  </div>
</template>

<style scoped></style>
<script type="text/javascript">
export default {
  props: {
    errors: {},
    title: {
      type: String,
    },
  },
  mounted() {},
  computed: {},
  watch: {},
  data() {
    return {};
  },
};
</script>
