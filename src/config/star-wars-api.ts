import { Joi } from "celebrate";
import { pipeline } from "ts-pipe-compose";

export interface StarWarsApiConfig {
  baseUrl: string;
}

const loadConfig = (env: any): StarWarsApiConfig => ({
  baseUrl: env.STAR_WARS_API_URL,
});

const validateConfig = (config: StarWarsApiConfig) => {
  const schema = Joi.object<StarWarsApiConfig>().keys({
    baseUrl: Joi.string().required(),
  });
  const { error, value } = schema.validate(config);

  if (error) {
    throw error;
  }

  return value;
};

const createStarWarsApiConfigFromEnvs = pipeline(loadConfig, validateConfig);
export const starWarsApiConfig = createStarWarsApiConfigFromEnvs(process.env);
