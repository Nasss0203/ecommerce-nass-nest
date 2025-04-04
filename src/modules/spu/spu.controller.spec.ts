import { Test, TestingModule } from '@nestjs/testing';
import { SpuController } from './spu.controller';
import { SpuService } from './spu.service';

describe('SpuController', () => {
  let controller: SpuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpuController],
      providers: [SpuService],
    }).compile();

    controller = module.get<SpuController>(SpuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
