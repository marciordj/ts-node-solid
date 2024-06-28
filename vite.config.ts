import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
		exclude: [
			"node_modules",
      "dist",
      ".idea",
      ".git",
      ".cache",
      "build",
      "pgdata",
		]
	},
});
