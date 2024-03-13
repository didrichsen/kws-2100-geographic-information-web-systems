create table kommune
as
SELECT kommunenummer,kommunenavn,omrade FROM kommuner_e1b95ab2fb054ee7998946cce6039771.kommune;
alter table kommune add primary key (kommunenummer);
create index kommune_omrade on kommune using gist(omrade);

create table adresser
as
SELECT  adresseid,adressenavn, adressetekst, nummer, bokstav, representasjonspunkt
from matrikkelenadresse_9cf56fec95dd4f00a8a46cbf4b81a27c.vegadresse;
alter table adresser add primary key (adresseid);
/*
 Lets try without indexing.
 */

create table grunnkrets
as
SELECT grunnkretsnummer,grunnkretsnavn,omrade
from grunnkretser_e01a5e1f76374c6cb1e71d4c940964ab.grunnkrets;

select *
from adresser a
         inner join grunnkrets g
                    on (st_contains(g.omrade,a.representasjonspunkt))
where a.adressetekst = 'Prinsens gate 2'