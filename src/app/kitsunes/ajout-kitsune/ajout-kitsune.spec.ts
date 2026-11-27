import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AjoutKitsune } from './ajout-kitsune';

describe('AjoutKitsune', () => {
  let component: AjoutKitsune;
  let fixture: ComponentFixture<AjoutKitsune>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutKitsune],
    }).compileComponents();

    fixture = TestBed.createComponent(AjoutKitsune);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
