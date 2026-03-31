import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function AuthScreen() {
  const handleLogin = () => {
    // Navega direto para a Home dentro das tabs
    router.replace("/(tabs)");
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#ffd100] px-6">
      <View className="bg-white border-[3px] border-black p-8 rounded-2xl shadow-[6px_6px_0px_0px_#000000] w-full items-center">
        <Text className="text-4xl font-black text-black uppercase tracking-tighter">
          Guindastes
        </Text>
        <Text className="text-xl font-bold text-[#08233e] uppercase mb-10">
          Ribas
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleLogin}
          className="bg-[#FF3B3B] border-[3px] border-black py-4 px-8 rounded-xl shadow-[4px_4px_0px_0px_#000000] w-full"
        >
          <Text className="text-white text-center text-lg font-black uppercase tracking-widest">
            Acessar Sistema
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
