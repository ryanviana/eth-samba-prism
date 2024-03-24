import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DesignIdCounterService } from './design_id_counter.service';
import {
  DesignIdCounter,
  DesignIdCounterSchema,
} from './design_id_counter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DesignIdCounter.name, schema: DesignIdCounterSchema },
    ]),
  ],
  providers: [DesignIdCounterService],
  exports: [DesignIdCounterService], // Make CounterService available outside of this module
})
export class DesignIdCounterModule {}
