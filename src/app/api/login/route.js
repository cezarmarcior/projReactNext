import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = 'Minha_cH@ve_t&st&@2025';
const mockUsers = [
    {
        id: 1,
        username: "Marcio Cezar",
        login: "marcio.cezar",
        password: "secret@123"
    },
    {
        id: 2,
        username: "Rogerio Cezar",
        login: "rogerio.cezar",
        password: "secret@123"
    },
    {
        id: 3,
        username: "Rogerio Cezar",
        login: "marcio1.cezar",
        password: "secret@123"
    }
];

export async function POST(request) {
    try {
        //Bloco 1
        const body = await request.json();
        const { login, password } = body;

        const user = await mockUsers.find(u => u.login === login);
        if( !user || user.password !== password){
            return NextResponse.json(
                { error: 'Usuário ou senha inválidos'},
                { status: 401}
            );
        }
        //const teste = `Usuario: ${login} Senha: ${password}`
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                login : user.login
            },
            JWT_SECRET,
            { expiresIn: '1h'}
        );

        return NextResponse.json({token});
    } catch (error) {
        //Bloco 2
        return NextResponse.json(
            {erro: `Erro: ${error}`},
            {status: 500}
        );
    }
};

export async function GET(request){
    try {
        return NextResponse.json(mockUsers);
    } catch (error) {
        return NextResponse.json(
            {erro: `Erro: ${error}`},
            {status: 500}
        );
    }
}