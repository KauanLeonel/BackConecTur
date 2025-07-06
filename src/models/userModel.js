
import {PrismaClient} from '@prisma/client'
import {z} from 'zod'
import bcrypt from 'bcrypt';


const prisma = new PrismaClient();


const userSchema = z.object({
    name: z.string({
        invalid_type_error: "O nome deve ser uma string.",
        required_error: "O nome é obrigatório."
    })
    .min(3, { message: "O nome deve ter no mínimo 3 caracteres." })
    .max(255, { message: "O nome deve ter no máximo 255 caracteres." }),

    email: z.string({
        invalid_type_error: "O email deve ser uma string.",
        required_error: "O email é obrigatório."
    })
    .email({ message: "Email inválido." }),



    password: z.string({
        invalid_type_error: "A senha deve ser uma string.",
        required_error: "A senha é obrigatória."
    })
    .min(8, { message: "A senha deve ter no mínimo 8 caracteres." })
    .max(255, { message: "A senha deve ter no máximo 255 caracteres." }),


});


export const userValidator = (user, partial = null) => {
    if(partial){
        return userSchema.partial(partial).safeParse(user)
    }
    return userSchema.safeParse(user)
}



export async function create(user) {
  // Gera o hash da senha (10 rounds de sal)
  const hashedPassword = await bcrypt.hash(user.password, 10);

  // Cria o usuário no banco, substituindo password pelo hash
  const result = await prisma.user.create({
    data: {
      ...user,
      password: hashedPassword,
    }
  });

  return result;
}


export async function remove(id){
    const result = await prisma.user.delete({
        where: {
            id
        }
    })
    return result
}

export async function getList(){
    const result = await prisma.user.findMany()
    return result
}

export async function update(id, user){
    const result = await prisma.user.update({
        where: {
            id
        },
        data: user
    })
    return result
}