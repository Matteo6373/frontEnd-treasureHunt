import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClueComponent } from './add-clue-component';

describe('AddClueComponent', () => {
  let component: AddClueComponent;
  let fixture: ComponentFixture<AddClueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddClueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddClueComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
