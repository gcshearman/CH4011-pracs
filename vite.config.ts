import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],

  base: "/CH4011-pracs/",

  resolve: {
    // Let Vite read paths from tsconfig automatically
    tsconfigPaths: true,
  },
})