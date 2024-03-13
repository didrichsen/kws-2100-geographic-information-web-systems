SELECT g.grunnkretsnavn, st_distance(g.omrade,a.representasjonspunkt)
FROM adresser a
         inner join grunnkrets g
                    on (st_dwithin(g.omrade,a.representasjonspunkt,100))
where a.adressetekst = 'Prinsens gate 2';