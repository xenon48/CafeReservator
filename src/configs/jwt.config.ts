import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default async (configService: ConfigService): Promise<JwtModuleOptions> => (
	{
		global: true,
		signOptions: {
			expiresIn: '30d',
		},
		secret: configService.get<string>('PRIVATE_KEY'),
	}
);