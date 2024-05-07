using my.events as my from '../db/data-model';

service EventService {
  entity Events   as projection on my.Events;
  entity Sessions  as projection on my.Sessions;
  entity Users     as projection on my.Users;
}

/* service CatalogService {
  entity Evenement {
    key eventID : UUID;
    naam   : String;
    beschrijving: String;
    datum    : DateTime;
    locatie: String;
    sessies: Association to Sessie;
  }

  entity Sessie {
    key sessieID : UUID;
    naam  : String;
    beschrijving: String;
    spreker: String;
    datum: DateTime;
    lokaalnummer: String;
    event : Association to Evenement;
    aanwezigeGebruikers: Association to Gebruiker;
  }

  entity Gebruiker {
    key mail: String(100) not null; // Mail als primaire sleutel
    voornaam: String(50);
    achternaam: String(50);
    bedrijf: String(100);
    titel: String(50);
    stad: String(50);
    rol: String;
    }

}
 */
