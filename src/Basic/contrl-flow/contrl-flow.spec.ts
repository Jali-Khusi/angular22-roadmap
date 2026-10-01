import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContrlFlow } from './contrl-flow';

describe('ContrlFlow', () => {
  let component: ContrlFlow;
  let fixture: ComponentFixture<ContrlFlow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContrlFlow],
    }).compileComponents();

    fixture = TestBed.createComponent(ContrlFlow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
