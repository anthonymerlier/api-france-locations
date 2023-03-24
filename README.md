# API France Locations

## Points d'entrées

Point d'entrée de l'API

```code
/search/
```

---

Définissez le `type` de recherche :

* Communes : `locations`
* Départements  : `departments`
* Régions  : `regions`
* Nouvelles régions : `new-regions`

Le type de recherche est nécessaire pour l'ensemble des APIs (récupérer les informations, récupérer les coordonnées géographiques et faire une recherche par coordonnées géographiques.).

Pour les types `departments`, `regions` et `new-regions`, une requête à la racine de l'url retourne l'ensemble des éléments.

```code
https://france-locations.api.alexandrevurbier.com/search/:type
```

---

## Récupérer les informations

Cette API permet de récupérer au format JSON les informations de communes, départments, régions - anciennes et nouvelles - de France métropolitaine et Outre-Mer ([cf. structure des données](#structure-des-donn%C3%A9es)).

Le paramètre `query` défini une recherche de plein texte, cette requete retourne le premier élément correspondant trouvé :

```code
https://france-locations.api.alexandrevurbier.com/search/locations/:query
```

Le paramètre `find` défini une recherche retournant un tableau (autocomplétion) comprenant tous les éléments correspondants trouvés :

```code
https://france-locations.api.alexandrevurbier.com/search/locations/find/:query
```

Avec `limit` on peut contrôler le nombre maximum d’éléments retournés, le nombre maximum d'éléments retournés est de 100 :

```code
https://france-locations.api.alexandrevurbier.com/search/locations/find/:query?limit=10
```

Avec `sort` on peut trier les éléments retournés ([cf. structure des données](#structure-des-donn%C3%A9es)) :

```code
https://france-locations.api.alexandrevurbier.com/search/locations/find/:query?sort=fields.com_nom
```

---

## Récupérer les coordonnées géographiques

Cette API permet de récupérer au format GeoJSON les coordonnées géographiques de communes, départments, régions - anciennes et nouvelles - de France métropolitaine et Outre-Mer ([cf. structure des données](#structure-des-donn%C3%A9es)).

Le retour est un GeoJSON ***FeatureCollection***.

Le paramètre `geolocation` correspond à la racine d'une recherche de coordonnées géographiques :

```code
https://france-locations.api.alexandrevurbier.com/search/locations/geolocation
```

Le paramètre `query` défini une recherche de plein texte, cette requete retourne le premier élément correspondant trouvé :

```code
https://france-locations.api.alexandrevurbier.com/search/locations/geolocation/:query
```

Le paramètre `find` défini une recherche retournant un tableau (autocomplétion) comprenant tous les éléments correspondants trouvés :

```code
https://france-locations.api.alexandrevurbier.com/search/locations/geolocation/find/:query
```

Avec `limit` on peut contrôler le nombre maximum d’éléments retournés, le nombre maximum d'éléments retournés est de 100 :

```code
https://france-locations.api.alexandrevurbier.com/search/locations/geolocation/find/:query?limit=7
```

Avec sort on peut trier les éléments retournés ([cf. structure des données](#structure-des-donn%C3%A9es)) :

```code
https://france-locations.api.alexandrevurbier.com/search/locations/geolocation/find/:query?sort=properties.nom
```

---

## Recherche par coordonnées géographiques

Cette API permet de récupérer les informations au format JSON et/ou les coordonnées géographiques au format GeoJSON de communes, départments, régions - anciennes et nouvelles - de France métropolitaine et Outre-Mer à partir d'un point géographique représenté par une latitude et une longitude.

Pour effectuer une recherche par coordonnées géographiques, les paramètres suivants sont obligatoires :

* Latitude : `lat`
* Longitude : `lon`

Les paramètres `lat` et `lon` doivent être au format degrés décimaux (DD). Ex: 41.40338, 2.17403.

Par default le paramètre `max_distance` étant à 0, cette requête retournera l'élément correspondant aux coordonnées `lat` et `lon` :

```code
https://france-locations.api.alexandrevurbier.com/search/locations/geolocation?lat=46.535569558508044&lon=5.376471889399545
```

Pour retourner un tableau d'éléments correspondant à un périmètre de recherche, ajouter le paramètre `max_distance`. Sa valeur est exprimée en mètres (ex : 5000 = 5km) :

```code
https://france-locations.api.alexandrevurbier.com/search/locations/geolocation?lat=46.5355644&lon=5.3764545&max_distance=5000
```

Avec `limit` et `sort` on peut contrôler et trier le nombre d’éléments retournés, le nombre maximum d'éléments retournés est de 100 :

```code
https://france-locations.api.alexandrevurbier.com/search/locations/geolocation?lat=46.5344&lon=5.3545&limit=5&sort=fields.com_nom
```

Le paramètre `return` défini le type d'élément retourné, par default sa valeur est `both`, la requête retourne les informations et les coordonnées des éléments au format GeoJSON.

Les valeurs suivantes de return retournent :

* `both` (default) : informations + coordonées GeoJSON
* `geojson` : coordonées GeoJSON uniquement
* `informations` : informations uniquement

```code
https://france-locations.api.alexandrevurbier.com/search/locations/geolocation?lat=46.5344&lon=5.3545&return=geojson
```

## Documentation technique

### Récupération des informations

Méthode : `GET`  
Point d'entrée : `/search`

| Nom    | Description                                                   | Type   |
|:-------|:--------------------------------------------------------------|:-------|
| :type  | Type d'élément(s) recherché(s)                                | string |
| :query | Chaine de caractères recherchée                               | string |
| /find/ | Paramètre de recherche retournant un tableau (autocomplétion) | string |
| limit  | Contrôle le nombre d’éléments retournés                       | number |
| sort   | Tri les résultats par la valeur spécifiée                     | string |

### Récupération des coordonnées géographiques

Méthode : `GET`  
Point d'entrée : `/search/:type/geolocation`

| Nom    | Description                                                   | Type   |
|:-------|:--------------------------------------------------------------|:-------|
| :type  | Type d'élément(s) recherché(s)                                | string |
| :query | Chaine de caractères recherchée                               | string |
| /find/ | Paramètre de recherche retournant un tableau (autocomplétion) | string |
| limit  | Contrôle le nombre d’éléments retournés                       | number |
| sort   | Tri les résultats par la valeur spécifiée                     | string |

### Recherche par coordonnées géographiques

Méthode : `GET`  
Point d'entrée : `/search/:type/geolocation`

| Nom          | Description                                                   | Type   |
|:-------------|:--------------------------------------------------------------|:-------|
| :type        | Type d'élément(s) recherché(s)                                | string |
| lat          | Latitude (en degrés décimales)                                | string |
| lon          | Longitude (en degrés décimales)                               | string |
| max_distance | Périmètre de recherche exprimé en mètres                      | number |
| limit        | Contrôle le nombre d’éléments retournés                       | number |
| sort         | Tri les résultats par la valeur spécifiée                     | string |
| return       | Type d'élément retourné                                       | string |

## Structure des données

### Communes

```json
{
    "_id": {
        "$oid": "63d2d589b1611a45ca8baed8"
    },
    "datasetid": "fr-esr-referentiel-geographique",
    "fields": {
        "geolocalisation": [
            47.5075942378,
            5.96493598181
        ],
        "uu_id_10": "SO",
        "fr_id": "FR11",
        "dep_num_nom": "70 - Haute-Saône",
        "com_nom_maj_court": "BOURGUIGNON LES LA CHARITE",
        "au_id": "AU997",
        "auc_id": "C70088",
        "dep_nom": "Haute-Saône",
        "uucr_id": "CR70088",
        "aca_id": "A03",
        "reg_nom": "Bourgogne-Franche-Comté",
        "dep_code": "70",
        "com_code2": "70088",
        "fe_id": "FE1",
        "dep_nom_num": "Haute-Saône (70)",
        "com_code": "70088",
        "reg_code_old": "43",
        "uu_id_99": "SO",
        "dep_id": "D070",
        "fd_id": "FD111",
        "com_nom": "Bourguignon-lès-la-Charité",
        "regrgp_nom": "Province",
        "com_nom_maj": "BOURGUIGNON-LES-LA-CHARITE",
        "reg_nom_old": "Franche-Comté",
        "reg_id_old": "R43",
        "reg_id": "R27",
        "aca_nom": "Besançon",
        "com_code1": "70088",
        "uucr_nom": "Bourguignon-lès-la-Charité",
        "ze_id": "ZE4309",
        "uu_id": "SO",
        "auc_nom": "Bourguignon-lès-la-Charité",
        "aca_code": "03",
        "com_id": "C70088",
        "reg_code": "27"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [
            5.96493598181,
            47.5075942378
        ]
    },
    "record_timestamp": "2020-11-23T14:58:15.677+01:00"
}
```

### Communes GeoJSON

```json
{
    "_id": {
        "$oid": "63d2d5dbb1611a45ca8c46dd"
    },
    "type": "Feature",
    "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
            [
                [
                    [
                        -61.54884,
                        16.25312
                    ]
                ]
            ],
            [
                [
                    [
                        -61.55552,
                        16.28638
                    ]
                ]
            ]
        ]
    },
    "properties": {
        "code": "97101",
        "nom": "Abymes"
    }
}
```

### Départements

```json
{
    "_id": {
        "$oid": "63d4131a9d97315de115d49c"
    },
    "code_departement": 5,
    "nom_departement": "Hautes-Alpes",
    "code_nouvelle_region": 93,
    "nom_nouvelle_region": "Provence-Alpes-Côte d'Azur",
    "code_ancienne_region": 93,
    "nom_ancienne_region": "Provence-Alpes-Côte d'Azur",
    "geometry": {
        "type": "Point",
        "coordinates": [
            44.6667,
            6.5
        ]
    }
}
```

### Départements GeoJSON

```json
{
    "_id": {
        "$oid": "63d2de22b1611a45ca8cfd16"
    },
    "type": "Feature",
    "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
            [
                [
                    [
                        -61.79038,
                        16.16682
                    ],
                    [
                        -61.79164,
                        16.1671
                    ]
                ]
            ],
            [
                [
                    [
                        -61.49116,
                        16.19804
                    ]
                ]
            ]
        ]
    },
    "properties": {
        "code": "971",
        "nom": "Guadeloupe"
    }
}
```

### Régions

```json
{
    "_id": {
        "$oid": "63d4134a9d97315de115d500"
    },
    "code_region": 2,
    "nom_region": "Martinique",
    "geometry": {
        "type": "Point",
        "coordinates": [
            14.682,
            -61.023
        ]
    }
}
```

### Régions GeoJSON

```json
{
    "_id": {
        "$oid": "63d2dddcb1611a45ca8cfcf9"
    },
    "type": "Feature",
    "geometry": {
        "type": "Polygon",
        "coordinates": [
            [
                [
                    2.590524,
                    49.079655
                ],
                [
                    2.609132,
                    49.091558
                ],
                [
                    2.610339,
                    49.094943
                ]
            ]
        ]
    },
    "properties": {
        "nom": "Île-de-France",
        "code": "11"
    }
}
```