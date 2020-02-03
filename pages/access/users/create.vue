<template>
  <div>
    <title-bar :title-stack="titleStack">
      <template #left> </template>
      <template #right> </template>
    </title-bar>
    <section class="section is-main-section">
      <user-form></user-form>
    </section>
  </div>
</template>

<script>
import UserForm from '~/components/Forms/UserForm'
import TitleBar from '~/layouts/partials/TitleBar'

export default {
  name: 'UserCreate',
  meta: {
    permission: 'create-user'
  },
  components: {
    UserForm,
    TitleBar
  },
  computed: {
    titleStack() {
      return ['Access', 'Users', 'Create']
    }
  }
}
</script>
