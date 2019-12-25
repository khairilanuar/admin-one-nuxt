<template>
  <div>
    <title-bar :title-stack="titleStack">
      <template #left> </template>
      <template #right> </template>
    </title-bar>
    <section class="section is-main-section">
      <course-form />
    </section>
  </div>
</template>

<script>
import CourseForm from '~/components/Course/CourseForm'
import TitleBar from '~/layouts/partials/TitleBar'

export default {
  name: 'CourseCreate',
  components: {
    CourseForm,
    TitleBar
  },
  computed: {
    titleStack() {
      return ['Setting', 'Courses', 'Create']
    }
  }
}
</script>
