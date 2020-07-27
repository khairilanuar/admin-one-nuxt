<template>
  <ul :class="{ 'menu-list': !isSubmenuList }">
    <aside-menu-item
      v-for="(item, index) in userMenu"
      :key="index"
      :item="item"
      @menu-click="menuClick"
    />
  </ul>
</template>

<script>
import AsideMenuItem from '~/layouts/partials/AsideMenuItem'

export default {
  name: 'AsideMenuList',
  components: {
    AsideMenuItem
  },
  props: {
    isSubmenuList: {
      type: Boolean,
      default: false
    },
    menu: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    userMenu () {
      const menu = []
      this.menu.forEach((item) => {
        if (this.checkPermission(item)) {
          menu.push(item)
        }
      })
      return menu
    }
  },
  methods: {
    menuClick (item) {
      this.$emit('menu-click', item)
    },
    checkPermission (item) {
      const permission = item.permission
      if (permission === undefined) {
        return true
      }
      return this.$store.getters['auth/hasPermission'](permission)
    }
  }
}
</script>
