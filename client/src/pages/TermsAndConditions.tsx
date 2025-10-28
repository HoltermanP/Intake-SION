'use client';
import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  Grid
} from '@mui/material';
import { useParams } from 'next/navigation';

const TermsAndConditions: React.FC = () => {
  const params = useParams();
  const projectNumber = params?.projectNumber as string;

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Algemene Voorwaarden
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <Typography variant="h6" gutterBottom>
          Algemene Voorwaarden voor D2N Aansluitingen
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          Project: {projectNumber}
        </Typography>
      </Paper>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="primary">
            1. Algemene Bepalingen
          </Typography>
          <Typography variant="body1" paragraph>
            Deze algemene voorwaarden zijn van toepassing op alle overeenkomsten tussen D2N en de klant betreffende het leveren van elektriciteitsaansluitingen en bijbehorende diensten.
          </Typography>
          
          <Typography variant="body1" paragraph>
            Door het aangaan van een overeenkomst met D2N aanvaardt de klant deze algemene voorwaarden volledig en onvoorwaardelijk.
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="primary">
            2. Definities
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="D2N"
                secondary="D2N B.V., gevestigd te [adres], ingeschreven in het handelsregister onder nummer [nummer]"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Klant"
                secondary="De natuurlijke of rechtspersoon die een overeenkomst aangaat met D2N"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Aansluiting"
                secondary="De elektriciteitsaansluiting die door D2N wordt geleverd"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Aansluitpunt"
                secondary="Het punt waar de aansluiting wordt gerealiseerd"
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="primary">
            3. Aanbieding en Aanvaarding
          </Typography>
          <Typography variant="body1" paragraph>
            Alle aanbiedingen van D2N zijn onder voorbehoud en niet bindend, tenzij uitdrukkelijk anders vermeld.
          </Typography>
          
          <Typography variant="body1" paragraph>
            Een overeenkomst komt tot stand door schriftelijke bevestiging van de opdracht door D2N.
          </Typography>
          
          <Typography variant="body1" paragraph>
            D2N behoudt zich het recht voor om opdrachten te weigeren zonder opgaaf van redenen.
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="primary">
            4. Prijzen en Betaling
          </Typography>
          <Typography variant="body1" paragraph>
            Alle prijzen zijn exclusief BTW, tenzij anders vermeld.
          </Typography>
          
          <Typography variant="body1" paragraph>
            D2N behoudt zich het recht voor om prijzen te wijzigen in geval van wijzigingen in kosten van materialen, arbeid of andere factoren die buiten de invloed van D2N liggen.
          </Typography>
          
          <Typography variant="body1" paragraph>
            Betaling dient plaats te vinden binnen 30 dagen na factuurdatum, tenzij anders overeengekomen.
          </Typography>
          
          <Typography variant="body1" paragraph>
            Bij betalingsachterstand is D2N gerechtigd om rente in rekening te brengen van 1% per maand over het openstaande bedrag.
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="primary">
            5. Levering en Installatie
          </Typography>
          <Typography variant="body1" paragraph>
            D2N streeft ernaar om leveringen en installaties uit te voeren binnen de overeengekomen termijnen, maar kan niet aansprakelijk worden gesteld voor vertragingen.
          </Typography>
          
          <Typography variant="body1" paragraph>
            De klant dient ervoor te zorgen dat de installatielocatie tijdig toegankelijk is en voldoet aan de technische eisen.
          </Typography>
          
          <Typography variant="body1" paragraph>
            D2N behoudt zich het recht voor om de levering uit te stellen in geval van overmacht of andere omstandigheden buiten haar invloed.
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="primary">
            6. Garantie en Aansprakelijkheid
          </Typography>
          <Typography variant="body1" paragraph>
            D2N biedt garantie op geleverde producten en diensten conform de geldende wet- en regelgeving.
          </Typography>
          
          <Typography variant="body1" paragraph>
            De aansprakelijkheid van D2N is beperkt tot de waarde van de overeenkomst, tenzij sprake is van opzet of grove schuld.
          </Typography>
          
          <Typography variant="body1" paragraph>
            D2N is niet aansprakelijk voor indirecte schade, gevolgschade of gemiste besparingen.
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="primary">
            7. Eigendom en Risico
          </Typography>
          <Typography variant="body1" paragraph>
            Eigendom van geleverde goederen gaat over op de klant na volledige betaling van de factuur.
          </Typography>
          
          <Typography variant="body1" paragraph>
            Het risico van geleverde goederen gaat over op de klant vanaf het moment van levering.
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="primary">
            8. Intellectueel Eigendom
          </Typography>
          <Typography variant="body1" paragraph>
            Alle intellectuele eigendomsrechten op door D2N ontwikkelde software, documentatie en andere materialen blijven eigendom van D2N.
          </Typography>
          
          <Typography variant="body1" paragraph>
            De klant verkrijgt een niet-exclusieve licentie voor het gebruik van deze materialen voor de doeleinden van de overeenkomst.
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="primary">
            9. Gegevensbescherming
          </Typography>
          <Typography variant="body1" paragraph>
            D2N handelt in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG) en andere geldende privacywetgeving.
          </Typography>
          
          <Typography variant="body1" paragraph>
            Persoonsgegevens worden uitsluitend gebruikt voor de uitvoering van de overeenkomst en worden niet langer bewaard dan noodzakelijk.
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="primary">
            10. Geschillen en Toepasselijk Recht
          </Typography>
          <Typography variant="body1" paragraph>
            Op alle overeenkomsten is Nederlands recht van toepassing.
          </Typography>
          
          <Typography variant="body1" paragraph>
            Geschillen worden in eerste instantie opgelost door onderling overleg. Indien dit niet tot een oplossing leidt, worden geschillen voorgelegd aan de bevoegde rechter.
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="primary">
            11. Wijzigingen
          </Typography>
          <Typography variant="body1" paragraph>
            D2N behoudt zich het recht voor om deze algemene voorwaarden te wijzigen. Wijzigingen treden in werking na publicatie op de website van D2N.
          </Typography>
          
          <Typography variant="body1" paragraph>
            Voor lopende overeenkomsten blijven de oorspronkelijke voorwaarden van kracht, tenzij partijen anders overeenkomen.
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="primary">
            12. Slotbepalingen
          </Typography>
          <Typography variant="body1" paragraph>
            Indien een bepaling van deze algemene voorwaarden nietig of niet afdwingbaar blijkt te zijn, blijven de overige bepalingen volledig van kracht.
          </Typography>
          
          <Typography variant="body1" paragraph>
            D2N behoudt zich het recht voor om de overeenkomst te beëindigen met inachtneming van een opzegtermijn van 30 dagen.
          </Typography>
        </CardContent>
      </Card>

      <Paper elevation={2} sx={{ p: 3, mt: 4, background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
        <Typography variant="h6" gutterBottom>
          Contactinformatie
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">
              <strong>D2N B.V.</strong><br />
              [Adres]<br />
              [Postcode] [Plaats]
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">
              <strong>Contact</strong><br />
              Telefoon: [telefoonnummer]<br />
              E-mail: [e-mailadres]
            </Typography>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.3)' }} />
        
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          Deze algemene voorwaarden zijn voor het laatst gewijzigd op: {new Date().toLocaleDateString('nl-NL')}
        </Typography>
      </Paper>
    </Box>
  );
};

export default TermsAndConditions;
