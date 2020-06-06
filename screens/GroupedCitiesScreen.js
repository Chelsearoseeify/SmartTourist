import React, {useEffect, useState} from 'react';
import Colors from '../constants/Colors';
import {View, StyleSheet, SafeAreaView, FlatList, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import BackButton from '../components/Buttons/BackButton';
import {useSelector, useDispatch} from 'react-redux';
import Style from '../constants/Style';
import {fetchTopDestinations} from '../store/actions/cities';
import BigListCard from './../components/Cards/ListCardCityBig';

const GroupedCitiesScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const topDestinations = useSelector(state => state.cities.top_destinations);

  useEffect(() => {
    const loadTopDestinations = async () => {
      try {
        dispatch(fetchTopDestinations());
      } catch (error) {
        setError(error.message); //error to be handled, it has to be defined
      }
    };
    loadTopDestinations();
  }, [dispatch, fetchTopDestinations]);

  const onCitySelected = city => {
    console.log(`Selected city ${city.name}`);
  };

  const renderGridItem = itemData => {
    return (
      <View style={{flex: 1, padding: 1}}>
        <BigListCard
          name={itemData.item.name}
          imageId={itemData.item.imageUrl}
          onPress={() => onCitySelected(city)}
          style={{width: '100%'}}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton {...navigation} />
      <View
        style={{
          height: 100,
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
        }}>
        <Text
          style={{
            color: Colors.blueTitleColor,
            fontWeight: 'bold',
            fontSize: Style.fontSize.h2,
            marginRight: Style.marginTopCardContainer,
            marginBottom: Style.marginTopCardContainer,
          }}>
          {route.params.title}
        </Text>
      </View>

      <View style={styles.cardViewStyle}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cardStyle}>
            <View style={styles.contentStyle}>
              <FlatList
                contentContainerStyle={styles.placesContainer}
                data={topDestinations}
                numColumns={2}
                renderItem={renderGridItem}
                horizontal={false}
                scrollEnabled={false}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const topSpace = 100;

let styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
    flex: 1,
  },
  cardViewStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  contentStyle: {
    padding: Style.paddingCard,
  },
  cardStyle: {
    marginTop: topSpace,
    padding: Style.paddingCardContainer,
    elevation: Style.elevation,
    borderTopLeftRadius: Style.borderRadiusCardContainer,
    borderTopRightRadius: Style.borderRadiusCardContainer,
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  titleViewStyle: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '100%',
    height: topSpace,
    flex: 1,
    position: 'absolute',
  },
  imageBackgroundStyle: {
    width: '100%',
    height: '100%',
  },
});

export default GroupedCitiesScreen;
