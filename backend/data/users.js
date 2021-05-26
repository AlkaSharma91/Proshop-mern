import bcrypt from 'bcryptjs';
const users=[
    {
        name:'Admin user',
        email:'admin@example',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true
    },
    {
        name:'Alka ',
        email:'alka@example',
        password:bcrypt.hashSync('123456',10),
        isAdmin:false
    },
    {
        name:'vibhu ',
        email:'vibhu@example',
        password:bcrypt.hashSync('123456',10),
        isAdmin:false
    }
]
export default users;