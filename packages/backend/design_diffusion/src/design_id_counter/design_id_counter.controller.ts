import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { DesignIdCounterService } from './design_id_counter.service';
import { CreateDesignIdCounterDto } from './dto/create-design_id_counter.dto';
import { UpdateDesignIdCounterDto } from './dto/update-design_id_counter.dto';

@Controller('counter')
export class DesignIdCounterController {
  constructor(
    private readonly designIdCounterService: DesignIdCounterService,
  ) {}

  @Post()
  create(@Body() createDesignIdCounterDto: CreateDesignIdCounterDto) {
    return this.designIdCounterService.create(createDesignIdCounterDto);
  }

  @Get()
  findAll() {
    return this.designIdCounterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.designIdCounterService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDesignIdCounterDto: UpdateDesignIdCounterDto,
  ) {
    return this.designIdCounterService.update(id, updateDesignIdCounterDto);
  }

  //get seq by name
  @Get('seq/:name')
  getSeqByName(@Param('name') name: string) {
    return this.designIdCounterService.getSeqByName(name);
  }
}
