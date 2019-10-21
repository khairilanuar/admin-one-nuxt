<template>
  <div>
    <section class="section is-main-section">
      <role-form :role-id="$route.params.role.toString()"></role-form>
    </section>
  </div>
</template>

<script>
import RoleForm from '~/components/Role/RoleForm'

export default {
  name: 'RoleEdit',
  components: {
    RoleForm
  },
  data: () => {
    return {
      user: null
    }
  },
  mounted() {}
}
</script>
