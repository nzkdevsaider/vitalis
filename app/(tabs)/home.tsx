import { H2, H3, Paragraph, Text, XStack, YStack } from 'tamagui'
import { getGreeting } from 'utils/utils'
import { vitalisDB } from 'db/api'
import { useEffect, useState } from 'react'

export default function TabOneScreen() {
  const [user, setUser] = useState<Usuario | null>(null)

  const getUserData = async () => {
    const user = await vitalisDB.getUser()
    setUser(user)
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <YStack f={1} gap="$8" px="$3" pt="$5">
      <H2>
        {getGreeting()}, {user?.nombre || 'Usuario'}
      </H2>

      <XStack
        jc="center"
        flexDirection="column"
        gap="$1.5"
        backgroundColor={'$white2'}
        p="$5"
        borderRadius={'$5'}
      >
        <H3>¡Bienvenido a Vitalis!</H3>
        <Paragraph>
          Para iniciar con lo fundamental, agrega un medicamento o recordatorio.
        </Paragraph>
      </XStack>
      <XStack flexDirection="row" gap="$2">
        <XStack
          width={'50%'}
          jc="center"
          flexDirection="column"
          gap="$1.5"
          backgroundColor={'$white2'}
          p="$5"
          borderRadius={'$5'}
        >
          <Text fontWeight={'bold'}>Medicamentos registrados</Text>
          <Text fontSize={'$8'}>{vitalisDB.getMedicines().length}</Text>
        </XStack>
        <XStack
          width={'50%'}
          jc="center"
          flexDirection="column"
          gap="$1.5"
          backgroundColor={'$white2'}
          p="$5"
          borderRadius={'$5'}
        >
          <Text fontWeight={'bold'}>Recordatorios activos</Text>
          <Text fontSize={'$8'}>{vitalisDB.getReminders().length}</Text>
        </XStack>
      </XStack>
    </YStack>
  )
}
