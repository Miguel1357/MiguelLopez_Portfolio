import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/MiguelLopez_Portfolio/",
  plugins: [react(), tailwindcss()],
});
