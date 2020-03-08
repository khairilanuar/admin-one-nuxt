import Vue from 'vue'
import IdleVue from 'idle-vue'

export default function({ store }) {
  const eventsHub = new Vue()
  const options = {
    eventEmitter: eventsHub,
    store,
    idleTime: (process.env.IDLE_TIMEOUT || 20) * 60 * 1000
  }

  Vue.use(IdleVue, options)
}
