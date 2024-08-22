<template>
  <q-btn
    @click="clickFunction"
    class="q-mr-sm"
    color="primary"
    :dense="dense"
    icon="edit"
    rounded
    :size="size"
    :label="label"
  />
</template>

<style scoped></style>
<script type="text/javascript">
export default {
  data() {
    return {};
  },
  props: {
    dense: {
      default: true
    },
    label: {},
    size: {
      default: "sm"
    }
  },
  watch: {},
  methods: {
    clickFunction() {
      this.$emit("onClick");
    }
  }
};
</script>
