// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })





// WORKING 

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 3000,   // fixed port
//     strictPort: true,
//   },
// });





// npm install --save-dev @vitejs/plugin-react


// THIRD ITERATION FOR DEPLOYMENT
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // ✅ important for Vercel to know what to serve
  },
  server: {
    port: 3000,
    strictPort: true,
  },
  // Optional: Fix base URL issues when deployed on a subpath (rare)
  // base: "/"
});




