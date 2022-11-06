import { Box } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import { AppRoutes } from './apps.routes'
import { SignIn } from '../screens/sign-in'
import { useAuth } from '../hooks/useAuth'

export const Routes = () => {
    const {user} = useAuth()

    return(
        <Box flex={1} bg="gray.900">
            <NavigationContainer>
                {user.sub  ? <AppRoutes/> : <SignIn/>}
            </NavigationContainer>
        </Box>
    )
}