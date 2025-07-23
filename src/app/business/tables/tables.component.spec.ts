import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tables } from './tables.component';

describe('Tables', () => {
  let component: Tables;
  let fixture: ComponentFixture<Tables>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tables]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tables);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
