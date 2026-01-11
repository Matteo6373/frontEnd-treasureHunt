import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonGenererateAi } from './button-genererate-ai';

describe('ButtonGenererateAi', () => {
  let component: ButtonGenererateAi;
  let fixture: ComponentFixture<ButtonGenererateAi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonGenererateAi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonGenererateAi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
