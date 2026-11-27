import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailKitsune } from './detail-kitsune';

describe('DetailKitsune', () => {
  let component: DetailKitsune;
  let fixture: ComponentFixture<DetailKitsune>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailKitsune],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailKitsune);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
