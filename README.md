# Small API for querying France locations, departments and regions

## Built with

  * Express
  * Mongoose
 
The API allows to get full informations and full geoJson for locations, departments and regions

* Location structure

```json
{
  "_id": {
    "$oid": "63d2d589b1611a45ca8baed8"
  },
  "datasetid": "fr-esr-referentiel-geographique",
  "recordid": "65e037bf3dd948b2a3f5a5ce2c8f6df866bf2d8c",
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

* Department structure

```json
{
  "_id": {
    "$oid": "63d2daa5b1611a45ca8cfc91"
  },
  "code_departement": 1,
  "nom_departement": "Ain",
  "code_nouvelle_region": 84,
  "nom_nouvelle_region": "Auvergne-Rhône-Alpes",
  "code_ancienne_region": 82,
  "nom_ancienne_region": "Rhône-Alpes"
}
```

* Region structure

```json
{
  "_id": {
    "$oid": "63d2da6bb1611a45ca8cfc71"
  },
  "code_region": 52,
  "nom_region": "Pays de la Loire"
}
```
