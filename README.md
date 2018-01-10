# applitutoriel-modules

L'application TUTORIEL a pour objectif de présenter une application basée sur le framework Hornet.

`applitutoriel-modules` chapote différents projets :
* `applitutoriel-js-common` : projet contenant tout le code commun aux différents projets
* `applitutoriel-js` : projet contenant le code spécifique à Hornet.js
* `applitutoriel-js-lite` : projet contenant le code spécifique à Hornet.js lite
* `applitutoriel-js-batch` : projet contenant le code spécifique à Hornet.js batch

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
Se positionner dans le répertoire du projet à démarrer :
* `applitutoriel-js`
* `applitutoriel-js-lite`
* `applitutoriel-js-batch`

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