import { useNavigation, useNavigationState } from "@react-navigation/native"
import { Heading, useToast, VStack } from "native-base"
import React, { useState } from "react"
import { Button } from "../components/button"
import { Header } from "../components/header"
import { Input } from "../components/input"
import { api } from "../services/api"

export const Find = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [code, setCode] = useState<string>('')
    const toast = useToast()
    const navigation = useNavigation();

    const handleJoinPool = async() => {
        try{
            if(!code) {
                return toast.show({
                    title: 'Informe o código',
                    placement: 'top',
                    bgColor: 'red.500'
                }) 
            }

            await api.post('/pool/join', {code})

            toast.show({
                title: 'Você entrou no bolão com sucesso',
                placement: 'top',
                bgColor: 'green.500'
            }) 

            navigation.navigate('pools')
            setIsLoading(true)

        } catch(error){
            setIsLoading(false)
            console.log(error);

            if(error.response?.data?.message === 'pool not found.'){
                return toast.show({
                    title: 'Bolão não encontrado',
                    placement: 'top',
                    bgColor: 'red.500'
                })

            } 
            if (error.response?.data?.message === 'You already joined this pool..'){
                return toast.show({
                    title: 'você já participa deste bolão',
                    placement: 'top',
                    bgColor: 'red.500'
                })
            }

            toast.show({
                title: 'Não foi possível encontrar o bolão',
                placement: 'top',
                bgColor: 'red.500'
            })
        }
    }
    
    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="Buscar por código" showBackButton/>
            <VStack mt={8} mx={5} alignItems="center">
                <Heading fontFamily="heading" color="white" fontSize="lg" mb={8} textAlign="center">
                    Encontrar o bolão através de {'\n'}
                    seu código único
                </Heading>
            <Input placeholder="Qual código do bolão" mb={2} autoCapitalize="characters" onChangeText={setCode} value={code}/>

            <Button title="BUSCAR BOLÃO" mt={2} isLoading={isLoading} onPress={handleJoinPool}/>
            </VStack>
        </VStack>
    )
}