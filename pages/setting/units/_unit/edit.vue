<template>
  <div>
    <section class="section is-main-section">
      <unit-form :unit-id="$route.params.unit.toString()" />
    </section>
  </div>
</template>

<script>
import UnitForm from '~/components/Unit/UnitForm'

export default {
  name: 'UnitEdit',
  components: {
    UnitForm
  },
  data: () => {
    return {
      user: null
    }
  },
  mounted() {}
}
</script>
