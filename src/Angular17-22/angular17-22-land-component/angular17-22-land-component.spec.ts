import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Angular1722LandComponent } from './angular17-22-land-component';

describe('Angular1722LandComponent', () => {
  let component: Angular1722LandComponent;
  let fixture: ComponentFixture<Angular1722LandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Angular1722LandComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Angular1722LandComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
