# applitutoriel-js-lite

L'application TUTORIEL a pour objectif de présenter une application basée sur le framework Hornet.

A noter :
* Hornet facilite la mise en oeuvre du RGAA V3 dans une application.
* Mais l'utilisation de Hornet ne garantit pas qu'une application soit valide RGAA.

__Cas fonctionnels__

Les cas fonctionnels présentés dans l'application sont :

* Formulaire de recherche
* Présentation du résultat sous forme de tableau éditable
* Formulaire étendu
* Tableau d'ajout/suppression/modification d'items
* Affichage de graphique

__RGAA V3__

L'applitutoriel est une mise en pratique du RGAA V3 au travers du framework Hornet.

## Prérequis #

* NodeJS 6.X
* hornet-js-builder 1.x.x (le builder) installé globalement :

```shell
    $ npm install -g hornet-js-builder
```

* checkout du projet `applitutoriel-modules`

## Initialisation #
Se positionner dans le répertoire du projet `applitutoriel-js-modules` et lancer la commande :

```shell
    $ hb install
```

## Démarrage de l'application en mode développement #
Se positionner dans le répertoire du projet `applitutoriel-js-lite`

### Commande par défaut

la commande à exécuter en mode développement est la suivante:

```shell
    $ hb w
```

Elle permet de lancer l'application en mode `watcher` afin que les modifications soient prises en compte (ce qui
entrainera un redémarrage du serveur node dans le cas d'une détection de modification).

### Options

Il est également possible d'ajouter à cette commande l'option:

```shell
    $ hb w -i
```

Cette commande indique au builder de ne pas transpiler les fichiers typescript en javascript.
Elle est à utiliser dans le cas où l'IDE a été configuré de telle sorte que la transpilation ts->js
se fasse via ce dernier.


## Vérification

L'application est accessible depuis un navigateur à l'addresse : `http://localhost:8889/applitutorieljslite/` correspond au `contextPath` dans le fichier `config/default.json`.

## Packaging de l'application

```shell
$ hb package
```

Les livrables sont à récupérer dans le répertoire : `target`

- `applitutoriel-js-lite-5.1.0-static.zip`
- `applitutoriel-js-lite-5.1.0-dynamic.zip`

## Fichier de configuration de l'application : default.json

L'ensemble de la configuration applicative du serveur NodeJS se situe dans le fichier default.json contenu dans les sources de l'application

Ce fichier ne doit pas être modifié, excepté pour le log console. Les modifications sont à apporter dans les fichiers d'infrastructure.

### Configuration applicative

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|contextPath| Context de l'applicatin déployé|Par défaut vide|
|welcomePage|Page de démarrage de l'application|Passé en paramètre du ServerConfiguration|
|themName|nom de la dépendance de theme pour la copie dans les static|hornet-themes|

```json
{
  "contextPath": "applitutorieljslite",
  "welcomePage": "/accueil",
  "themeName": "hornet-themes"
  ...
}

```

### Configuration de l'authentification

Note : Il ne s'agit pas d'une configuration à proprement parlé de Hornet mais uniqument viable dans l'applitutoriel

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|loginUrl|Url de connexion à l'application|/login|
|logoutUrl|Url de déconnexion à l'application|/logout|

```json
  "authentication": {
    "loginUrl": "/login",
    "logoutUrl": "/logout"
  }
```

### Configuration du Cache

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|enabled|Activation du cache sur les requêtes de services|true|
|timetolive|Durée de rétention du cache|60|

```json
"cache": {
    "client": {
      "enabled": false,
      "timetolive": 60
    },
    "server": {
      "enabled": false,
      "timetolive": 120
    }
  }
```
