# TPAngular - Kitsunes Battle

Application web Angular (SPA) réalisée dans le cadre du TP d'évaluation Front-End. Elle permet de gérer une liste de Kitsunes, de consulter leurs détails, de tenter de les booster, d'en créer de nouveaux et de les faire combattre.

## Choix techniques principaux

- **Angular 22** avec une organisation par fonctionnalité (`kitsunes/` et `shared/`).
- **Signaux (`signal`, `computed`, `.asReadonly()`)** dans `KitsuneService` pour centraliser les données et contrôler leurs modifications.
- **Signal Forms (`@angular/forms/signals`)** avec `[formRoot]` et `[formField]` pour le formulaire d'ajout d'un Kitsune.
- **Control Flow moderne** (`@if`, `@for`, `@empty`) et injection de dépendances avec `inject()`.
- **Tailwind CSS** avec une mise en page privilégiant **Flexbox** et un design sobre.

## Points de blocage rencontrés et solutions

### 1. Validation dans les Signal Forms (erreur `NG8022`)
- **Blocage** : Au départ, j'avais utilisé les attributs HTML `required` et `min="1"` sur les champs utilisant `[formField]`, ce qui provoquait une erreur de compilation `NG8022`.
- **Solution** : J'ai donc retiré ces attributs du template HTML et déclaré les règles de validation (`required()`, `min()`) directement dans le schéma TypeScript de la fonction `form()`, en m'inspirant de ce qu'on avait fait précédemment en cours.

### 2. Image par défaut sans erreur `404` dans la console
- **Blocage** : J'ai également souhaité ajouter une image pour chaque Kitsune. Le souci, c'est que lorsqu'on créait un Kitsune, il n'avait pas d'image.
- **Solution** : Ajouter un attribut optionnel `image?: string` dans l'interface `Kitsune` et utiliser une image par défaut (ici `kitsune.image ?? 'assets/Jubi.png'`) dans les templates.

### 3. Barre de navigation fixe au scroll (`sticky`)
- **Blocage** : La classe `sticky` placée sur `<nav>` sans seuil de déclenchement ne maintenait pas la barre en haut de l'écran lors du défilement.
- **Solution** : Déplacer `sticky top-0 z-50` directement sur la balise parente `<header>`.

---

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.3.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
