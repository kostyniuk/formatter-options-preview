import { defineNitroConfig } from 'nitro/config'

export default defineNitroConfig({
  externals: {
    external: [
      'oxfmt',
      '@oxfmt/linux-x64-gnu',
      '@oxfmt/linux-x64-musl',
    ],
    traceInclude: [
      './node_modules/oxfmt/**/*',
      './node_modules/@oxfmt/**/*',
    ],
  },
})
