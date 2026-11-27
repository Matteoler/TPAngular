import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Bataille } from './bataille';

describe('Bataille', () => {
  let component: Bataille;
  let fixture: ComponentFixture<Bataille>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bataille],
    }).compileComponents();

    fixture = TestBed.createComponent(Bataille);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
