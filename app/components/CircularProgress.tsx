import { useMemo } from "react";
import { View, type ViewStyle } from "react-native";
import Svg, { Circle } from "react-native-svg";

interface CircularProgressProps {
  size: number;
  strokeWidth: number;
  progress: number;
  color: string;
  style?: ViewStyle;
}

export default function CircularProgress({
  size,
  strokeWidth,
  progress,
  color,
  style = {},
}: CircularProgressProps) {
  const circumference = useMemo(() => 2 * Math.PI * (size / 2), [size]);

  const strokeDashoffset = circumference * (1 - progress / 100);

  return (
    <View
      style={{
        width: size,
        height: size,
        transform: [{ rotate: "-90deg" }],
        ...style,
      }}
    >
      <Svg width={size} height={size}>
        <Circle
          stroke={color}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - strokeWidth / 2}
        />
      </Svg>
    </View>
  );
}
