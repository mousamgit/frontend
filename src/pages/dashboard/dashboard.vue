<template>
  <q-page class="q-py-lg scroll">
    <div class="row justify-center q-col-gutter-lg">
      <div class="col-12  flex flex-center">
      </div>
    </div>
  </q-page>
</template>

<script>
import {computed, ref, defineComponent, onMounted} from 'vue'
import user from "./user";
import {useStore} from "vuex";


export default defineComponent({
  name: 'Dashboard',
  components: {},
  setup() {
    const {currentUser, fbInit} = user();
    const infiniteScroll = ref(null);
    onMounted(() => {

    })
    const items = ref([{}, {}, {}, {}, {}, {}, {}])
    const $store = useStore()



    const disabled = ref(true)
    return {
      disabled,
      currentUser,
      infiniteScroll,
      items,
      onLoad(index, done) {
        setTimeout(() => {
          items.value.push({}, {}, {}, {}, {}, {}, {})
          done()
        }, 2000)
      }
    };
  },
});
</script>

<style lang="scss">
.network-list {
  display: inline-block;
  width: 100%;
  overflow: auto;
  white-space: nowrap;

  div.single-network {
    margin-right: 5px;
    display: inline-block;
    color: white;
    text-align: center;
    text-decoration: none;
  }
}

.single-network-badge {
  padding: 1px;
}

.network-profile-popup {
  background: transparent !important;
  box-shadow: none;
  overflow-x: visible !important;

  &:after {
    content: " ";
    position: absolute;
    top: -10px;
    left: 8%;
    margin-left: -5px;
    border-width: 11px;
    border-style: solid;
    border-color: transparent transparent #3b5998 transparent;
  }
}

.network-twitter-profile-popup {
  background: transparent !important;
  box-shadow: none;
  overflow-x: visible !important;

  &:after {
    content: " ";
    position: absolute;
    top: -10px;
    left: 8%;
    margin-left: -5px;
    border-width: 11px;
    border-style: solid;
    border-color: transparent transparent $twitter transparent;
  }
}

</style>
