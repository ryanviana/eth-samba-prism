import { Module } from '@nestjs/common';
import { DesignController } from './design.controller';
import { DesignService } from './design.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Design, DesignSchema } from './design.schema';
import { DesignIdCounterModule } from 'src/design_id_counter/design_id_counter.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Design.name, schema: DesignSchema }]),
    DesignIdCounterModule,
  ],
  controllers: [DesignController],
  providers: [DesignService],
  exports: [DesignService],
})
export class DesignModule {}
