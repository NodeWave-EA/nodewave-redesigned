import type { Core } from "@strapi/strapi";

const config: Core.Config.Middlewares = [
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:", "http:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "http://localhost:19000",
            "http://localhost:13000",
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "http://localhost:19000",
            "http://localhost:13000",
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  "strapi::logger",
  "strapi::errors",
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
  "global::openinary",
];

export default config;
