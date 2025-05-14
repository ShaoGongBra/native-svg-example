/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useRef } from 'react';
import {
  View,
  Animated,
  PanResponder,
} from 'react-native';

import { Svg, Rect } from 'react-native-svg';

const RectAnimated = Animated.createAnimatedComponent(Rect);

function App() {
  const movePan = useRef(new Animated.ValueXY({
    x: 100,
    y: 100,
  }, { useNativeDriver: true })).current;

  const moveEvent = useRef(PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      movePan.setOffset({
        x: movePan.x._value,
        y: movePan.y._value,
      });
    },
    onPanResponderMove: (e, gestureState) => {
      movePan.setValue({ x: gestureState.dx, y: gestureState.dy });
    },
    onPanResponderRelease: () => {
      movePan.flattenOffset();
    },
  })).current;

  return (
    <View>
      <View style={{ margin: 24, marginTop: 100, backgroundColor: '#fff' }}>
        <Svg width="100%" height={300}>
          <Rect
            width={100}
            height={100}
            fill="#666"
            transform={[
              { translateX: 100 },
              { translateY: 100 },
              { translateX: 50 },
              { translateY: 50 },
              { rotate: '45deg' },
              { translateX: -50 },
              { translateY: -50 },
            ]}
          />
          <RectAnimated
            {...moveEvent.panHandlers}
            width={100}
            height={100}
            fill="red"
            transform={[
              { translateX: movePan.x },
              { translateY: movePan.y },
              { translateX: 50 },
              { translateY: 50 },
              { rotate: '45deg' },
              { translateX: -50 },
              { translateY: -50 },
            ]}
          />
        </Svg>
      </View>
    </View>
  );
}

export default App;
