import { TestBed } from '@angular/core/testing';
import { PaymentsData } from './payments-data.interface';

import { StorageService } from './storage.service';
import clearAllTimers = jest.clearAllTimers;
import useFakeTimers = jest.useFakeTimers;
import runAllTimers = jest.runAllTimers;
import advanceTimersByTime = jest.advanceTimersByTime;

useFakeTimers();

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(async () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
    jest.spyOn(global, 'setInterval');
  });

  it('Service should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Grid should be initialized with all the elements', () => {
    advanceTimersByTime(2000);
    const grid = service.grid.value;
    expect(grid.length).toBe(10);
    grid.forEach((element) => {
      expect(element.length).toBe(10);
    });
  });

  it('Character map should be initialized with all the characters and count to 0 ', () => {
    const charrMap = [...service.charMap.keys()];
    expect(charrMap.length).toBe(26);
  });

  it('Should generate grid with expected character filling the expected space', async () => {
    advanceTimersByTime(2000);

    await service.generateGrid('a');

    const characterCount = service.charMap.get('A');

    expect(characterCount).toBe(20);
  });

  it('Should add payment data to the Payment Data subject array', () => {
    advanceTimersByTime(2000);

    expect(service.paymentsData.value.length).toBe(0);
    const payData: PaymentsData = {
      code: '35',
      amount: 109,
      payment: 'Assassins Creed: Valhalla',
      gridData: service.grid.value,
    };
    service.addPaymentData(payData);

    expect(service.paymentsData.value.length).toBe(1);

    const paymentData = service.paymentsData.value[0];

    expect(paymentData).toEqual(payData);
  });

  it('Should add two payment data to the Payment Data subject array', () => {
    advanceTimersByTime(2000);

    expect(service.paymentsData.value.length).toBe(0);
    const payData: PaymentsData = {
      code: '35',
      amount: 109,
      payment: 'Assassins Creed: Valhalla',
      gridData: service.grid.value,
    };
    service.addPaymentData(payData);

    expect(service.paymentsData.value.length).toBe(1);

    const paymentData = service.paymentsData.value[0];

    expect(paymentData).toEqual(payData);

    const secondPayData: PaymentsData = {
      code: '92',
      amount: 59,
      payment: 'Cyberpunk 2077',
      gridData: service.grid.value,
    };

    service.addPaymentData(secondPayData);

    expect(service.paymentsData.value.length).toBe(2);

    expect(service.paymentsData.value[1]).toEqual(secondPayData);
  });
});
