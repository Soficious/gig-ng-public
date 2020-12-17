import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { CodePipe } from './code.pipe';
import { StorageService } from './storage.service';

describe('CodePipe', () => {
  let service: StorageService;
  let codePipe: CodePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
    }).compileComponents();

    service = TestBed.inject(StorageService);

    service.charMap.set('A', 13);
    service.charMap.set('B', 9);
    service.charMap.set('C', 10);
    service.charMap.set('D', 8);

    service.grid = new BehaviorSubject<any>([
      ['A', 'C', 'D', 'C', 'C', 'A', 'A', 'D'],
      ['B', 'A', 'D', 'C', 'A', 'C', 'B', 'C'],
      ['B', 'C', 'B', 'B', 'D', 'A', 'A', 'C'],
      ['D', 'A', 'B', 'D', 'B', 'A', 'B', 'B'],
      ['C', 'A', 'A', 'C', 'D', 'A', 'D', 'A'],
    ]);
    codePipe = new CodePipe(service);
  });

  it('create an instance', () => {
    expect(codePipe).toBeTruthy();
  });

  it('Should properly transform the code', () => {
    const transormedPipe = codePipe.transform('24');
    expect(transormedPipe).toEqual('87');
  });
});
