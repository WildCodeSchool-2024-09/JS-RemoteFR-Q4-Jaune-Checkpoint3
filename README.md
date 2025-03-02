# Checkpoint 3 - JS

## Introduction - Que sont les checkpoints ?

Pour rappel un **checkpoint** est un terme utilisé dans la Wild Code School pour décrire une **auto-évaluation dans un temps donné**. Elle dure généralement une demi-journée (jusqu'à une journée complète ou plus).

Ces checkpoints sont conçus pour atteindre un certain nombre d’objectifs en te présentant :

> 1. ... une façon de mesurer tes progrès 📏📈
> 2. ... la possibilité d'utiliser tes compétences acquises dans un objectif qui a du sens 🚩🥅
> 3. ... la possibilité d'exercer les compétences de gestion du temps et de priorisation ⌛⬆️
> 4. ... l'opportunité de revoir et d'apprendre du code des autres, montrant qu'il existe toujours de nombreuses façons différentes d'accomplir une tâche 👥💬

## Les grandes lignes – Applicables à tous les checkpoints

Chaque checkpoint implique un ensemble d’étapes similaires :

1. Cloner le dépôt localement à l'aide des commandes git
2. Immédiatement après le clonage, créer une nouvelle branche localement et basculer dessus
3. Pour nommer ta branche, nous aimerions que tu utilises le modèle `{{firstname}}_{{LASTNAME}}` où :

- `{{firstname}}` est un placeholder qui doit être remplacé par ton prénom, en minuscules
- `{{LASTNAME}}` est un placeholder qui doit être remplacé par ton nom de famille, en majuscules

(par exemple, si ton prénom est John et ton nom Doe, le modèle `{{firstname}}_{{LASTNAME}}` donnera `john_DOE`)

4. Ouvrir le dépôt cloné dans ton IDE
5. Faire un commit après chaque étape, avec un message de commit qui met en évidence la partie terminée (par exemple `finished step 1`)
6. Pousser tes modifications vers GitHub, de préférence après chaque validation

## Pour ce checkpoint en particulier

Ton objectif est de voir où tu en es sur :

- [ ] La modélisation de base de données
- [ ] L'utilisation des routes dans Express
- [ ] L'utilisation des actions / middlewares
- [ ] L'utilisation des repositories
- [ ] Les jointures en SQL

Lance les commandes suivantes :

```bash
npm install
cd server
```

Un éditeur nous a confié la version alpha d'un jeu dans l'univers de "Pirates des Caraïbes".
Mais seul la partie frontend est disponible.
Pour ce checkpoint, tu vas rendre le jeu fonctionnel et travailler exclusivement sur le backend.

Si le contexte du jeu t'intéresse, voici le pitch :

> Le pirate le plus célèbre du monde, le grand et l'inimitable capitaine Jack Sparrow, part à la recherche du trésor perdu de Rackham le Rouge, un vieux pirate impitoyable qui semait la terreur parmi les mers des Caraïbes, il y a très très longtemps.
>
> Un vieux marin du Royaume de France, le capitaine Haddock, a donné à Jack une carte mystérieuse avec de nombreuses îles dessus. Haddock sait seulement que le trésor est enterré sur l'une de ces îles.
> Jack et son équipage ont pour mission de naviguer vers chacune d'elle, jusqu'à trouver les pièces d'or et les pierres précieuses qui constituent le trésor.
>
> Prenez le contrôle du Black Perl, le magnifique vaisseau de Jack, et naviguez parmi les océans.
> Évitez les krakens, les tempêtes ou autres pirates et soyez le premier à trouver le trésor !
> Il est temps de terminer votre dernière bouteille de rhum et de commencer cette aventure !

## Avant d'attaquer le code

Pour t'échauffer, commençons par un petit exercice de conception de base de données.

Jack aime entendre de la musique pendant la navigation.
Il veut créer sa propre application pour gérer les albums et les pistes.
Aide-le en créant le Modèle Conceptuel de Données (MCD) pour les fonctionnalités suivantes :

- Jack doit pouvoir récupérer la liste complète des albums.
- Chaque album a un titre, un genre, une image et un artiste.
- Un album peut contenir plusieurs pistes, mais doit au moins en contenir une.
- Une piste appartient à un et un seul album.
- Chaque piste possède un titre et une URL YouTube.

Enregistre une image de ta modélisation dans ce dépôt avec Git.

## Jouer avec les tests

La partie backend contient des tests pour chaque étape du checkpoint.
Tu peux commencer par lancer la commande suivante :

```bash
npm run test install
```

Après avoir executé cette commande, le terminal devrait afficher :

```
FAIL  tests/install.test.ts
  Installation
    ✕ You have created /server/.env (2 ms)
    ✓ You have retained /server/.env.sample
    ✕ You have filled /server/.env with valid information to connect to your database (18 ms)
    ✕ You have executed the db:migrate script (2 ms)
```
    
Les tests exécutés par la commande "npm run test" nous permettent de tester toutes sortes de choses (routes, requêtes ...). Ici il s'agit de tester l'installation et la configuration du checkpoint. Ce message qui s'affiche suite au premier test ressemblera aux autres étapes du checkpoint. 

Tu dois faire en sorte que chacune des étapes soit validée.

Si tu ne l'as pas déjà fait, pour passer ce premier test, tu dois créer le fichier `.env` en copiant `.env.sample`.

Si tu crées le `.env` comme demandé (en conservant `.env.sample`) et que tu relances le test, tu devrais voir : 

```
  Installation
    ✓ You have created /server/.env (1 ms)
    ✓ You have retained /server/.env.sample
    ✕ You have filled /server/.env with valid information to connect to your database (31 ms)
    ✕ You have executed the db:migrate script (3 ms)
```
    
Tu peux remarquer que l'étape `You have created /server/.env` est maintenant cochée. Il ne te reste plus qu'à faire le reste 🚀 !

**Attention :** Matelote, matelot ! Le README est tout aussi important que les messages des tests. C'est comme une carte qui t'aide à naviguer. Donc, n'oublie pas qu'il existe !

Le schéma de la base de données pour ce projet est fourni dans `server/database/schema.sql` : la base de données contiendra des bateaux (pirates) et des "tuiles" d'une carte au trésor.

Tu dois exécuter le script `db:migrate` pour créer et remplir la base de données :

```bash
npm run db:migrate
```

Si tu relances les tests sur l'installation, tout devrait être au vert :

```bash
npm run test install
```

> Appelle ton formateur/ta formatrice si ce n'est pas le cas : c'est à ça que servent ces tests 😉

Tu peux maintenant réaliser la suite, étape par étape (pour chaque étape, suis les indications des tests dans la console) :

- `npm run test step1` : ajouter un champ `has_treasure` à la table `tile` (booléen, non nul, `false` par défaut).
- `npm run test step2` : créer une route `GET /api/tiles` avec une action fonctionnelle (tu peux suivre le modèle de `GET /api/boats`).
- `npm run test step3` : créer une route `PUT /api/boats/:id` pour mettre à jour un bateau de la base de données. Pense à revoir la quête "BREAD" sur Odyssey pour t'aider : tu dois ici réaliser l'opération "Edit". Ta route doit renvoyer un statut `204` si la mise à jour a réussi. Dans ton action, tu peux accéder avec le paramètre `req` à :
  - l'id du bateau (`req.params.id`),
  - ses coordonnées X et Y (`req.body.coord_x` et `req.body.coord_y`).
- `npm run test step4` : créer un middleware dans `server/app/modules/tile/tileActions.ts` pour tester si une tuile avec les coordonnées `req.body.coord_x` et `req.body.coord_y` existe ou non dans la base de données.
  - Pour cette étape, idéalement tu dois utiliser `tileRepository` pour trouver des tuiles à partir de leurs coordonnées (tu dois compléter la méthode `readByCoordinates` de la classe `TileRepository`).
  - Si tu as des difficultés à utiliser `tileRepository`, tu peux t'en passer en vérifiant que la coordonnée X est comprise entre 0 et 11 (inclus), et que la coordonnée Y est comprise entre 0 et 5 (inclus).
  - Si les coordonnées sont valides, passe au suivant. Sinon, répond avec un statut `422`.
- `npm run test step5` : utiliser une jointure dans la méthode `readAll` de `BoatRepository` pour récupérer les informations de la tuile où se trouve le bateau. Assure toi de demander explicitement chaque champ (la jointure va te fournir 2 ids : `boat.id` et `tile.id`).

Étape bonus :

- `npm run test bonus` : ajouter un filtre sur le nom à la méthode `readAll` de `BoatRepository` (et traiter le cas où aucune valeur n'est passée pour le paramètre).

## Et après ?

Si tu veux voir le jeu alimenté par ton backend, retourne à la racine du projet et lance _front et back_ :

```bash
cd ..
npm run dev
```

Et ouvre l'adresse http://localhost:3000/ (n'oublie pas : c'est une version alpha 😅).
