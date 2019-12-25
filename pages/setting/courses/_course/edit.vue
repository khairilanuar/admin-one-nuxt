<template>
  <div>
    <section class="section is-main-section">
      <course-form :course-id="$route.params.course.toString()" />
    </section>
  </div>
</template>

<script>
import CourseForm from '~/components/Course/CourseForm'

export default {
  name: 'CourseEdit',
  components: {
    CourseForm
  },
  data: () => {
    return {
      user: null
    }
  },
  mounted() {}
}
</script>
