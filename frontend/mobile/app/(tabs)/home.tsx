import { View, Text, ScrollView } from 'react-native';

export default function HomeScreen() {
  // Dados mockados para apresentação
  const mockDocs = [
    { id: 1, title: 'OS - Guindaste 70t', status: 'Pendente', date: '30/03/2026' },
    { id: 2, title: 'Manutenção Preventiva', status: 'Concluído', date: '28/03/2026' },
    { id: 3, title: 'Relatório de Frota', status: 'Em Análise', date: '25/03/2026' },
  ];

  return (
    <ScrollView className="flex-1 bg-white p-6">
      <Text className="text-2xl font-black text-black uppercase mb-6 tracking-tight">
        Últimos Registros
      </Text>

      {mockDocs.map((doc) => (
        <View
          key={doc.id}
          className="flex-col border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_#000000] overflow-hidden mb-5 bg-[#f8f8f8]"
        >
          {/* Cabeçalho do Card */}
          <View className="bg-[#08233e] border-b-[3px] border-black px-4 py-2 flex-row justify-between items-center">
            <Text className="text-xs font-black tracking-widest text-white uppercase">
              {doc.date}
            </Text>
          </View>

          {/* Corpo do Card */}
          <View className="p-5 bg-white">
            <Text className="text-xl font-black text-black mb-4">
              {doc.title}
            </Text>
            
            <View className="self-start">
              <Text className="text-xs font-black text-black bg-[#ffd100] border-[2px] border-black px-3 py-1 rounded-md uppercase tracking-wide">
                {doc.status}
              </Text>
            </View>
          </View>
        </View>
      ))}
      
      {/* Espaço extra no final do scroll para não grudar na navbar */}
      <View className="h-10" />
    </ScrollView>
  );
}