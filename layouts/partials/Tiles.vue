<script>
import { chunk, map, without } from 'lodash'

export default {
  name: 'Tiles',
  props: {
    maxPerRow: {
      type: Number,
      default: 5,
    },
  },
  methods: {
    renderAncestor(createElement, elements) {
      return createElement(
        'div',
        { attrs: { class: 'tile is-ancestor' } },
        elements.map((element) => {
          return createElement('div', { attrs: { class: 'tile is-parent' } }, [
            element,
          ])
        })
      )
    },
  },
  render(createElement) {
    let slots = map(this.$slots.default, (o) => {
      if (o.tag !== undefined) return o
    })
    slots = without(slots, undefined)
    if (slots.length <= this.maxPerRow) {
      return this.renderAncestor(createElement, slots)
    } else {
      return createElement(
        'div',
        { attrs: { class: 'is-tiles-wrapper' } },
        chunk(slots, this.maxPerRow).map((group) => {
          return this.renderAncestor(createElement, group)
        })
      )
    }
  },
}
</script>
