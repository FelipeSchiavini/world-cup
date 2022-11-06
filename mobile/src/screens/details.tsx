import { HStack, useToast, VStack } from "native-base"
import { Header } from "../components/header";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Loading } from "../components/loading";
import { api } from "../services/api";
import { PoolCardProps } from "../components/pool-card";
import { PoolHeader } from "../components/pool-header";
import { EmptyMyPoolList } from "../components/empty-my-pool-list";
import { Option } from '../components/option'
import { Share } from "react-native";
import { Guesses } from "../components/guesses";

interface RouteParams {
    id: string
}

export const Details: React.FunctionComponent = () => {
    const route= useRoute()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [optionSelected, setOptionSelected] = useState<'guesses' | 'ranking'>('guesses')
    const [poolDetails, setPoolDetails] = useState<PoolCardProps>({} as PoolCardProps)
    const { id } = route.params as RouteParams
    const toast = useToast()

    const fetchPoolDetails = async () => {
        try {
            setIsLoading(true)
            const response = await api.get(`/pools/${id}`)
            setPoolDetails(response.data.pool)

        } catch(error) {
            console.log(error)
            toast.show({
                title: 'Não foi possível carregar os bolões',
                placement: 'top',
                bgColor: 'red.500'
            })

        } finally {
            setIsLoading(false)
        }
    }

    const handleCodeShare = async () => {
        await Share.share({
            message: poolDetails.code
        })
    }

    useEffect(()=> {
        fetchPoolDetails()
    },[id])

    if(isLoading) return <Loading/>

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title={poolDetails.title} showBackButton showShareButton onShare={handleCodeShare}/>
            {
                poolDetails._count?.participants > 0 ? 
                    <VStack px={5} flex={1}>
                        <PoolHeader data={poolDetails}/>
                    <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
                        <Option title="Seus palpites" isSelected={optionSelected === 'guesses'} onPress={()=>setOptionSelected('guesses')}/>
                        <Option title="Ranking do Grupos" isSelected={optionSelected === 'ranking'} onPress={()=>setOptionSelected('ranking')}/>
                    </HStack>
                    <Guesses poolId = {poolDetails.id} code={poolDetails.code}/>
                    </VStack> :
                    <EmptyMyPoolList  code={poolDetails.code}/>
                        
            }
        </VStack>
    );  
}