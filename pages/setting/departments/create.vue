<template>
  <div>
    <title-bar :title-stack="titleStack">
      <template #left> </template>
      <template #right> </template>
    </title-bar>
    <section class="section is-main-section">
      <department-form />
    </section>
  </div>
</template>

<script>
import DepartmentForm from '~/components/Department/DepartmentForm'
import TitleBar from '~/layouts/partials/TitleBar'

export default {
  name: 'DepartmentCreate',
  components: {
    DepartmentForm,
    TitleBar
  },
  computed: {
    titleStack() {
      return ['Setting', 'Departments', 'Create']
    }
  }
}
</script>
