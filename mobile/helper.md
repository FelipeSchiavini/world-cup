### to install fonts on expo
npx expo install expo-font @expo-google-fonts/Robot


### expo-auth-session
npx expo install expo-auth-session expo-random expo-web-brownser
npx expo install expo-web-browser

- create Schema on app.json
```
https://docs.expo.dev/versions/latest/sdk/auth-session/#:~:text=%7B%0A%20%20%22expo%22%3A%20%7B%0A%20%20%20%20%22scheme%22%3A%20%22mycoolredirect%22%0A%20%20%7D%0A%7D

```

create acc on google.
API & services
Credenciais
Origens JavaScript autorizadas:
https://docs.expo.dev/guides/authentication/#google
Para usar com solicitações de um navegador: https://auth.expo.io

go get Para usar com solicitações de um servidor da Web

create account on expo.dev

run on terminal `npx expo login`
```
import * as AuthSession from 'expo-auth-session'
//    AuthSession.makeRedirectUrl({useProxy: true})
```

