import { useEffect, useState } from 'react';
import { Box, FlatList, useToast } from 'native-base';
import { api } from '../services/api';
import { Game, GameProps } from '../components/game'
import { Loading } from './loading';
import { EmptyPoolList } from './empty-pool-list';
import { EmptyMyPoolList } from './empty-my-pool-list';


interface GuessesProps {
  poolId: string;
  code: string;
}


export function Guesses({ poolId, code }: GuessesProps) {
  const [isLoading, setIsLoading] = useState<Boolean>(true)
  const [games, setGames] = useState<GameProps[]>([])
  const [firstTeamPoints, setFirstTeamPoints] = useState<string>('')
  const [secondTeamPoints, setSecondTeamPoints] = useState<string>('')



  const toast = useToast()
  const fetchGames = async()=>{
    try{
      setIsLoading(true)
      const response = await api.get(`/pools/${poolId}/games`)
      setGames(response.data.games)

    }catch(error) {
      console.log(error)
      toast.show({
          title: 'Não foi possível carregar os jogos',
          placement: 'top',
          bgColor: 'red.500'
      })

  } finally {
      setIsLoading(false)
  }
  }

  const handleGuessConfirm = async (gameId) => {
    try {
      if(!firstTeamPoints.trim() || !secondTeamPoints.trim()){
        return toast.show({
          title: 'Informe o placar do palpite!',
          placement: 'top',
          bgColor: 'red.500'
      })
    }

      await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints)
      })

    toast.show({
        title: 'Palpite realizado com sucesso!',
        placement: 'top',
        bgColor: 'green.500'
    }) 

    await fetchGames() 

    }catch(error) {
      console.log(error)
      toast.show({
          title: 'Não foi possível enviar o palpite!',
          placement: 'top',
          bgColor: 'red.500'
      })

  } finally {
      setIsLoading(false)
  }
  }

  useEffect(()=>{
    fetchGames(); 
  }, [poolId])

  if(isLoading) return <Loading/>

  return <FlatList
    data ={games}
    keyExtractor={ item  => item.id }
    renderItem = {({item})=> {
      return (
        <Game 
          onGuessConfirm={()=>handleGuessConfirm(item.id)} 
          data={item} 
          setFirstTeamPoints={setFirstTeamPoints} 
          setSecondTeamPoints={setSecondTeamPoints} 
           key={item.id}/>
      )
    } }
    _contentContainerStyle={{pb: 10}}
    ListEmptyComponent={()=> <EmptyMyPoolList code={code}/>}
  />
}