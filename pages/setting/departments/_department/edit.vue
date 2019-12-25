<template>
  <div>
    <section class="section is-main-section">
      <department-form :department-id="$route.params.department.toString()" />
    </section>
  </div>
</template>

<script>
import DepartmentForm from '~/components/Department/DepartmentForm'

export default {
  name: 'DepartmentEdit',
  components: {
    DepartmentForm
  },
  data: () => {
    return {
      user: null
    }
  },
  mounted() {}
}
</script>
