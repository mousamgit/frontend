<template>
  <div class="q-mb-md q-gutter-sm" v-if="validationErrors">
    <transition-group
      appear
      enter-active-class="animated fadeInRight"
      leave-active-class="animated fadeOutLeft"
      :duration="{ enter: 1000, leave: 100 }"
      mode="out-in"

    >
      <template v-for="(errorItems, index) in validationErrors">
        <q-banner
          :key="'validItem' + i + index"
          rounded
          class="bg-red-5 text-white"
          v-for="(error, i) in errorItems"
        >{{ error }}
        </q-banner
        >
      </template>
    </transition-group>
  </div>
</template>

<script>
import {defineComponent, ref, onMounted} from 'vue'
import errors from "./errors";

export default defineComponent({
  name: 'ErrorsList',
  components: {},
  setup() {
    const {validationErrors} = errors();
    const title = ref('title');
    return {
      validationErrors,
      title
    };
  },
});
</script>


<style scoped>

</style>
