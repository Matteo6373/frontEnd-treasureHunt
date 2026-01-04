import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasurePathComponent } from './treasure-path-component';

describe('TreasurePathComponent', () => {
  let component: TreasurePathComponent;
  let fixture: ComponentFixture<TreasurePathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreasurePathComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreasurePathComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
