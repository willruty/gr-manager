import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type FeatureCardProps = {
  icon: React.ComponentProps<typeof FontAwesome>['name'];
  title: string;
  description: string;
  disabled?: boolean;
};

function FeatureCard({ icon, title, description, disabled }: FeatureCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={disabled ? 1 : 0.8}
      className="flex-row items-center border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_#000000] mb-4 bg-white overflow-hidden"
    >
      {/* Ícone lateral */}
      <View className="bg-[#08233e] w-16 h-full items-center justify-center py-5">
        <FontAwesome name={icon} size={26} color="#ffd100" />
      </View>

      {/* Conteúdo */}
      <View className="flex-1 px-4 py-4">
        <Text className="text-base font-black text-black uppercase tracking-tight mb-1">
          {title}
        </Text>
        <Text className="text-xs font-bold text-[#666] leading-4">
          {description}
        </Text>
      </View>

      {/* Seta */}
      <View className="pr-4">
        <FontAwesome name="chevron-right" size={14} color="#000" />
      </View>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-[#f8f8f8]">
      {/* Banner de boas-vindas */}
      <View className="bg-[#08233e] px-6 pt-8 pb-10 border-b-[3px] border-black">
        <Text className="text-xs font-black text-[#ffd100] uppercase tracking-widest mb-1">
          Bem-vindo
        </Text>
        <Text className="text-3xl font-black text-white uppercase leading-9">
          O que{'\n'}deseja fazer?
        </Text>
      </View>

      {/* Cards de funcionalidades */}
      <View className="px-5 pt-6 pb-4">

        <FeatureCard
          icon="qrcode"
          title="Escanear Equipamento"
          description="Leia o QR Code de um equipamento para acessar informações e registros."
        />

        <FeatureCard
          icon="id-card"
          title="Documentos Pessoais"
          description="Busque e baixe seus documentos pessoais."
        />

        <FeatureCard
          icon="file-text"
          title="Documentos de Equipamento"
          description="Busque e baixe manuais, laudos e relatórios de equipamentos."
        />

      </View>

      <View className="h-6" />
    </ScrollView>
  );
}
