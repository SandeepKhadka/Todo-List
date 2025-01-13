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
            dx: new Animated.Value(0), // Keep dx fixed at 0 (no horizontal movement)
            dy: position.y, // Allow movement only in y-axis
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
          transform: [{ translateX: 0 }, { translateY: position.y }], // Restrict movement to the Y-axis
          opacity: dragging ? 0.8 : 1,
        },
      ]}
      {...panResponder.panHandlers}
    >
      {container}
    </Animated.View>
  );
};

export default DragAndDropCard;
