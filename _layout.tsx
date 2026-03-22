import { Stack } from 'expo-router';
import { CarrinhoProvider } from '../context/CarrinhoContext';
import { ClienteProvider } from '../context/ClienteContext';

export default function RootLayout() {
  return (
    <ClienteProvider>
      <CarrinhoProvider>
        <Stack
          screenOptions={{
            headerShown: true,
            headerTitleAlign: 'center'
          }}
        />
      </CarrinhoProvider>
    </ClienteProvider>
  );
}