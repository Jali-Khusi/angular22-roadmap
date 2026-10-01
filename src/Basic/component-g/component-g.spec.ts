import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentG } from './component-g';

describe('ComponentG', () => {
  let component: ComponentG;
  let fixture: ComponentFixture<ComponentG>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentG],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentG);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
