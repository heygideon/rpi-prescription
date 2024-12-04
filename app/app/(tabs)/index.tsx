import { Link } from "expo-router";
import { Text, View, TouchableOpacity } from "react-native";

export default function Home() {
  return (
    <>
      <View
        style={{
          padding: 20,
          backgroundColor: "white",
          elevation: 5,
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
          }}
        >
          Welcome, Gideon!
        </Text>
      </View>
      <View
        style={{
          padding: 20,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          Your orders
        </Text>
        <Link href="/order/47859" asChild>
          <TouchableOpacity
            style={{
              marginTop: 10,
              padding: 15,
              backgroundColor: "white",
              // borderWidth: 1,
              // borderColor: "#d1d5db",
              borderRadius: 4,
              elevation: 1,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              #47859
            </Text>
            <Text
              style={{
                marginTop: 2,
              }}
              numberOfLines={1}
            >
              Paracetamol 20mg capsules + 3
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 6,
              }}
            >
              <Text
                style={{
                  backgroundColor: "#bbf7d0",
                  color: "#166534",
                  paddingBlock: 4,
                  paddingInline: 6,
                  borderRadius: 4,
                  fontSize: 12,
                  fontWeight: "bold",
                }}
              >
                Ready to collect
              </Text>
              <Text
                style={{
                  color: "#6b7280",
                  fontSize: 12,
                }}
              >
                expires in 3 days
              </Text>
            </View>
          </TouchableOpacity>
        </Link>
      </View>
    </>
  );
}
