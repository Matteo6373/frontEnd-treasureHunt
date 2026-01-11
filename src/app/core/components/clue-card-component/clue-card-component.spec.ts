import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClueCardComponent } from './clue-card-component';

describe('ClueCardComponent', () => {
  let component: ClueCardComponent;
  let fixture: ComponentFixture<ClueCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClueCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClueCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
