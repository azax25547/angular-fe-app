import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgBaseComponentComponent } from './ag-base-component.component';

describe('AgBaseComponentComponent', () => {
  let component: AgBaseComponentComponent;
  let fixture: ComponentFixture<AgBaseComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgBaseComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgBaseComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
