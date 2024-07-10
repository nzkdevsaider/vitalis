import { Link, Tabs } from 'expo-router'
import { Button, useTheme } from 'tamagui'
import { AreaChart, Home, NotepadText, User } from '@tamagui/lucide-icons'

export default function TabLayout() {
  const theme = useTheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.red10.val,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <Home color={color} />,
        }}
      />
      <Tabs.Screen
        name="registro"
        options={{
          title: 'Registrar',
          tabBarIcon: ({ color }) => <NotepadText color={color} />,
        }}
      />
      <Tabs.Screen
        name="informe"
        options={{
          title: 'Informe',
          tabBarIcon: ({ color }) => <AreaChart color={color} />,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <User color={color} />,
        }}
      />
    </Tabs>
  )
}
