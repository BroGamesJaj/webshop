import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient()

async function main() {
    for (let i = 0; i < 15; i++) {
      await prisma.product.create({
        data: {
          name: faker.commerce.productName(),
          price: parseInt(faker.commerce.price()),
          desc: faker.commerce.productDescription()
        }
      })
    }
  
}
  
  main()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      
    })