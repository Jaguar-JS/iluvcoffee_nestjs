import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getTypeOrmConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  return {
	type: 'postgres',
	host: configService.get('POSTGRES_HOST'),
	port: +configService.get('POSTGRES_PORT'),
	database: configService.get('POSTGRES_DB'),
	username: configService.get('POSTGRES_USER'),
	password: configService.get('POSTGRES_PASSWORD'),
	autoLoadEntities: true,
	synchronize: true,
	logging: true,
  };
};
