# applitutoriel-js-batch

L'application TUTORIEL a pour objectif de présenter une application batch basée sur le framework HornetJs.

__Cas fonctionnels__

Les cas fonctionnels présentés dans l'application sont :

* Modification de masse d'entités fonctionnelles (secteurs)
* Duplication d'entités fonctionnelles (secteurs)
* Nettoyae d'entités fonctionnelles (secteurs) dupliquées


## Prérequis #

* NodeJS 6.X
* hornet-js-builder 1.5.X installé en global:

```shell
    $ npm install -g hornet-js-builder
```

* clone du projet `applitutoriel-modules`

## Initialisation #
Se positionner dans le répertoire du projet `applitutoriel-js-batch` et lancer la commande:

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

L'url du batch est accessible depuis un navigateur à l'addresse : `http://localhost:8888/applitutoriel-batch/`
où __applitutoriel-batch__ correspond au `contextPath` dans le fichier `config/default.json`.

## Mode Mock

Il est possible d'utiliser l'applitutoriel sans déployer la partie service.
Pour cela, activer le mode `mock` dans le `config/default.json`.

```json
  "mock": {
    "enabled": true
  }
```

## Packaging de l'application

```shell
$ hb package
```

Les livrables sont à récupérer dans le répertoire : `target`

- `applitutoriel-js-batch-5.0.0-dynamic.zip`

## Fichier de configuration de l'application : default.json

L'ensemble de la configuration applicative du serveur NodeJS se situe dans le fichier default.json contenu dans les sources de l'application

Ce fichier ne doit pas être modifié, excepté pour le log console. Les modifications sont à apporter dans les fichiers d'infrastructure.

### Configuration applicative

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|contextPath| Context de l'applicatin déployé|Par défaut vide|

```json
{
  "contextPath": "applitutoriel-js-batch",
  ...
}

```


### Configuration serveur

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|route|Route identifié pour l'affinité de session nodejs|js1|
|port|Port de démarrage du serveur|8888|
|keepAlive|Activation du mode HTTP KeepAlive|true|
|maxConnections|Nombre maximal de connexion à l'instance nodejs|100|
|timeout|Timeout des réponses HTTP|300000|
|uploadFileSize|Taille maximal d'upload de fichier|1000000|
|sessionTimeout|Timeout des sessions utilisateur|1800000|

```json
  "server": {
    "route": "js1",
    "port": 8888,
    "keepAlive": true,
    "maxConnections": 100,
    "timeout": 300000,
    "uploadFileSize": 1000000,
    "sessionTimeout": 1800000
  }
```

### Configuration des logs serveurs

Niveau de log :

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|level.[all]|niveau de log pour toute l'application|INFO|
|level.monappli.view|niveau de log spécifique pour une partie de l'application |optionnel|

```json
 "log": {
    "levels": {
      "[all]": "DEBUG",
      "hornet-js-components.table": "TRACE"
    }
    ...
```

Déclaration des appenders :

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|type|Type d'appender|*file* pour un fichier simple<br/>*dateFile* pour un fichier contenant la date<br/>*console* ...|
|filename| Chemin absolu ou relatif au lancement du fichier de log | /var/log/nodejs/applitutoriel/applitutoriel-1.log|
|pattern| Présent pour les types *dateFile* <br />Permet de donner un pattern de date qui sera ajouté au nom du fichier.|-yyyy-MM-dd|
|layout.type| Type d'affichage des messages|pattern|
|layout.pattern| Schéma d'affichage des messages |"%[%d{ISO8601}|%x{tid}|%x{user}|%p|%c|%x{fn}|%m%]"|


Ex: type console

```json
"appenders": [
	{
	    "type": "console",
	    "layout": {
	      "type": "pattern",
	      "pattern": "%[%d{ISO8601}|%x{tid}|%x{user}|%p|%c|%x{fn}|%m%]"
	    }
	}
]
```

ex : type fichier

```json
"appenders": [
	{
	    "type": "dateFile",
	    "filename": "log/app.log",
	    "layout": {
	      "type": "pattern",
	      "pattern": "%d{ISO8601}|%x{tid}|%x{user}|%p|%c|%x{fn}|%m"
	    }
	}
]
```


### Configuration des services


| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|services.host| URL de déploiement du module applitutoriel-service| [Protocol]://[host]:[port] |
|services.name| Nom de déploiement des services|applitutoriel|

```json
  "services": {
    "host": "http://localhost:8080/",
    "name": "applitutoriel-service"
  },
```

### Mode mock

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|enabled|Activation du mode mock de l'application|false|
|host|Host local du mock|localhost|
|routes|Chemin vers le fichier de routes mocké sans le /src |/mock/routes|

```json
  "mock": {
    "enabled": false
  }
```

### Mode fullSPA

NOTE : Le mode fullSPA n'est pas encore complètement supporté par hornet, la configuration est présente à titre d'information

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|enabled|Activation du mode fullSPA|false|
|host|Host du mode fullSPA|""|
|name|nom du service pour le mode fullSPA|/services|

```json
"fullSpa": {
    "enabled": false,
    "host": "",
    "name": "/services"
  }
```

