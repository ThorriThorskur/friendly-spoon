# Inngangur
Hugmyndin af þessu verkefni kom frá því að ég spila magic the gathering og finnst gaman að glugga í spilum og langar að geta gert mér "óskalist". Verkefnið mun því vera vefsíða sem leyfir notendum að gera aðgang, leita af spilum og setja þau á óskalista. Verkefni verður ekki kynnt.

# Útfærslur
Af þessum útfærslum þá held ég að það verði flóknast að passa upp á rétta REST útfærslu og virkni.
* Bakendi  
* Notendaumsjón útfærð.
* Vefþjónusta (REST eða GraphQL) útfærð.
* Gagnagrunnur
* Framendi útfærður 
### Hvers vegna uppfyllir verkefni þessar kröfur?
Verkefnið uppfyllir kröfur því bakendi er útfærður með Node.js og Express.js, 
sem veitir REST API fyrir CRUD aðgerðir tendar PstgreSQL gagnagrunninum í gegnm pg (node-postgres) tengingu.
Vefþjónusta er útfærð sem REST API sem tekur við HTTP beiðnum, vinnur með gögn og skilar á json-sniði.
Gagnagrunnur er notaður og verður hann hýstur á Render PostgreSQL og því hægt að framkvæma fyrirspurnir með SQL.
Framendi verkefnis verður útfærður með React.js þar sem API köll verða gerð með fetch() 
til þess að sæka og senda gögn sem verða síðan birt í viðmóti. Framendi og bakendi verður einig hýst á Render.
# Tækni
Hér fyrir neðan er samantekt af helstu tækni sem verður notuð í verkefninu
### helsta tækni fyrir bakendan
* Node.js fyrir bakenda virkni
* Express.jd til þess að gera REST API
* PostgreSQL fyrir gagnagrunn
* pg (node-postgres) til þess að tengjast gagnagrunninum
* dotenv fyrir umhverfis breyttur t.d. databaseurl
### helsta tækni fyrir framendan
* React.js 
* Fetch API
### Hýsing
* Verkefni verður hýst á Render

# Verkplani

* vika 08 - setja upp grunn
* vika 09 - Útfæra notendur(Gera aðgang)
* vika 10 - spila leitar virkni sem verður knúin af scryfall API
* vika 10 - útfæra óskalista virkni (Bæta við spili/fjarlægja spil)
* vika 11 - Clean up & bug hunt/fix
* vika 12 - Hýsa á Render

# Matskvarði
* 20% Bakendi - Metið hvort Express.js sé rétt sett upp, hvort API vinnur með PostgreSQL og hvort CRUD aðgerðir virki.
* 20% Notendaumsjón - Metið hvort Innskráning/útskráning virkar og að þegar notandi eyðir aðgang eyðis líka óskalisti sjálfkrafa.
* 20% Framendi - Metið hvort React.js framendi kalli á API-ið, birtir gögn og hefur notendavænt UI.
* 20% Metið hvort API-ið fylgir stöðlum, skilar réttu JSON-sniði og hvort villumeðhöndlun sé til staðar.
* 10% Gagnagrunnur - Metið hvort PostgreSQL gagnagrunnurinn geymir gögn rétt, hefur tengingu við bakenda og keyrir SQL fyrirspurnir rétt.
* 5% Hýsing.
* 5% Skýrsla,
# Hvað gekk vel
* N/A
# Hvað gekk ill
* Að finna tíma
# Hvað var áhugavert
* Hvað það tók langan tíma að safna saman og ákveða hvaða "tækni" skyldi nota
# co pilot var notað
