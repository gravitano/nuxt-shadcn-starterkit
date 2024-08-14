// vitest.config.ts
import { fileURLToPath } from 'node:url'
import { defineVitestConfig } from '@nuxt/test-utils/config'
import { configDefaults } from 'vitest/dist/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    environmentOptions: {
      nuxt: {
        rootDir: fileURLToPath(new URL('.', import.meta.url)),
        domEnvironment: 'happy-dom', // 'happy-dom' (default) or 'jsdom'
        overrides: {
          // other Nuxt config you want to pass
        },
      },
    },

    coverage: {
      provider: 'v8',
      reportsDirectory: 'coverage',
      reporter: ['text', 'html', 'lcov', 'json'],
      exclude: [
        ...(configDefaults.coverage.exclude ?? []),
        'layouts/**',
        'plugins/**',
        'components/ui/**', // Exclude Shadcn components
        'components/app/data-table/DataTableColumnHeader.vue',
        'components/app/data-table/DataTableFacetedFilter.vue',
        'components/app/data-table/DataTableRowActions.vue',
        'components/app/data-table/DataTableToolbar.vue',
        'components/app/data-table/DataTableViewOptions.vue',
        'lib/**', // Exclude Shadcn lib
        '**/*.stories.ts',
        '**/*.config.{js,ts,mts,mjs}',
        'api/**', // Exclude API
        'middleware/**', // Exclude middleware
      ],
    },
    globals: true,
  },
})
