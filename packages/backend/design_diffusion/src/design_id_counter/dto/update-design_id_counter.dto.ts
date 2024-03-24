import { PartialType } from '@nestjs/swagger';
import { CreateDesignIdCounterDto } from './create-design_id_counter.dto';

export class UpdateDesignIdCounterDto extends PartialType(CreateDesignIdCounterDto) {}
