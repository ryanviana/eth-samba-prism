import { Test, TestingModule } from '@nestjs/testing';
import { DesignIdCounterService } from './design_id_counter.service';

describe('DesignIdCounterService', () => {
  let service: DesignIdCounterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DesignIdCounterService],
    }).compile();

    service = module.get<DesignIdCounterService>(DesignIdCounterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
