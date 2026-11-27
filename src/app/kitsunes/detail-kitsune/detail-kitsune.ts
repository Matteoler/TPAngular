import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { KitsuneService } from '../kitsune';

@Component({
  imports: [RouterLink],
  selector: 'app-detail-kitsune',
  styleUrl: './detail-kitsune.css',
  templateUrl: './detail-kitsune.html',
})
export class DetailKitsune {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly kitsuneService = inject(KitsuneService);

  private readonly nomParam = signal<string>('');
  protected readonly tentatives = signal(0);
  protected readonly messageBoost = signal<string>('');

  protected readonly kitsune = computed(() => this.kitsuneService.getByNom(this.nomParam()));

  protected readonly boostDesactive = computed(() => {
    const k = this.kitsune();
    return !k || k.boost || this.tentatives() >= 3;
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const nom = params.get('nom') ?? '';
      this.nomParam.set(nom);
      this.tentatives.set(0);
      this.messageBoost.set('');

      if (!this.kitsuneService.getByNom(nom)) {
        this.router.navigate(['/introuvable']).then(() => {});
      }
    });
  }

  protected tenterBoost(): void {
    const k = this.kitsune();
    if (!k || this.boostDesactive()) return;

    const reussite = Math.random() < 0.25; // 25% de chance
    if (reussite) {
      this.kitsuneService.activerBoost(k.nom);
      this.messageBoost.set('Boost activé avec succès !');
    } else {
      this.tentatives.update((n) => n + 1);
      this.messageBoost.set(`Échec du boost (${this.tentatives()}/3 tentatives).`);
    }
  }
}
