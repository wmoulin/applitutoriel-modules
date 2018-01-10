# applitutoriel-js-hornet-lite-batch

L'application TUTORIEL a pour objectif de présenter une application batch basée sur le framework Hornet.

__Cas fonctionnels__

Les cas fonctionnels présentés dans l'application sont :

* Génération de secteur unitaire
* Génération de secteur en masse
* Modification de secteur en masse conditionnée
* Suppression de secteur en masse conditionnée

## Prérequis #

* NodeJS 6.X
* hornet-js-builder 1.X installé en global:

```shell
    $ npm install -g hornet-js-builder
```

* checkout du projet `applitutoriel-js-lite-batch`

## Initialisation #
Se positionner dans le répertoire du projet `applitutoriel-js-lite-batch` et lancer la commande:

```shell
    $ hb install
```

## Démarrage de l'application en mode développement #

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

L'url du batch est accessible depuis un navigateur à l'addresse : `http://localhost:8887/applitutorieljsbatch/` correspond au `contextPath` dans le fichier `config/default.json`.

## Packaging de l'application

```shell
$ hb package
```

Les livrables sont à récupérer dans le répertoire : `target`

- `applitutoriel-lite-batch-5.1.0-dynamic.zip`

## Fichier de configuration de l'application : default.json

L'ensemble de la configuration applicative du serveur NodeJS se situe dans le fichier default.json contenu dans les sources de l'application

Ce fichier ne doit pas être modifié, excepté pour le log console. Les modifications sont à apporter dans les fichiers d'infrastructure.

### Configuration applicative

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|contextPath| Context de l'applicatin déployé|Par défaut vide|

```json
{
  "contextPath": "applitutorieljsbatch",
  ...
}

```
