import Image from 'next/image'
import { FormEvent, useState } from 'react'
import usersAvatarsExampleImage from '../assets/avatars.png'
import checkIcon from '../assets/icon-check.svg'
import logo from '../assets/logo.svg'
import phoneImage from '../assets/phones.png'
import { api } from '../lib/axios'

interface HomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;
}

export default function Home(props: HomeProps) {
  const [poolTitle, setPoolTitle] = useState<string>("")

  const createPool = async (event: FormEvent) => {
    event.preventDefault()
    try{
      const response  = await api.post('/pools', {
        title: poolTitle
      })

      const { code } = response.data
      await navigator.clipboard.writeText(code)

      alert('Bolão criado com sucesso, o código foi copiado para área de transferência!')

      setPoolTitle('')
    }catch(e){
      console.log(e )
    }
  }

  return (
    <div className='max-w-[1124px] h-screen mx-auto grid grid-cols-2 items-center gap-28'>
      <main>
      <Image
        quality={100  }
        src={logo} 
        alt="logo"
      />
      <h1 className='mt-14 text-white text-5xl font-bold leading-tight'>
        Crie seu próprio bolão da copa e compartilhe entre amigos!
      </h1>
      <div className='mt-10 flex items-center gap-2'>
      <Image
        quality={100  }
        src={usersAvatarsExampleImage} 
        alt="avatars"
      />
        <strong className='text-gray-100 text-xl'><span className='text-green-500'>+ {props.userCount}</span > pessoas já usando</strong>
      </div>

      <form onSubmit={createPool} className='mt-10 flex  gap-2 '>
        <input className="flex-1 px-6 py-4 rounded bg-gray-800 border-gray-600 text-sm text-gray-100" value={poolTitle} type="text" required placeholder='Qual nome do seu bolão' onChange={event => setPoolTitle(event.target.value)} />
        <button className="bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700" type="submit"> Criar meu bolão</button>
      </form>

      <p className='text-gray-300 mt-4 text-sm leading-relaxed'>Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀</p>
      <div className='mt-10 pt-10 border-t border-gray-600 flex justify-between items-center text-gray-100'>
        <div className="flex items-center gap-6">
          <Image
          quality={100  }
          src={checkIcon} 
          alt=""
        />
        <div  className='flex flex-col'>
          <span className='font-bold text-xl'>+ {props.poolCount}</span>
          <span>Bolões criados</span>
        </div>
        </div>

        <div className='w-px h-14 bg-gray-600'></div>

        <div className="flex items-center gap-6">
          <Image
          quality={100  }
          src={checkIcon} 
          alt=""
        />
        <div className='flex flex-col'>
          <span className='font-bold text-xl'>+ {props.guessCount}</span>
          <span>Palpites enviados</span>

        </div>
        </div>
      </div>

      </main>
      <Image
        quality={100  }
        src={phoneImage} 
        alt="two phones with app"
      />
    </div>

    )
}

export const getServerSideProps = async() => {
  const [poolCountResponse, guessCountResponse, usersCountResponse ] = await Promise.all([
    api.get('pools/count'),
    api.get('guesses/count'),
    api.get('users/count')
  ])
  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: usersCountResponse.data.count
    }
  }
} 

