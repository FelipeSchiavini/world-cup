import { Pool, PrismaClient, User } from "@prisma/client"
import { faker } from '@faker-js/faker'

// `run: npx prisma db seed`

const prisma = new PrismaClient()

const main = async () => {
    const user = await createRandomUser()
    const pool = await createRandomPoolWithParticipant(user.id)
    const game1 = await createRandomGame()
    const game2 = await createRandomWithGuessGame(user.id, pool.id)
}


const createRandomUser = async (): Promise<User> => {
    return await prisma.user.create({
        data: {
            name: faker.name.fullName(),
            email: faker.internet.email(),
            avatarUrl: faker.image.avatar(),
            googleId: faker.random.alphaNumeric(8),
        }
    })
}

const createRandomPoolWithParticipant = async (ownerId : string): Promise<Pool> => {
    return await prisma.pool.create({
        data: {
            title: faker.lorem.word(),
            code: faker.random.alphaNumeric(6),
            ownerId,
        
            participants: {
                create: {
                    userId: ownerId
                }
            }
        }
    })
}

const createRandomGame = async () => {
    return await prisma.game.create({
        data:{
            date: faker.date.future().toISOString(),
            firstTeamCountryCode: faker.address.countryCode('alpha-2'),
            secondTeamCountryCode: faker.address.countryCode('alpha-2'),

        }
    })
}

const createRandomWithGuessGame = async (userId : string, poolId: string) => {
    return await prisma.game.create({
        data:{
            date: faker.date.future().toISOString(),
            firstTeamCountryCode: faker.address.countryCode('alpha-2'),
            secondTeamCountryCode: faker.address.countryCode('alpha-2'),

        guesses: {
            create: {
                firstTeamPoints: parseInt(faker.random.numeric(1, {bannedDigits : ['9', '8', '7', '6']})),
                secondTeamPoints: parseInt(faker.random.numeric(1, {bannedDigits : ['9', '8', '7', '6']})),
                participant: {
                    connect: {
                        userId_poolId: {
                            userId,
                            poolId
                        }
                    }
                }
            }
        }
        }
    })
}

main().then(() => console.log('Fake data is created'))