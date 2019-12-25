<template>
  <div>
    <title-bar :title-stack="titleStack">
      <template #left> </template>
      <template #right> </template>
    </title-bar>
    <section class="section is-main-section">
      <unit-form></unit-form>
    </section>
  </div>
</template>

<script>
import UnitForm from '~/components/Unit/UnitForm'
import TitleBar from '~/layouts/partials/TitleBar'

export default {
  name: 'RoleCreate',
  components: {
    UnitForm,
    TitleBar
  },
  computed: {
    titleStack() {
      return ['Setting', 'Units', 'Create']
    }
  }
}
</script>
