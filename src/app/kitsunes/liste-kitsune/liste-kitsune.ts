import { Component, inject } from '@angular/core';
import { KitsuneService } from '../kitsune';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-liste-kitsune',
  styleUrl: './liste-kitsune.css',
  templateUrl: './liste-kitsune.html',
})
export class ListeKitsune {
  private readonly kitsuneService = inject(KitsuneService);
  protected readonly kitsunes = this.kitsuneService.kitsunes;
}
