create table kommuner
as
SELECT kommunenummer, kommunenavn,omrade FROM kommuner_e1b95ab2fb054ee7998946cce6039771.kommune;
alter table kommuner add primary key (kommunenummer);
create index kommune_omrade on kommuner using gist(omrade);

create table adresser
as
SELECT adresseid,adressenavn,adressetekst,nummer,bokstav,representasjonspunkt FROM matrikkelenadresse_9cf56fec95dd4f00a8a46cbf4b81a27c.vegadresse;
alter table adresser add primary key (adresseid);
create index adresse_punkt on adresser using gist(representasjonspunkt);

SELECT * FROM adresser;

SELECT count(*) FROM adresser;