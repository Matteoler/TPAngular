import { Component, computed, inject, signal } from '@angular/core';
import { KitsuneService } from '../kitsune';
import { Kitsune } from '../kitsune.model';

@Component({
  imports: [],
  selector: 'app-bataille',
  styleUrl: './bataille.css',
  templateUrl: './bataille.html',
})
export class Bataille {
  private readonly kitsuneService = inject(KitsuneService);

  protected readonly kitsunesDisponibles = computed(() =>
    this.kitsuneService.kitsunes().filter((k) => !k.enRepos),
  );

  protected readonly selection = signal<string[]>([]);
  protected readonly combatEnCours = signal(false);
  protected readonly resultat = signal<string>('');

  protected estSelectionne(nom: string): boolean {
    return this.selection().includes(nom);
  }

  protected toggleSelection(nom: string): void {
    if (this.combatEnCours()) return;

    this.selection.update((actuels) => {
      if (actuels.includes(nom)) {
        return actuels.filter((n) => n !== nom);
      }
      if (actuels.length < 2) {
        return [...actuels, nom];
      }
      return actuels;
    });
  }

  protected lancerCombat(): void {
    const [nom1, nom2] = this.selection();
    const k1 = this.kitsuneService.getByNom(nom1);
    const k2 = this.kitsuneService.getByNom(nom2);
    if (!k1 || !k2) return;

    this.combatEnCours.set(true);
    this.resultat.set('');

    const { gagnant, perdant } = this.simulerCombat(k1, k2);

    setTimeout(() => {
      this.kitsuneService.finaliserCombat(gagnant.nom, perdant.nom);
      this.resultat.set(
        `Victoire de ${gagnant.nom} face à ${perdant.nom} ! (${perdant.nom} est en repos pour 1 minute)`,
      );
      this.selection.set([]);
      this.combatEnCours.set(false);
    }, 3000);
  }

  private simulerCombat(k1: Kitsune, k2: Kitsune): { gagnant: Kitsune; perdant: Kitsune } {
    let pv1 = k1.boost ? k1.pv * 2 : k1.pv;
    let pv2 = k2.boost ? k2.pv * 2 : k2.pv;

    let tourDeK1: boolean;
    if (k1.vitesse > k2.vitesse) {
      tourDeK1 = true;
    } else if (k2.vitesse > k1.vitesse) {
      tourDeK1 = false;
    } else {
      tourDeK1 = Math.random() < 0.5;
    }

    while (pv1 > 0 && pv2 > 0) {
      if (tourDeK1) {
        pv2 -= k1.force;
      } else {
        pv1 -= k2.force;
      }
      tourDeK1 = !tourDeK1;
    }

    return pv1 > 0 ? { gagnant: k1, perdant: k2 } : { gagnant: k2, perdant: k1 };
  }
}
