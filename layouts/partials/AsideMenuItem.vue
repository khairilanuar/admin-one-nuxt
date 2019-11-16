<template>
  <li :class="{ 'is-active': isDropdownActive }">
    <!-- eslint-disable-next-line vue/require-component-is -->
    <component
      :is="componentIs"
      :to="itemTo"
      :href="itemHref"
      :class="{ 'has-icon': !!item.icon, 'has-dropdown-icon': hasDropdown }"
      @click="menuClick"
      exact-active-class="is-active"
    >
      <b-icon
        v-if="item.icon"
        :icon="item.icon"
        :class="{ 'has-update-mark': item.updateMark }"
        custom-size="default"
      />
      <span v-if="item.label" :class="{ 'menu-item-label': !!item.icon }">{{
        item.label
      }}</span>
      <div v-if="hasDropdown" class="dropdown-icon">
        <b-icon :icon="dropdownIcon" custom-size="default"></b-icon>
      </div>
    </component>
    <aside-menu-list
      v-if="hasDropdown"
      :menu="item.menu"
      :is-submenu-list="true"
    />
  </li>
</template>

<script>
export default {
  name: 'AsideMenuItem',
  components: {},
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      isDropdownActive: false
    }
  },
  computed: {
    componentIs() {
      return this.item.to ? 'router-link' : 'a'
    },
    hasDropdown() {
      return !!this.item.menu
    },
    dropdownIcon() {
      return this.isDropdownActive ? 'minus' : 'plus'
    },
    itemTo() {
      return this.item.to ? this.item.to : null
    },
    itemHref() {
      return this.item.href ? this.item.href : null
    }
  },
  methods: {
    menuClick() {
      this.$emit('menu-click', this.item)

      if (this.hasDropdown) {
        this.isDropdownActive = !this.isDropdownActive
      }
    }
  }
}
</script>
