import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasureScrollComponent } from './treasure-scroll-component';

describe('TreasureScrollComponent', () => {
  let component: TreasureScrollComponent;
  let fixture: ComponentFixture<TreasureScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreasureScrollComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreasureScrollComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
