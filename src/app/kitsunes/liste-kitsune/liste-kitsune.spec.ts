import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListeKitsune } from './liste-kitsune';

describe('ListeKitsune', () => {
  let component: ListeKitsune;
  let fixture: ComponentFixture<ListeKitsune>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeKitsune],
    }).compileComponents();

    fixture = TestBed.createComponent(ListeKitsune);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
