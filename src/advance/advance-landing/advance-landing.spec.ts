import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdvanceLanding } from './advance-landing';

describe('AdvanceLanding', () => {
  let component: AdvanceLanding;
  let fixture: ComponentFixture<AdvanceLanding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvanceLanding],
    }).compileComponents();

    fixture = TestBed.createComponent(AdvanceLanding);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
