import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { authenticate } from '../plugins/authenticate';

export async function authRoutes(fastify: FastifyInstance) {
    fastify.get('/me', 
    {
        onRequest: [authenticate]
    },
    async (request) => {
        return { user: request.user }
    })

    fastify.post('/users', async(request) => {
        const createUserBody = z.object({
            access_token: z.string()
        })

        const { access_token } = createUserBody.parse(request.body)

        const userResponse = await fetch(fastify.config.GOOGLE_USER_URL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })

        const userData = await userResponse.json()

        const userInfoSchema = z.object({
            id: z.string(),
            email: z.string().email(),
            name: z.string(),
            picture: z.string().url()
        })

        const {name, email, id, picture} = userInfoSchema.parse(userData)

        let user = await prisma.user.findUnique({
            where: {
                googleId: id,
            }
        })

        if(!user){
            user = await prisma.user.create({
                data:{
                    email: email,
                    name: name,
                    avatarUrl: picture,
                    googleId: id,
                }
            })
        }

        const token = fastify.jwt.sign(
            {
                name: name,
                avatar: picture,
            },{
                sub: user.id,
                expiresIn: '14 days'
            }
        )

        return { token }
     })
}