import { Service, signal } from '@angular/core';
import { Kitsune } from './kitsune.model';

@Service()
export class KitsuneService {
  private readonly _kitsunes = signal<Kitsune[]>([
    {
      nom: 'Ichibi',
      description: 'Ichibi est un Bijû scellé dans le corps de Gaara et possède une queue.',
      pv: 120,
      force: 25,
      vitesse: 18,
      enRepos: false,
      victoires: 3,
      boost: false,
      image: 'assets/Ichibi.png',
    },
    {
      nom: 'Nibi',
      description: 'Nibi est un Bijû scellé dans le corps de Yugito Nii et possède deux queues.',
      pv: 95,
      force: 20,
      vitesse: 28,
      enRepos: false,
      victoires: 2,
      boost: true,
      image: 'assets/Nibi.png',
    },
    {
      nom: 'Sanbi',
      description:
        'Sanbi est un Bijû qui a été scellé dans le corps de Yagura Karatachi et possède trois queues.',
      pv: 100,
      force: 22,
      vitesse: 24,
      enRepos: false,
      victoires: 1,
      boost: false,
      image: 'assets/Sanbi.png',
    },
    {
      nom: 'Yonbi',
      description:
        'Yonbi est un Bijû qui a été scellé dans le corps de Rôshi et possède quatre queues.',
      pv: 140,
      force: 16,
      vitesse: 14,
      enRepos: true,
      victoires: 4,
      boost: false,
      image: 'assets/Yonbi.png',
    },
    {
      nom: 'Gobi',
      description: 'Gobi est un Bijû scellé dans le corps de Han et possède cinq queues.',
      pv: 110,
      force: 24,
      vitesse: 20,
      enRepos: false,
      victoires: 0,
      boost: false,
      image: 'assets/Gobi.png',
    },
    {
      nom: 'Rokubi',
      description:
        'Rokubi est un Bijû qui a été scellé dans le corps de Utakata et possède six queues.',
      pv: 110,
      force: 24,
      vitesse: 20,
      enRepos: false,
      victoires: 0,
      boost: false,
      image: 'assets/Rokubi.png',
    },
    {
      nom: 'Nanabi',
      description:
        'Nanabi est un Bijû qui a été scellé dans le corps de Fû et qui possède six queues.',
      pv: 110,
      force: 24,
      vitesse: 20,
      enRepos: false,
      victoires: 0,
      boost: false,
      image: 'assets/Nanabi.png',
    },
    {
      nom: 'Hachibi',
      description:
        'Hachibi est un Bijû qui a été scellé dans le corps de Blue B et de Killer Bee, et qui possède huit queues.',
      pv: 110,
      force: 24,
      vitesse: 20,
      enRepos: false,
      victoires: 0,
      boost: false,
      image: 'assets/Hachibi.png',
    },
    {
      nom: 'Kyubi',
      description: 'Kyuubi est le démon renard à neuf queues et fait parti des bijû.',
      pv: 110,
      force: 24,
      vitesse: 20,
      enRepos: false,
      victoires: 0,
      boost: false,
      image: 'assets/Kyubi.png',
    },
  ]);

  public readonly kitsunes = this._kitsunes.asReadonly();

  getByNom(nom: string): Kitsune | undefined {
    return this._kitsunes().find((k) => k.nom.toLowerCase() === nom.toLowerCase());
  }

  nomExiste(nom: string): boolean {
    return this.getByNom(nom.trim()) !== undefined;
  }

  ajouterKitsune(data: Pick<Kitsune, 'nom' | 'description' | 'pv' | 'force' | 'vitesse'>): boolean {
    if (this.nomExiste(data.nom)) {
      return false;
    }

    const nouveau: Kitsune = {
      ...data,
      nom: data.nom.trim(),
      enRepos: false,
      victoires: 0,
      boost: false,
    };

    this._kitsunes.update((liste) => [...liste, nouveau]);
    return true;
  }

  activerBoost(nom: string): void {
    this._kitsunes.update((liste) => liste.map((k) => (k.nom === nom ? { ...k, boost: true } : k)));
  }

  finaliserCombat(nomGagnant: string, nomPerdant: string): void {
    this._kitsunes.update((liste) =>
      liste.map((k) => {
        if (k.nom === nomGagnant) {
          return { ...k, victoires: k.victoires + 1, boost: false };
        }
        if (k.nom === nomPerdant) {
          return { ...k, enRepos: true, boost: false };
        }
        return k;
      }),
    );

    setTimeout(() => {
      this._kitsunes.update((liste) =>
        liste.map((k) => (k.nom === nomPerdant ? { ...k, enRepos: false } : k)),
      );
    }, 60_000);
  }
}
