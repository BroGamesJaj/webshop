## Használati leírás

1. xampp-ban Apache és MySQL elindítása.
3. A backend mappában a .env.example fájlt átnevezni .env-re.
4. A backend mappa termináljában: 
    1. npm i
    2. npx prisma db push
    3. npx prisma db seed
    4. npm run start:debug
5. A frontend mappa termináljában:
    1. npm i
    2. npm run dev