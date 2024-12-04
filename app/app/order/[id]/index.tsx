import { Stack, useLocalSearchParams, Link } from "expo-router";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Image } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

function OrderItem() {
  return (
    <TouchableOpacity
      style={{
        position: "relative",
        flexShrink: 0,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 4,
        borderColor: "#d1d5db",
        borderWidth: 1,
        overflow: "hidden",
        padding: 10,
        gap: 20,
      }}
    >
      <Image
        source={require("@/assets/images/paracetamol.png")}
        style={{
          width: 80,
          height: 80,
        }}
      />
      <View
        style={{
          flexGrow: 1,
          flexShrink: 1,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Paracetamol</Text>
        <Text style={{ marginTop: 2 }}>20mg capsules</Text>
        <Text style={{ marginTop: 4, fontWeight: "bold", color: "#1d4ed8" }}>
          Dosage info
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          width: 24,
          height: 24,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#d1d5db",
          borderRadius: 9999,
        }}
      >
        <Text style={{ color: "#1f2937", fontWeight: "bold", fontSize: 12 }}>
          2
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default function Order() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <>
      <Stack.Screen
        options={{
          title: `Order #${id}`,
        }}
      />

      <ScrollView style={{ padding: 20, paddingBottom: 90 }}>
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            flexWrap: "wrap",
            columnGap: 6,
          }}
        >
          <Text
            style={{
              fontSize: 28,
              lineHeight: 32,
              letterSpacing: -0.2,
              fontWeight: "bold",
            }}
          >
            Your prescription is
          </Text>
          <Text
            style={{
              color: "#15803d",
              fontSize: 28,
              lineHeight: 32,
              letterSpacing: -0.2,
              fontWeight: "bold",
            }}
          >
            ready to collect 🎉
          </Text>
        </View>

        <View style={{ marginTop: 10 }}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View
              style={{
                flexGrow: 0,
                flexShrink: 0,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 2,
                  backgroundColor: "#d1d5db",
                  height: 10,
                }}
              />
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: 9999,
                  width: 32,
                  height: 32,
                  alignItems: "center",
                  justifyContent: "center",
                  borderColor: "#d1d5db",
                }}
              >
                <Ionicons name={"mail-outline"} size={16} color={"#9ca3af"} />
              </View>
              <View
                style={{
                  width: 2,
                  backgroundColor: "#d1d5db",
                  flexGrow: 1,
                }}
              />
            </View>
            <View
              style={{
                flexShrink: 1,
                flexGrow: 1,
                paddingBottom: 12,
                paddingTop: 8,
              }}
            >
              <Text style={{ color: "#6b7280", fontSize: 12 }}>
                01/12, 13:32
              </Text>
              <Text>We received your order</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View
              style={{
                flexGrow: 0,
                flexShrink: 0,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 2,
                  backgroundColor: "#d1d5db",
                  height: 10,
                }}
              />
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: 9999,
                  width: 32,
                  height: 32,
                  alignItems: "center",
                  justifyContent: "center",
                  borderColor: "#d1d5db",
                }}
              >
                <Ionicons name={"cube-outline"} size={16} color={"#9ca3af"} />
              </View>
              <View
                style={{
                  width: 2,
                  backgroundColor: "#d1d5db",
                  flexGrow: 1,
                }}
              />
            </View>
            <View
              style={{
                flexShrink: 1,
                flexGrow: 1,
                paddingBottom: 12,
                paddingTop: 8,
              }}
            >
              <Text style={{ color: "#6b7280", fontSize: 12 }}>
                02/12, 11:13
              </Text>
              <Text>We're packing your order</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View
              style={{
                flexGrow: 0,
                flexShrink: 0,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 2,
                  backgroundColor: "#d1d5db",
                  height: 10,
                }}
              />
              <View
                style={{
                  borderRadius: 9999,
                  width: 32,
                  height: 32,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#15803d",
                }}
              >
                <Ionicons name={"bag-outline"} size={16} color={"#ffffff"} />
              </View>
              <View
                style={{
                  width: 2,
                  backgroundColor: "#d1d5db",
                  flexGrow: 1,
                }}
              />
            </View>
            <View
              style={{
                flexShrink: 1,
                flexGrow: 1,
                paddingBottom: 12,
                paddingTop: 8,
              }}
            >
              <Text style={{ color: "#6b7280", fontSize: 12 }}>
                04/12, 11:01
              </Text>
              <Text style={{ color: "#15803d", fontWeight: "bold" }}>
                Everything's ready
              </Text>
            </View>
          </View>
        </View>

        <Text style={{ marginTop: 20, fontSize: 24, fontWeight: "bold" }}>
          Your pharmacy
        </Text>
        <TouchableOpacity
          style={{
            marginTop: 10,
            backgroundColor: "white",
            borderRadius: 4,
            borderColor: "#d1d5db",
            borderWidth: 1,
            padding: 16,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Cohens Chemist
          </Text>
          <Text numberOfLines={1} style={{ marginTop: 2 }}>
            4 Privet Drive, Little Whinging, Surrey, GU1 3SX
          </Text>
          <View
            style={{
              marginTop: 4,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontWeight: "bold", color: "#1d4ed8" }}>
              More info
            </Text>
            <Text style={{ fontSize: 12, color: "#6b7280" }}>
              open today until 6pm
            </Text>
          </View>
        </TouchableOpacity>

        <Text style={{ marginTop: 20, fontSize: 24, fontWeight: "bold" }}>
          Order details
        </Text>
        <View
          style={{
            marginTop: 10,
            gap: 10,
          }}
        >
          <OrderItem />
          <OrderItem />
          <OrderItem />
          <OrderItem />
        </View>
      </ScrollView>

      <LinearGradient
        colors={["#f1f1f1", "#f1f1f1", "transparent"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: 90,
          pointerEvents: "none",
        }}
      />
      <Link
        href={{
          pathname: "/order/[id]/collect",
          params: { id },
        }}
        asChild
      >
        <TouchableOpacity
          style={{
            position: "fixed",
            bottom: 20,
            left: 20,
            right: 20,
            height: 50,
            backgroundColor: "#1d4ed8",
            borderRadius: 9999,
            elevation: 2,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              textAlign: "center",
              lineHeight: 50,
            }}
          >
            Collect order
          </Text>
        </TouchableOpacity>
      </Link>
    </>
  );
}
