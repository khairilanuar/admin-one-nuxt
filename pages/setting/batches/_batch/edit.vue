<template>
  <div>
    <section class="section is-main-section">
      <batch-form :batch-id="$route.params.batch.toString()" />
    </section>
  </div>
</template>

<script>
import BatchForm from '~/components/Batch/BatchForm'

export default {
  name: 'BatchEdit',
  components: {
    BatchForm
  },
  data: () => {
    return {
      user: null
    }
  },
  mounted() {}
}
</script>
