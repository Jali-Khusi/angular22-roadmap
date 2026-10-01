import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuardServiceInterceptor } from './guard-service-interceptor';

describe('GuardServiceInterceptor', () => {
  let component: GuardServiceInterceptor;
  let fixture: ComponentFixture<GuardServiceInterceptor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuardServiceInterceptor],
    }).compileComponents();

    fixture = TestBed.createComponent(GuardServiceInterceptor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
