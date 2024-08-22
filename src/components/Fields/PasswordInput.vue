<template>
  <q-input
    :id="id"
    v-model="password"
    :type="isPwd ? 'password' : 'text'"
    :label="label"
    :error="error"
    :required="required"
    :filled="filled"
    bordered
    :hint="hint"
    autocomplete="off"
    lazy-rules=""
    :rules="rules"
    @change="modelChanged"
    :color="color"
    :dark="dark"
    outlined
  >
    <template v-slot:prepend>
      <q-icon name="fingerprint"/>
    </template>
    <template v-slot:append>
      <q-icon
        :name="isPwd ? 'mdi-eye' : 'mdi-eye-off'"
        @click="isPwd = !isPwd"
        class="cursor-pointer"
      />
    </template>
  </q-input>
  <!-- @keyup.enter="login" -->
</template>

<style scoped></style>
<script type="text/javascript">
export default {
  data() {
    return {
      isPwd: true,
      password: ""
    };
  },
  props: {
    "label": {},
    "value": {},
    "id": {},
    "required": {},
    "error": {},
    "rules": {},
    "filled": {},
    "color": {},
    "dark": {},
    "hint": {}
  },
  watch: {
    value(new_value) {
      this.password = new_value;
    }
  },
  methods: {
    modelChanged() {
      this.$emit("input", this.password);
    }
  }
};
</script>
