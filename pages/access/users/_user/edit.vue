<template>
  <div>
    <section class="section is-main-section">
      <user-form :user-uuid="$route.params.user"></user-form>
    </section>
  </div>
</template>

<script>
import UserForm from '~/components/Forms/UserForm'

export default {
  name: 'UserEdit',
  components: {
    UserForm
  },
  data: () => {
    return {
      user: null
    }
  },
  mounted() {}
}
</script>
