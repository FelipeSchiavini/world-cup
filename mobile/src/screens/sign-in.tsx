import { Center, Icon, Text } from 'native-base'
import { Button } from '../components/button'
import Logo from '../assets/logo.svg'
import { Fontisto } from '@expo/vector-icons'
import { useAuth } from '../hooks/useAuth'

export const SignIn: React.FC = (): JSX.Element => {
    const { signIn, isUserLoading } = useAuth()

    return(
        <Center flex={1} bgColor="gray.900" p={7}>
            <Logo height={40} width={212}/>
            
            <Button 
                title="Entrar com Google"
                isLoading={isUserLoading}
                _loading={{
                    _spinner: {color: 'white'}
                }}
                onPress={signIn}
                type="SECONDARY"
                marginTop={12}
                leftIcon={<Icon as={Fontisto} name='google' color="#fff" size='md' />} />

            <Text color="white" textAlign="center" marginTop={4}>Não utilizamos nenhuma informação além {'\n'} do e-mail para criação de sua conta</Text>
        </Center>
    )
}