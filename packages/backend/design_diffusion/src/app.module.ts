import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DesignModule } from './design/design.module';
import { Design, DesignSchema } from './design/design.schema';
import { DesignService } from './design/design.service';
import { DesignController } from './design/design.controller';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://rgb:admin@nodeexpress.ps2xp1a.mongodb.net/?retryWrites=true&w=majority',
      { dbName: 'THE_PRISM' },
    ),
    MongooseModule.forFeature([{ name: Design.name, schema: DesignSchema }]),
    DesignModule,
  ],
  controllers: [AppController, DesignController],
  providers: [AppService, DesignService],
})
export class AppModule {}
