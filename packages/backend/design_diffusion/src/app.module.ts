import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DesignModule } from './design/design.module';
import { Design, DesignSchema } from './design/design.schema';
import { DesignService } from './design/design.service';
import { DesignController } from './design/design.controller';
import { DesignIdCounterModule } from './design_id_counter/design_id_counter.module';
import { DesignIdCounterController } from './design_id_counter/design_id_counter.controller';
import { DesignIdCounterService } from './design_id_counter/design_id_counter.service';
import {
  DesignIdCounter,
  DesignIdCounterSchema,
} from './design_id_counter/design_id_counter.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://rgb:admin@nodeexpress.ps2xp1a.mongodb.net/?retryWrites=true&w=majority',
      { dbName: 'THE_PRISM' },
    ),
    MongooseModule.forFeature([{ name: Design.name, schema: DesignSchema }]),
    DesignModule,
    MongooseModule.forFeature([
      { name: DesignIdCounter.name, schema: DesignIdCounterSchema },
    ]),
  ],
  controllers: [AppController, DesignController, DesignIdCounterController],
  providers: [AppService, DesignService, DesignIdCounterService],
})
export class AppModule {}
