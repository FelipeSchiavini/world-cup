import { VStack, Text, Heading, useToast } from "native-base"
import React, { useState } from "react"
import { Header } from "../components/header"
import Logo from '../assets/logo.svg'
import { Input } from "../components/input"
import { Button } from "../components/button"
import { api } from "../services/api"

export const New = () => {
    const [title, setTitle] =  useState<string>("")
    const [isLoading, setInLoading] = useState<boolean>(false)
    const toast = useToast()
    const handlePoolCreate = async () => { 
        if(!title.trim()){
            return toast.show({
                title: 'Informe um nome para o seu bolão',
                placement: "top",
                bgColor: 'red.500'
            })
        }
        setInLoading(true);
        
        try{
            await api.post('/pools', {title: title.toUpperCase() } )

            toast.show({
                title: 'Bolão criado com sucesso!',
                placement: "top",
                bgColor: 'green.500'
            })
        
            setTitle("")
        } catch(error){
            console.log(error)

            toast.show({
                title: 'Não foi possivel criar o bolão. Verifique a sua conexão com a internet.',
                placement: "top",
                bgColor: 'red.500'
            })

        }finally{
            setInLoading(false);
        }

    }

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="Criar novo Bolão"/>
            <VStack mt={8} mx={5} alignItems="center">
                <Logo/>
                <Heading fontFamily="heading" color="white" fontSize="lg" my={8} textAlign="center">
                    Crie seu próprio bolão da copa {'\n'}
                    e compartilhe entre amigos!
                </Heading>
            <Input placeholder="Qual nome do seu bolão" onChangeText={setTitle} value={title} mb={2}/>

            <Button isLoading={isLoading} title="CRIAR MEU BOLÃO" mt={2} onPress={handlePoolCreate}/>

            <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas.</Text>
            </VStack>
        </VStack>
    )
}