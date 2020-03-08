<template>
  <div>
    <section class="section is-main-section">
      <role-form :role-id="$route.params.role.toString()" />
    </section>
  </div>
</template>

<script>
import RoleForm from '~/components/Forms/RoleForm'

export default {
  name: 'RoleEdit',
  meta: {
    permission: 'update-role'
  },
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
