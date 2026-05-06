import type { Core } from "@strapi/strapi";
import { getOpeninaryMediaUrl } from "../utils/openinaryMediaUrl";

type Env = Core.Config.Shared.ConfigParams["env"];

const env = ((key: string, defaultValue?: string) =>
  process.env[key] ?? defaultValue) as Env;

type TransformResult = {
  data: any;
  transformedCount: number;
};

const transformOpeninaryMediaUrls = (
  data: any,
  config: { env: Env },
): TransformResult => {
  if (!data) {
    return { data, transformedCount: 0 };
  }

  if (Array.isArray(data)) {
    return data.reduce<TransformResult>(
      (result, item) => {
        const transformedItem = transformOpeninaryMediaUrls(item, config);
        result.data.push(transformedItem.data);
        result.transformedCount += transformedItem.transformedCount;
        return result;
      },
      { data: [], transformedCount: 0 },
    );
  }

  if (typeof data === "object") {
    const transformedData: any = {};
    let transformedCount = 0;

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key];

        if (typeof value === "string" && value.includes("/public/")) {
          const transformedUrl = getOpeninaryMediaUrl(value, config);
          transformedData[key] = transformedUrl;
          transformedCount += transformedUrl !== value ? 1 : 0;
        } else {
          const transformedValue = transformOpeninaryMediaUrls(value, config);
          transformedData[key] = transformedValue.data;
          transformedCount += transformedValue.transformedCount;
        }
      }
    }

    return { data: transformedData, transformedCount };
  }

  return { data, transformedCount: 0 };
};

export default (_config: unknown, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx: any, next: () => Promise<void>) => {
    strapi.log.debug(`[openinary] inspecting ${ctx.method} ${ctx.path}`);
    await next();

    if (ctx.body) {
      const transformed = transformOpeninaryMediaUrls(ctx.body, { env });
      ctx.body = transformed.data;

      if (transformed.transformedCount > 0) {
        strapi.log.info(
          `[openinary] transformed ${transformed.transformedCount} media URL(s) on ${ctx.method} ${ctx.path}`,
        );
      }
    } else {
      strapi.log.debug(`[openinary] no body on ${ctx.method} ${ctx.path}`);
    }
  };
};
