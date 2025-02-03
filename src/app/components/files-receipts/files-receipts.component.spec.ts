import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesReceiptsComponent } from './files-receipts.component';

describe('FilesReceiptsComponent', () => {
  let component: FilesReceiptsComponent;
  let fixture: ComponentFixture<FilesReceiptsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilesReceiptsComponent]
    });
    fixture = TestBed.createComponent(FilesReceiptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
