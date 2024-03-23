import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DesignService } from './design.service';
import { CreateDesignDto } from './dto/create-design.dto';
import { UpdateDesignDto } from './dto/update-design.dto';

@Controller('designs')
export class DesignController {
  constructor(private readonly designService: DesignService) {}

  @Post()
  create(@Body() createDesignDto: CreateDesignDto) {
    return this.designService.create(createDesignDto);
  }
  @Get()
  findAll() {
    return this.designService.findAll();
  }

  // Changed to expect `id` as a string to match MongoDB ObjectId format
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.designService.findOne(id);
  }

  // Same here, expecting `id` as a string
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDesignDto: UpdateDesignDto) {
    return this.designService.update(id, updateDesignDto);
  }

  // And here, ensuring `id` is treated as a string
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.designService.remove(id);
  }
}
