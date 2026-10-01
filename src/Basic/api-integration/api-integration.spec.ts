import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiIntegration } from './api-integration';

describe('ApiIntegration', () => {
  let component: ApiIntegration;
  let fixture: ComponentFixture<ApiIntegration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiIntegration],
    }).compileComponents();

    fixture = TestBed.createComponent(ApiIntegration);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
