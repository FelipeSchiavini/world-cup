### prisma

npm install @prisma/client
npm install prisma -D
- Create SQL Db (should show prisma folder)
npx prisma init --datasource-provider SQLite
- could insert on settings json to format .prisma
"[prisma]": {
    "editor.formatOnSave": true
}
- Generate migration
`npx prisma migrate dev`
- open db
`npx prisma studio`

- to create diagram Entity(ERD) use generator erd
npm install prisma-erd-generator @mermaid-js/mermaid-cli -D

- https://github.com/keonik/prisma-erd-generator
insert on shema.prima and run `npx prima generate`
```
generator erd {
  provider = "prisma-erd-generator"
}
```