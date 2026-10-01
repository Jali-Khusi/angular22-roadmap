import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasicLanding } from './basic-landing';

describe('BasicLanding', () => {
  let component: BasicLanding;
  let fixture: ComponentFixture<BasicLanding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicLanding],
    }).compileComponents();

    fixture = TestBed.createComponent(BasicLanding);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
