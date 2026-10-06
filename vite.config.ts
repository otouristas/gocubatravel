import { defineConfig } from "vite";
import vinext from "vinext";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";

const isCloudflareBuildOutput = process.env.CLOUDFLARE_VITE_FORCE_BUILD_OUTPUT === "true";

export default defineConfig({
  plugins: [
    tailwindcss(),
    vinext(),
    cloudflare({
      viteEnvironment: isCloudflareBuildOutput
        ? { name: "rsc" }
        : { name: "rsc", childEnvironments: ["ssr"] },
    }),
  ],
});
