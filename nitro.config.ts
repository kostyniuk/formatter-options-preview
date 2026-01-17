import { defineNitroConfig } from 'nitro/config'
import { copyFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineNitroConfig({
  preset: 'vercel',
  hooks: {
    compiled: (nitro) => {
      // Copy the native binding to the output directory
      // This runs on the build machine, so on Vercel (Linux) it will copy the linux binding
      const bindingSource = join(__dirname, 'node_modules/@oxfmt/linux-x64-gnu')
      const serverDir = nitro.options.output.serverDir

      if (existsSync(bindingSource)) {
        const bindingDest = join(serverDir, 'node_modules/@oxfmt/linux-x64-gnu')
        mkdirSync(dirname(bindingDest), { recursive: true })
        mkdirSync(bindingDest, { recursive: true })

        // Copy all files from the binding package
        for (const file of readdirSync(bindingSource)) {
          const src = join(bindingSource, file)
          const dest = join(bindingDest, file)
          copyFileSync(src, dest)
        }
        console.log('[nitro] Copied @oxfmt/linux-x64-gnu native binding to output')
      }
    },
  },
  externals: {
    // Don't externalize oxfmt - let Nitro trace it
    inline: ['oxfmt'],
  },
})
