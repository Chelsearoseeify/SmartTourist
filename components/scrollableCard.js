import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Style from '../constants/Style';

const AddTripScreen = props => {
  return (
    <View style={styles.container}>
      <View style={[styles.redView, {backgroundColor: 'crimson'}]}>
        <Text style={{color: 'white', fontSize: Style.fontSize.h2}}>
          Chelsearoseeify
        </Text>
      </View>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          bounces={false}>
          <View
            style={{
              backgroundColor: 'darkgreen',
              height: 80,
              width: 80,
              position: 'absolute',
              borderRadius: 40,
              top: 60,
              left: 50,
              zIndex: 1,
            }}
          />
          <View
            style={{
              backgroundColor: 'midnightblue',
              borderRadius: 20,
              marginTop: 100,
            }}>
            <View style={{margin: 20}}>
              <Text style={{color: 'white', fontSize: Style.fontSize.h5}}>
                Lorem Ipsum è un testo segnaposto utilizzato nel settore della
                tipografia e della stampa. Lorem Ipsum è considerato il testo
                segnaposto standard sin dal sedicesimo secolo, quando un anonimo
                tipografo prese una cassetta di caratteri e li assemblò per
                preparare un testo campione. È sopravvissuto non solo a più di
                cinque secoli, ma anche al passaggio alla videoimpaginazione,
                pervenendoci sostanzialmente inalterato. Fu reso popolare, negli
                anni ’60, con la diffusione dei fogli di caratteri trasferibili
                “Letraset”, che contenevano passaggi del Lorem Ipsum, e più
                recentemente da software di impaginazione come Aldus PageMaker,
                che includeva versioni del Lorem Ipsum. Perchè lo utilizziamo? È
                universalmente riconosciuto che un lettore che osserva il layout
                di una pagina viene distratto dal contenuto testuale se questo è
                leggibile. Lo scopo dell’utilizzo del Lorem Ipsum è che offre
                una normale distribuzione delle lettere (al contrario di quanto
                avviene se si utilizzano brevi frasi ripetute, ad esempio “testo
                qui”), apparendo come un normale blocco di testo leggibile.
                Molti software di impaginazione e di web design utilizzano Lorem
                Ipsum come testo modello. Molte versioni del testo sono state
                prodotte negli anni, a volte casualmente, a volte di proposito
                (ad esempio inserendo passaggi ironici). Da dove viene? Al
                contrario di quanto si pensi, Lorem Ipsum non è semplicemente
                una sequenza casuale di caratteri. Risale ad un classico della
                letteratura latina del 45 AC, cosa che lo rende vecchio di 2000
                anni. Richard McClintock, professore di latino al Hampden-Sydney
                College in Virginia, ha ricercato una delle più oscure parole
                latine, consectetur, da un passaggio del Lorem Ipsum e ha
                scoperto tra i vari testi in cui è citata, la fonte da cui è
                tratto il testo, le sezioni 1.10.32 and 1.10.33 del "de Finibus
                Bonorum et Malorum" di Cicerone. Questo testo è un trattato su
                teorie di etica, molto popolare nel Rinascimento. La prima riga
                del Lorem Ipsum, "Lorem ipsum dolor sit amet..", è tratta da un
                passaggio della sezione 1.10.32.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {},
  container: {
    backgroundColor: 'linen',
    flex: 1,
    flexDirection: 'row',
  },
  blueView: {
    height: '100%',
    width: '100%',
  },
  redView: {height: 200, width: '100%', flex: 1, position: 'absolute'},
  icon: {
    height: 70,
    width: 70,
    borderRadius: 35,
    position: 'absolute',
    left: 30,
    top: -30,
  },
});

export default AddTripScreen;
