import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DisableInputDirective } from './disable-input.directive';

@Component({
  template: `
    <h2>Test Input</h2>
    <input appDisableInput />
  `,
})
class TestComponent {
}

describe('DebounceInputDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let inputToTest: DebugElement;

  let component: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisableInputDirective, TestComponent],
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;

    inputToTest = fixture.debugElement.queryAll(
      By.directive(DisableInputDirective)
    )[0];
  });
  it('Should have all elements', () => {
    expect(inputToTest).toBeDefined();
    expect(component).toBeDefined();
  });

  it('Input should be disabled when activating the event', () => {
    const event = new KeyboardEvent('keyup');
    inputToTest.nativeElement.dispatchEvent(event);
    inputToTest.nativeElement.dispatchEvent(event);
    inputToTest.nativeElement.dispatchEvent(event);

    fixture.detectChanges();

    const input = fixture.debugElement.nativeElement.querySelector('input')
      .disabled;

    expect(input).toBeTruthy();
  });

  it('Input should be enabled if it isn\'t the expected event', () => {
    const event = new KeyboardEvent('keydown');
    inputToTest.nativeElement.dispatchEvent(event);
    inputToTest.nativeElement.dispatchEvent(event);
    inputToTest.nativeElement.dispatchEvent(event);

    fixture.detectChanges();

    expect(
      fixture.debugElement.nativeElement.querySelector('input').disabled
    ).toBeFalsy();
  });
});
