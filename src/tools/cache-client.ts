import { createClient } from "redis";
import { createLogger, Logger } from "@tshio/logger";
import { loadEnvs } from "../config/env";

loadEnvs();

export interface CacheClient {
  get(key: string): Promise<any>;
  set(key: string, data: any, duration?: number): Promise<boolean>;
}

export class CustomRedisClient implements CacheClient {
  private readonly cacheClient: ReturnType<typeof createClient>;

  private logger: Logger;

  constructor() {
    this.cacheClient = createClient({ url: process.env.REDIS_URL as string });
    this.logger = createLogger();
    this.cacheClient.on("error", (err) => {
      if (err) {
        this.logger.error(`Unhandled redis error: ${err.toString()}`, err);
      }
    });
  }

  public async connect() {
    return this.cacheClient.connect();
  }

  public async get(key: string) {
    try {
      const result = await this.cacheClient.get(key);
      if (!result) {
        return null;
      }
      return JSON.parse(result);
    } catch (err) {
      return null;
    }
  }

  public async set(key: string, data: any, duration: number = 1800): Promise<boolean> {
    const status = await this.cacheClient.set(key, JSON.stringify(data), {
      EX: duration,
    });

    this.logger.info(`Cache set for key: ${key}`);

    return status === "OK";
  }
}

export const cacheClient = new CustomRedisClient();
