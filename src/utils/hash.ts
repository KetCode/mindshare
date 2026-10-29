import bcrypt from 'bcryptjs'

export const hasPassword = async (plainPassword: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(plainPassword, salt)
}