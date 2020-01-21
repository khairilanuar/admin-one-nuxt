<template>
  <div>
    <title-bar :title-stack="titleStack">
      <template #left> </template>
      <template #right> </template>
    </title-bar>
    <section class="section is-main-section">
      <role-form></role-form>
    </section>
  </div>
</template>

<script>
import RoleForm from '~/components/Forms/RoleForm'
import TitleBar from '~/layouts/partials/TitleBar'

export default {
  name: 'RoleCreate',
  components: {
    RoleForm,
    TitleBar
  },
  computed: {
    titleStack() {
      return ['Access', 'Users', 'Create']
    }
  }
}
</script>
