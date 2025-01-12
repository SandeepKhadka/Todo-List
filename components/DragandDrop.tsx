import React, { useRef, useState } from "react";
import { View, StyleSheet, PanResponder, Animated, Text } from "react-native";

interface DragAndDropCardProps {
  container: React.ReactNode; 
}

const DragAndDropCard: React.FC<DragAndDropCardProps> = ({ container }) => {
  const position = useRef(new Animated.ValueXY()).current;

  const [dragging, setDragging] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setDragging(true);
      },
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: position.x,
            dy: position.y,
          },
        ],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        setDragging(false);
      },
    })
  ).current;

  return (
    <Animated.View
      style={[
        {
          transform: position.getTranslateTransform(),
          opacity: dragging ? 0.8 : 1,
        },
      ]}
      {...panResponder.panHandlers}
    >
      <Text>{title}</Text>
    </Animated.View>
  );
};

export default DragAndDropCard;
