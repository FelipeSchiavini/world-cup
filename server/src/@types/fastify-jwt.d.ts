import '@fastify/jwt'
import 'fastify'
export declare module  '@fastify/jwt' {
    interface FastifyJWT {
        user: {
            sub: string;
            name: string;
            avatarUrl: string;
        }
    }
}

declare module 'fastify' {
    interface FastifyInstance {
      config: { 
        PORT: string;
        SECRET_JWT:string;
        GOOGLE_USER_URL: string;
      };
    }
  }