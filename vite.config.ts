import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import jonLoader from "./plugins/vite-plugin-jon"

export default defineConfig({
  plugins: [tsconfigPaths(), jonLoader()],
})
