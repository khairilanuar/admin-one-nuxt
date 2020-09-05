<template>
  <section class="section is-title-bar">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <ul>
            <!--<li><b-icon icon="home" custom-size="default"></b-icon></li>-->
            <li v-for="(title, index) in titleStack" :key="index">
              {{ title }}
            </li>
          </ul>
          <div style="padding-left: 15px">
            <slot name="left" />
          </div>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <slot name="right" />
          <!--<div class="buttons is-right">
            <a
              href="https://admin-one-vue-cli.justboil.me/"
              target="_blank"
              class="button is-primary"
            >
              <b-icon icon="credit-card" custom-size="default"></b-icon>
              <span>Add</span>
            </a>
          </div>-->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TitleBar',
  props: {
    titleStack: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
