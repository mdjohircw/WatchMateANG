import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalFormComponent } from './optional-form.component';

describe('OptionalFormComponent', () => {
  let component: OptionalFormComponent;
  let fixture: ComponentFixture<OptionalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OptionalFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OptionalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
