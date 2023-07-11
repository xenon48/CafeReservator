import { ConfigModuleOptions } from "@nestjs/config";


const nodeEnv = process.env.NODE_ENV;

export default {
  isGlobal: true,
  envFilePath: nodeEnv ? `./.env.${nodeEnv}` : './.env',
} as ConfigModuleOptions;