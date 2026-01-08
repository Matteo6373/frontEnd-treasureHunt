import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTreasureCardComponent } from './add-treasure-card-component';

describe('AddTreasureCardComponent', () => {
  let component: AddTreasureCardComponent;
  let fixture: ComponentFixture<AddTreasureCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTreasureCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTreasureCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
