import bcrypt from 'bcrypt';

const saltRounds = 10;

export async function generateHash(password: string) : Promise<String|null>{
    try{
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    }catch(error){
        console.log(error);
        return null;
    }
}

export async function validateHash(password: string, hash: string) : Promise<boolean> {
    try{
        return await bcrypt.compare(password, hash);
    }catch(error){
        console.log(error);
        return false;
    }
}