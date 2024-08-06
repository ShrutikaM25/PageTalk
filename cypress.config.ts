import { defineConfig } from "cypress";

export default defineConfig({
    viewportWidth: 1280,
    viewportHeight: 800,
    component: {
        devServer: {
            framework: "next",
            bundler: "webpack",
        },
    },
});
