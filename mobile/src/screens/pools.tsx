import { Octicons } from '@expo/vector-icons';
import { StackActions, useFocusEffect, useNavigation } from '@react-navigation/native';
import { FlatList, Icon, useToast, VStack } from 'native-base';
import React, { useCallback, useState } from 'react';

import { Button } from '../components/button';
import { EmptyPoolList } from '../components/empty-pool-list';
import { Header } from '../components/header';
import { Loading } from '../components/loading';
import { PoolCard, PoolCardProps } from '../components/pool-card';
import { api } from '../services/api';

export const Pools = () => {
    const navigation = useNavigation();
    const toast = useToast()
    const [pools, setPools] = useState<PoolCardProps[]>([])
    const [isLoading, setIsLoading] = useState<Boolean>(true)
    const fetchPools = async () => {
        try{
            setIsLoading(true)
            const response = await api.get('/pools');
            console.log(response.data.pool)
            setPools(response.data.pool)
        }
        catch(error){
            console.log(error)
            toast.show({
                title: 'Não foi possível carregar os bolões',
                placement: 'top',
                bgColor: 'red.500'
            })
        }finally{
            setIsLoading(false)
        }
    } 
    
    useFocusEffect( useCallback (()=>{
        fetchPools();
    }, []))

    const onNavigationPress = () => {
       // navigation.navigate('find')
        const pushAction = StackActions.push('find',{});
        navigation.dispatch(pushAction)
    }
    
    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="Meus bolões"/>

            <VStack mt={6} mx={5} borderBottomWidth={1} borderBottomColor="gray.600" pb={4} mb={4}>
            <Button title="BUSCAR BOLÃO POR CÓDIGO" leftIcon={<Icon as={Octicons} name="search" color="black" size="md" onPress={()=>navigation.navigate('pools')}/>} />
            </VStack>
            {isLoading ? <Loading/> :
            <FlatList
                px={5}
                showsVerticalScrollIndicator={false}
                _contentContainerStyle={{pb:10}}
                data={pools}
                keyExtractor={item=>item.id}
                renderItem={({item})=>{
                return <PoolCard data={item} onPress={()=>navigation.navigate('details', {id: item.id})}/>
                }}
                ListEmptyComponent={()=><EmptyPoolList/>}     
            />
            }
            
        </VStack>
    )
}