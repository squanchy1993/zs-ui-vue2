<!--
 * @Date: 2022-06-13 18:42:23
 * @LastEditors: 朱志森 826482354@qq.com
 * @LastEditTime: 2022-06-17 14:44:28
 * @FilePath: /book-book-admin-vue/src/components/m-layout/components/Sidebar/index.vue
-->
<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in user_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '../../style/variables.scss'

export default {
  components: { SidebarItem, Logo },
  inject: ['layoutState'],
  computed: {
    ...mapGetters([
      'user_routes'
    ]),
    settingState() {
      return this.layoutState()
    },
    sidebar() {
      return this.settingState.sidebar
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.settingState.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
