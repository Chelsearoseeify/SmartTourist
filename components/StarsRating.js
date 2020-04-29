import React, {useState} from 'react';
import StarRating from 'react-native-star-rating';
import {View} from 'react-native';

const StarsRating = ({rating, size, fullStarColor, emptyStarColor}) => {
  const [starCount, setStarCount] = useState(rating);

  const onStarRatingPress = rating => {
    setStarCount(rating);
  };

  return (
    <View style={{marginRight: 5}}>
      <StarRating
        disabled={false}
        maxStars={5}
        rating={starCount}
        selectedStar={rating => onStarRatingPress(rating)}
        starSize={size}
        fullStarColor={fullStarColor}
        emptyStarColor={emptyStarColor}
      />
    </View>
  );
};

export default StarsRating;
