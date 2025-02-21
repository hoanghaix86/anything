import { databaseConfig } from './database.config'
import { envConfig } from './env.config'
import { multerConfig } from './multer.config'

export const configurations = [envConfig, ...databaseConfig, multerConfig]
