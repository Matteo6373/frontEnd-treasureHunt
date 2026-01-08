import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasureCardComponent } from './treasure-card-component';

describe('TreasureCardComponent', () => {
  let component: TreasureCardComponent;
  let fixture: ComponentFixture<TreasureCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreasureCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreasureCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
