import type { Core } from "@strapi/strapi";

const config = ({
  env,
}: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  upload: {
    config: {
      // Use minio
      provider: "@avorati/strapi-provider-upload-minio",
      providerOptions: {
        endpoint: env("MINIO_HOST", "localhost"),
        host: env("MINIO_HOST", "localhost"),
        port: env.int("MINIO_PORT", 19000),
        useSSL: env.bool("MINIO_USE_SSL", false),
        accessKey: env("MINIO_ACCESS_KEY", "minioadmin"),
        secretKey: env("MINIO_SECRET_KEY", "minioadmin123"),
        bucket: env("MINIO_BUCKET", "strapi"),
        folder: env("MINIO_FOLDER", "public"),
        private: env.bool("MINIO_PRIVATE", false),
        expiry: env.int("MINIO_EXPIRY", 604800), // 7 days
      },
    },
  },
});

export default config;
