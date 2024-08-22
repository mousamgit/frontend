import {useRouter, useRoute} from "vue-router";
import {computed} from "vue";
import homeIconActive from "assets/icons/Active/Home.svg";
import homeIcon from "assets/icons/Home.svg";
import profileIconActive from "assets/icons/Active/Profile.svg";
import profileIcon from "assets/icons/Profile.svg";
import listIcon from "assets/icons/Category.svg";
import notificationIcon from "assets/icons/Notification.svg";
import settingsIcon from "assets/icons/Filter.svg";
import logoutIcon from "assets/icons/Logout.svg";
export default function () {
  const homeIcon = require('../../assets/icons/Home.svg');
  const listIcon = require('../../assets/icons/Category.svg');
  const notificationIcon = require('../../assets/icons/Notification.svg');
  const profileIcon = require('../../assets/icons/Profile.svg');
  const settingsIcon = require('../../assets/icons/Filter.svg');
  const logoutIcon = require('../../assets/icons/Logout.svg');
  const homeIconActive = require('../../assets/icons/Active/Home.svg');
  const listIconActive = require('../../assets/icons/Active/Category.svg');
  const notificationIconActive = require('../../assets/icons/Active/Notification.svg');
  const profileIconActive = require('../../assets/icons/Active/Profile.svg');
  const settingsIconActive = require('../../assets/icons/Active/Filter.svg');
  const logoutIconActive = require('../../assets/icons/Active/Logout.svg');
  const $router = useRouter();
  const route = useRoute();
  const currentRoute = computed(() => route.name)
  return {
    homeIcon,
    listIcon,
    notificationIcon,
    profileIcon,
    settingsIcon,
    logoutIcon,
    homeIconActive,
    listIconActive,
    notificationIconActive,
    profileIconActive,
    settingsIconActive,
    logoutIconActive,
  }
}
