import type { Core } from "@strapi/strapi";

export const getOpeninaryMediaUrl = (
  originalUrl: string,
  { env }: Core.Config.Shared.ConfigParams,
): string => {
  if (!originalUrl) {
    return "";
  }

  // Check if the URL is already an Openinary URL
  if (originalUrl.includes("openinary")) {
    return originalUrl;
  }

  // Assuming the original URL is from MinIO, we need to transform it to the Openinary URL format
  // For example, if the original URL is something like:
  // http://nodewave-minio:19000/strapi/uploads/image.jpg
  // We want to transform it to:
  // http://openinary:3000/strapi/uploads/image.jpg

  try {
    const url = new URL(originalUrl);
    const fileName = url.pathname.split("/").filter(Boolean).pop();

    if (!fileName) {
      return originalUrl;
    }

    const baseUrl = env("OPENINARY_URL", "http://localhost:13000").replace(
      /\/$/,
      "",
    );
    const opinionaryUrl = `${baseUrl}/t/w_500,h_500,q_80/${fileName}`;

    return opinionaryUrl;
  } catch (error) {
    console.error("Error occurred while processing the URL:", error);
    return "";
  }
};
