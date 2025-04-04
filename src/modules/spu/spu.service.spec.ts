import { Test, TestingModule } from '@nestjs/testing';
import { SpuService } from './spu.service';

describe('SpuService', () => {
  let service: SpuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpuService],
    }).compile();

    service = module.get<SpuService>(SpuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
