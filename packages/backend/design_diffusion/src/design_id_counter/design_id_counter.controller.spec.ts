import { Test, TestingModule } from '@nestjs/testing';
import { DesignIdCounterController } from './design_id_counter.controller';
import { DesignIdCounterService } from './design_id_counter.service';

describe('DesignIdCounterController', () => {
  let controller: DesignIdCounterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DesignIdCounterController],
      providers: [DesignIdCounterService],
    }).compile();

    controller = module.get<DesignIdCounterController>(DesignIdCounterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
