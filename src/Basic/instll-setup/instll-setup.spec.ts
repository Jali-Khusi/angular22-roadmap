import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstllSetup } from './instll-setup';

describe('InstllSetup', () => {
  let component: InstllSetup;
  let fixture: ComponentFixture<InstllSetup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstllSetup],
    }).compileComponents();

    fixture = TestBed.createComponent(InstllSetup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
