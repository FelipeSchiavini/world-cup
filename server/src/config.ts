const schema = {
    type: 'object',
    required: [ 'PORT', 'SECRET_JWT' ],
    properties: {
      PORT: {
        type: 'string',
        default: 3000
      },
      SECRET_JWT: {
        type: 'string',
        default: null
      },
      GOOGLE_USER_URL: {
        type: 'string',
        default: null
      }
    }
  }
  
export const options = {
    confKey: 'config',
    dotenv: true,
    debug: true,
    schema: schema
}