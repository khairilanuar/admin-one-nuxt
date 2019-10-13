<template>
  <div>
    <section class="section is-main-section">
      <user-form></user-form>
    </section>
  </div>
</template>

<script>
import UserForm from '~/components/User/UserForm'

export default {
  name: 'UserCreate',
  components: {
    UserForm
  }
}
</script>
