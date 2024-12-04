import CircularProgress from "@/components/CircularProgress";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";

export default function Collect() {
  const [connected, setConnected] = useState(false);
  const [isLocked, setIsLocked] = useState(true);

  const [progress, setProgress] = useState(0);

  const interval = useRef<number | null>(null);

  const onPressIn = useCallback(() => {
    if (!isLocked) return;
    interval.current = setInterval(() => {
      if (progress >= 100) {
        if (interval.current) clearInterval(interval.current);
      } else {
        setProgress((prev) => Math.min(prev + 3, 100));
      }
    }, 1) as unknown as number;
  }, [isLocked]);
  const onPressOut = useCallback(() => {
    if (interval.current) clearInterval(interval.current);
    if (progress >= 100) {
      setIsLocked(false);
    }
    setProgress(0);
  }, [progress]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setConnected(true);
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        padding: 40,
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {connected ? (
          <>
            <Text
              style={{
                color: "#6b7280",
                fontSize: 20,
              }}
            >
              Locker no.
            </Text>
            <Text
              style={{
                fontSize: 48,
                lineHeight: 48,
                marginTop: 8,
                fontWeight: "bold",
                letterSpacing: -1,
              }}
            >
              12
            </Text>
          </>
        ) : (
          <>
            <Ionicons name="bluetooth-outline" size={16} color="#6b7280" />
            <Text
              style={{
                color: "#6b7280",
                marginTop: 5,
              }}
            >
              Connecting to locker...
            </Text>
          </>
        )}
      </View>
      <View
        style={{
          marginTop: 40,
          marginInline: "auto",
          height: 200,
          width: 200,
          borderWidth: 5,
          borderColor: "#e5e7eb",
          borderRadius: 9999,
          padding: 20,
          transform: isLocked && progress > 0 ? [{ scale: 1.1 }] : [],
        }}
      >
        <View
          style={{
            position: "relative",
            height: "100%",
            width: "100%",
            borderWidth: 5,
            borderColor: "#d1d5db",
            borderRadius: 9999,
            padding: 20,
          }}
        >
          <CircularProgress
            size={150}
            strokeWidth={5}
            progress={progress}
            color="#4b5563"
            style={{
              position: "absolute",
              top: -5,
              left: -5,
            }}
          />
          <Pressable
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onPress={() => !isLocked && setIsLocked(true)}
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: !isLocked
                ? "#16a34a"
                : progress > 0
                ? "#4b5563"
                : "#1f2937",
              borderRadius: 9999,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {connected ? (
              <Ionicons
                name={isLocked ? "lock-closed" : "lock-open"}
                size={32}
                color="#ffffff"
              />
            ) : (
              <ActivityIndicator color="#ffffff" />
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
}
