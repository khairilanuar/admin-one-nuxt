export default function(ctx) {
  // eslint-disable-next-line no-console
  ctx.app.$storage.setUniversal('test-middleware', 'hello storage')

  // eslint-disable-next-line no-console
  console.log(ctx.app.$storage.getUniversal('test-middleware'))
}
