import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KitsuneIntrouvable } from './kitsune-introuvable';

describe('KitsuneIntrouvable', () => {
  let component: KitsuneIntrouvable;
  let fixture: ComponentFixture<KitsuneIntrouvable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KitsuneIntrouvable],
    }).compileComponents();

    fixture = TestBed.createComponent(KitsuneIntrouvable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
