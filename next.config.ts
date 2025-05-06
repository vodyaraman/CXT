import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.resolve = {
      ...(config.resolve || {}),
      alias: {
        ...(config.resolve?.alias || {}),
        '@': path.resolve(__dirname, 'src'),
      },
    }

    const oneOfRules =
      (config.module?.rules || []).find(
        (r: any): r is { oneOf: any[] } => Array.isArray((r as any).oneOf)
      )?.oneOf || []

    oneOfRules.forEach((rule: any) => {
      if ('use' in rule && Array.isArray(rule.use)) {
        rule.use.forEach((u: any) => {
          if (
            typeof u === 'object' &&
            u !== null &&
            'loader' in u &&
            typeof u.loader === 'string' &&
            u.loader.includes('sass-loader')
          ) {
            u.options = {
              ...(typeof u.options === 'object' && u.options !== null ? u.options : {}),
              additionalData: `
                @use "@/styles/variables" as *;
                @use "@/styles/mixins" as *;
              `,
            }
          }
        })
      }
    })

    return config
  },
}

export default nextConfig
