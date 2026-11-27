import { Routes } from '@angular/router';
import { ListeKitsune } from './kitsunes/liste-kitsune/liste-kitsune';
import { AjoutKitsune } from './kitsunes/ajout-kitsune/ajout-kitsune';
import { DetailKitsune } from './kitsunes/detail-kitsune/detail-kitsune';
import { Bataille } from './kitsunes/bataille/bataille';
import { KitsuneIntrouvable } from './shared/kitsune-introuvable/kitsune-introuvable';

export const routes: Routes = [
  { path: '', redirectTo: 'kitsunes', pathMatch: 'full' },
  { path: 'kitsunes', component: ListeKitsune },
  { path: 'kitsunes/ajouter', component: AjoutKitsune },
  { path: 'kitsunes/:nom', component: DetailKitsune },
  { path: 'bataille', component: Bataille },
  { path: 'introuvable', component: KitsuneIntrouvable },
  { path: '**', redirectTo: 'introuvable' },
];
