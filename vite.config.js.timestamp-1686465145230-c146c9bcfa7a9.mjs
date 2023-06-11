// vite.config.js
import { defineConfig } from "file:///E:/Code/sql-social-app/updated/node_modules/vite/dist/node/index.js";
import react from "file:///E:/Code/sql-social-app/updated/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
var vite_config_default = defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0"
  },
  resolve: {
    alias: {
      src: path.resolve("./src"),
      components: path.resolve("./src/components"),
      pages: path.resolve("./src/pages"),
      layout: path.resolve("./src/layout"),
      styles: path.resolve("./src/styles")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxDb2RlXFxcXHNxbC1zb2NpYWwtYXBwXFxcXHVwZGF0ZWRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXENvZGVcXFxcc3FsLXNvY2lhbC1hcHBcXFxcdXBkYXRlZFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovQ29kZS9zcWwtc29jaWFsLWFwcC91cGRhdGVkL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCJcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgc2VydmVyOiB7XG4gICAgaG9zdDogXCIwLjAuMC4wXCIsXG4gIH0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczogIHtcbiAgICAgIHNyYzogcGF0aC5yZXNvbHZlKFwiLi9zcmNcIiksXG4gICAgICBjb21wb25lbnRzOiBwYXRoLnJlc29sdmUoXCIuL3NyYy9jb21wb25lbnRzXCIpLFxuICAgICAgcGFnZXM6IHBhdGgucmVzb2x2ZShcIi4vc3JjL3BhZ2VzXCIpLFxuICAgICAgbGF5b3V0OiBwYXRoLnJlc29sdmUoXCIuL3NyYy9sYXlvdXRcIiksXG4gICAgICBzdHlsZXM6IHBhdGgucmVzb2x2ZShcIi4vc3JjL3N0eWxlc1wiKVxuICAgIH1cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBb1IsU0FBUyxvQkFBb0I7QUFDalQsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUdqQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQVE7QUFBQSxNQUNOLEtBQUssS0FBSyxRQUFRLE9BQU87QUFBQSxNQUN6QixZQUFZLEtBQUssUUFBUSxrQkFBa0I7QUFBQSxNQUMzQyxPQUFPLEtBQUssUUFBUSxhQUFhO0FBQUEsTUFDakMsUUFBUSxLQUFLLFFBQVEsY0FBYztBQUFBLE1BQ25DLFFBQVEsS0FBSyxRQUFRLGNBQWM7QUFBQSxJQUNyQztBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
