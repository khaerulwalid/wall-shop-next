const bcrypt = require('bcryptjs');

export const hashPassword = (password: string) => {
    let hash = bcrypt.hashSync(password, 8);

    return hash
}

export const comparePassword = (password: string, hash: string) => {
    return bcrypt.compareSync(password, hash);
}