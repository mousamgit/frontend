<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <q-layout
      :view="'lHh lpR fFf'"
      class="social-sites"
      :class="$i18n.locale == 'np' ? 'nepali-lang-layout' : ''"
    >
      <q-drawer
        v-model="drawer"
        show-if-above
        :width="240"
        :breakpoint="500"
        class="sub-drawer"
      >
        <template :key="i" v-for="(item, i) in drawerData">
          <template v-if="item.type=='header'">
            <q-item-label header>{{ item.label }}</q-item-label>
            <q-separator color="grey-7"/>
          </template>
          <template v-else>
            <q-item
              clickable
              v-ripple
              :id="item.id"
              :active="item.route == $route.name"
              :icon="item.icon"
              :key="i"
              class="GNL__drawer-item q-py-none"
              style="min-height: 3.2em"
              :label="$t(item.label)"
              :style="item.style"
              @click="$router.push({name: item.route,params: item.params,query: item.query,}).catch(err => {})"
              v-if="(item.checkPermission ? checkIfUserHasPermissions(item.checkPermission): true) && item.childs == null &&
                    (item.checkOwner == 'Yes' ? currentUser.is_owner : true)"
            >
              <q-item-section side>
                <q-icon
                  :color="item.route == $route.name ? '' : ''"
                  v-if="item.icon"
                  :name="item.icon"
                >
                  <!-- <q-badge floating transparen v-if="item.badge" color="negative" >22</q-badge> -->
                </q-icon>
                <q-icon
                  style="transform: scale(0.8)"
                  v-else-if="item.img"
                  :name="'img:' + item.img"
                >
                </q-icon>
                <q-icon v-if="item.svg" size="1.1em">
                  <component v-bind:is="item.svg"/>
                </q-icon>
              </q-item-section>

              <q-item-section>
                <q-item-label
                  style="font-weight: 500; letter-spacing: 0.01em; font-size: 0.9em;"
                  :class="item.route === $route.name ? '' : ''"
                >{{ $t(item.label) }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-expansion-item
              :key="'btn' + i"
              clickable
              class="GNL__drawer-item"
              :label="$t(item.label)"
              :icon="item.icon"
              v-else-if="
                    checkIfUserHasPermissions(item.checkPermission) &&
                    item.childs != null
                  "
            >
              <template v-for="(childItem, j) in item.childs">
                <template>
                  <q-item
                    :key="j"
                    @click="
                          $router.push({
                            name: childItem.route,
                            params: childItem.params,
                            query: childItem.query,
                          }).catch(err => {})
                        "
                    clickable
                    class="q-ml-sm"
                    v-close-popup
                    v-if="
                          checkIfUserHasPermissions(childItem.checkPermission)
                        "
                  >
                    <q-item-section side v-if="childItem.icon">
                      <q-icon :name="childItem.icon" color="white"/>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label color="primary"
                      >{{ $t(childItem.label) }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </template>
            </q-expansion-item>
          </template>
        </template>
      </q-drawer>
      <q-page-container>
        <router-view/>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>

import {defineComponent, ref} from "vue";
import userManagement from "src/composables/userManagement";

export default defineComponent({

  setup() {
    const drawer = ref(true);

    const {checkIfUserHasPermissions, drawerData} = userManagement()
    return {
      drawer,
      drawerData,
      checkIfUserHasPermissions
    }
  }
});
</script>

<style lang="scss">
</style>
