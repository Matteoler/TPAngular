import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  form,
  FormField,
  FormRoot,
  required,
  min,
  max,
} from '@angular/forms/signals';
import { KitsuneService } from '../kitsune';

@Component({
  imports: [FormField, FormRoot],
  selector: 'app-ajout-kitsune',
  styleUrl: './ajout-kitsune.css',
  templateUrl: './ajout-kitsune.html',
})
export class AjoutKitsune {
  private readonly kitsuneService = inject(KitsuneService);
  private readonly router = inject(Router);

  protected readonly erreurNom = signal<string>('');

  private readonly formModel = signal({
    nom: '',
    description: '',
    pv: 100,
    force: 20,
    vitesse: 15,
  });

  protected readonly form = form(
    this.formModel,

    (schema) => {
      required(schema.nom, { message: 'Le kitsune doit avoir un nom' });
      required(schema.pv, { message: 'Le kitsune doit avoir des PV' });
      required(schema.force, { message: 'Le kitsune doit avoir une force' });
      required(schema.vitesse, { message: 'Le kitsune doit avoir une vitesse' });
      required(schema.description, { message: 'Le kitsune doit avoir une description' });
      min(schema.pv, 5, { message: 'Les PV doivent être supérieurs à 5' });
      max(schema.pv, 120, { message: 'Les PV doivent être inférieurs à 120' });
    },

    {
      submission: {
        action: async (field) => {
          this.erreurNom.set('');
          const { nom, description, pv, force, vitesse } = field().value();

          const ok = this.kitsuneService.ajouterKitsune({
            nom,
            description,
            pv,
            force,
            vitesse,
          });

          if (!ok) {
            this.erreurNom.set('Un Kitsune avec ce nom existe déjà.');
            return;
          }

          this.form().reset();
          await this.router.navigate(['/kitsunes']);
        },
      },
    },
  );
}
