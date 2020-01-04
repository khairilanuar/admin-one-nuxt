<template>
  <div>
    <title-bar :title-stack="titleStack">
      <template #left> </template>
      <template #right> </template>
    </title-bar>
    <section class="section is-main-section">
      <batch-form />
    </section>
  </div>
</template>

<script>
import BatchForm from '~/components/Batch/BatchForm'
import TitleBar from '~/layouts/partials/TitleBar'

export default {
  name: 'CourseCreate',
  components: {
    BatchForm,
    TitleBar
  },
  computed: {
    titleStack() {
      return ['Setting', 'Batches', 'Create']
    }
  }
}
</script>
