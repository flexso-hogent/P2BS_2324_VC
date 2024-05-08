namespace my.events;

entity Events {
  key eventID      : Integer;
      naam         : String;
      beschrijving : String;
      datum        : Date;
      beginttijd   : Time;
      eindtijd     : Time;
      locatie      : String;
      sessies      : Association to many Sessions
                       on sessies.event = $self;
}

entity Sessions {
  key sessieID     : Int16;
      naam         : String;
      type         : String;
      beschrijving : String;
      spreker      : String;
      datum        : Date;
      beginttijd   : Time;
      eindtijd     : Time;
      lokaalnummer : String;
      event        : Association to Events;
// aanwezigeGebruikers: Association to many Users //on aanwezigeGebruikers.sessie = $self;
}

entity Users {
  key mail       : String(100) not null; // Mail als primaire sleutel
      voornaam   : String(50);
      achternaam : String(50);
      bedrijf    : String(100);
      titel      : String(50);
      stad       : String(50);
      rol        : String;
}
