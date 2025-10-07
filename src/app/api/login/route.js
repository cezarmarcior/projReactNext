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
                        }
                    ];

export async function POST(request) {
    try {
        //Bloco 1
        const body = await request.json();
        const { login, password } = body;

        const teste = `Usuario: ${login} Senha: ${password}`
        return NextResponse.json(teste);
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