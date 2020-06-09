import React from 'react';
import {FlatList, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import CustomLabelButton from './Buttons/CustomLabelButton';
import {setPlaceType, setSearchType} from '../store/actions/places';
import Colors from '../constants/Colors';
import SearchType from '../constants/SearchType';

const LabelButtonsList = () => {
  const dispatch = useDispatch();
  const types = useSelector(state => state.places.all_types);
  const selectedType = useSelector(state => state.places.type);

  /* console.log(
    selectedType === '' ? 'no type' : selectedType,
    currentSearchType,
  ); */
  const toggleType = newType => {
    let newSelectedType = '';
    if (selectedType !== newType.type) newSelectedType = newType.type;

    if (newSelectedType === '') dispatch(setSearchType(SearchType.TEXT));
    else {
      dispatch(setSearchType(SearchType.NEARBY));
    }
    dispatch(setPlaceType(newSelectedType));
  };

  const renderTypeItem = type => {
    let buttonStyle = {
      buttonColor: 'white',
      textColor: Colors.greenTitleColor,
    };
    if (type.type === selectedType) {
      buttonStyle.buttonColor = Colors.greenTitleColor;
      buttonStyle.textColor = 'white';
    }
    return (
      <CustomLabelButton
        name={type.name}
        toggleType={() => toggleType(type)}
        buttonStyle={buttonStyle}
      />
    );
  };

  return (
    <View style={{flex: 1, paddingLeft: 10}}>
      <FlatList
        data={types}
        renderItem={({item, index}) => renderTypeItem(item, index)}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default LabelButtonsList;
