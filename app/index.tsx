import { X } from '@tamagui/lucide-icons'
import { vitalisDB } from 'db/api'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import {
  View,
  Button,
  Input,
  H5,
  H1,
  Dialog,
  XStack,
  Unspaced,
  Fieldset,
  H6,
  Text,
} from 'tamagui'
import { getGreeting } from 'utils/utils'

const index = () => {
  const [isNew, setIsNew] = useState(false)
  const [name, setName] = useState('')
  const [age, setAge] = useState(0)
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')

  const [user, setUser] = useState<Usuario | null>(null)

  const checkIfNewUser = async () => {
    const check = await vitalisDB.checkIfNewUser()
    const user = await vitalisDB.getUser()

    setUser(user)
    setIsNew(check)
  }

  useEffect(() => {
    checkIfNewUser()
  }, [])

  const handleSubmit = async () => {
    if (!name || !age || !pin) return setError('Por favor, llena todos los campos.')
    if (pin.length !== 4) return setError('El PIN debe tener 4 dígitos.')
    try {
      await vitalisDB.createUser(name, age, pin)
      router.navigate('/home')
    } catch (error) {
      console.error(error)
    }
  }

  const handleValidate = async () => {
    if (!pin) return setError('Por favor, ingresa tu PIN.')
    try {
      const check = await vitalisDB.checkPin(pin)
      if (check) router.navigate('/home')
      else setError('PIN incorrecto.')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View flex={1} margin="$4" justifyContent="center">
      <H1
        enterStyle={{
          scale: 1.1,
          y: -10,
          opacity: 0,
        }}
        animation="bouncy"
      >
        ¡Bienvenido a Vitalis!
      </H1>
      {isNew ? (
        <Dialog modal>
          <H5 mt="$4">Parece que eres nuevo por aquí.</H5>
          <Dialog.Trigger asChild>
            <Button mt="$4" bg="$blue6Light" color="$purple12">
              Comenzar
            </Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Content>
              <Dialog.Title>Crear usuario</Dialog.Title>
              <Dialog.Description>
                Para comenzar, necesitamos algunos datos.
              </Dialog.Description>
              {error && <H6 color="$red10">{error}</H6>}
              <Fieldset gap="$4">
                <Input
                  placeholder="Nombre"
                  onChangeText={(text) => setName(text)}
                  value={name}
                />
                <Input
                  placeholder="Edad"
                  keyboardType="numeric"
                  onChangeText={(text) => setAge(parseInt(text))}
                />
                <Input
                  placeholder="PIN"
                  keyboardType="numeric"
                  onChangeText={(text) => setPin(text)}
                />
              </Fieldset>
              <XStack alignSelf="flex-end" gap="$4">
                <Button theme="active" aria-label="Close" onPress={handleSubmit}>
                  Crear
                </Button>
              </XStack>
              <Unspaced>
                <Dialog.Close asChild>
                  <Button
                    position="absolute"
                    top="$3"
                    right="$3"
                    size="$2"
                    circular
                    icon={X}
                  />
                </Dialog.Close>
              </Unspaced>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog>
      ) : (
        <>
          <H5 mt="$4">
            {getGreeting()}, {user?.nombre || 'Usuario'}
          </H5>
          {error && <H6 color="$red10">{error}</H6>}
          <Input
            mt="$4"
            placeholder="Ingresa tu PIN"
            keyboardType="numeric"
            onChangeText={(text) => setPin(text)}
          />
          <Button mt="$4" bg="$blue6Light" color="$purple12" onPress={handleValidate}>
            Validar
          </Button>
        </>
      )}
    </View>
  )
}

export default index
