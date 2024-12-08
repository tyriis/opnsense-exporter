import 'reflect-metadata';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let controller: AppController;
  let service: AppService;

  const mockAppService = {
    getIdentifier: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: mockAppService,
        },
      ],
    }).compile();

    controller = module.get<AppController>(AppController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getIdentifier', () => {
    it('should return service identifier from AppService', () => {
      const expectedResult = { name: 'test-service', version: '1.0.0' };
      mockAppService.getIdentifier.mockReturnValue(expectedResult);

      const result = controller.getIdentifier();

      expect(result).toBe(expectedResult);
      expect(mockAppService.getIdentifier).toHaveBeenCalledTimes(1);
    });
  });

  describe('getHealth', () => {
    it('should return health status message', () => {
      const result = controller.getHealth();
      expect(result).toBe('Service operating normally.');
    });

    it('should return with status 200', () => {
      const metadata = Reflect.getMetadata('__httpCode__', controller.getHealth);
      expect(metadata).toBe(200);
    });

    it('should return with correct content type header', () => {
      const metadata = Reflect.getMetadata('__headers__', controller.getHealth);
      expect(metadata).toEqual([{
        name: 'Content-Type',
        value: 'text/plain; charset=utf-8'
      }]);
    });
  });
});