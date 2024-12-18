import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorFormComponent } from './donor-form.component';

describe('DonorFormComponent', () => {
  let component: DonorFormComponent;
  let fixture: ComponentFixture<DonorFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonorFormComponent]
    });
    fixture = TestBed.createComponent(DonorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
