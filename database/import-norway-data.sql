create table kommuner
as
SELECT kommunenummer, kommunenavn,omrade FROM kommuner_e1b95ab2fb054ee7998946cce6039771.kommune;
alter table kommuner add primary key (kommunenummer);
create index kommune_omrade on kommuner using gist(omrade);