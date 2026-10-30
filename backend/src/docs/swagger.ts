import swaggerJSDoc from 'swagger-jsdoc';

function errorResponse(
    description: string,
    examples: Record<string, { summary: string; code: string; message: string }>,
) {
    return {
        description,
        content: {
            'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
                examples: Object.fromEntries(
                    Object.entries(examples).map(([name, example]) => [
                        name,
                        {
                            summary: example.summary,
                            value: {
                                error: {
                                    code: example.code,
                                    message: example.message,
                                },
                            },
                        },
                    ]),
                ),
            },
        },
    };
}

function validationResponse(
    description: string,
    examples: Record<string, { summary: string; value: Record<string, unknown> }>,
) {
    return {
        description,
        content: {
            'application/json': {
                schema: { $ref: '#/components/schemas/ValidationError' },
                examples: Object.fromEntries(
                    Object.entries(examples).map(([name, example]) => [
                        name,
                        {
                            summary: example.summary,
                            value: example.value,
                        },
                    ]),
                ),
            },
        },
    };
}

const internalServerError = {
    internalServerError: {
        summary: 'Erro interno do servidor',
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Ocorreu um erro inesperado no servidor.',
    },
};

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'LowBudgetFlix API',
            version: '1.0.0',
            description: 'Documentação da API de streaming LowBudgetFlix',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor Local',
            },
        ],
        tags: [
            { name: 'Autenticação', description: 'Autenticação e emissão de tokens.' },
            { name: 'Usuários', description: 'Cadastro e gerenciamento de usuários.' },
        ],
        paths: {
            '/api/auth/login': {
                post: {
                    tags: ['Autenticação'],
                    summary: 'Autenticar usuário',
                    description: 'Valida as credenciais e retorna um token JWT válido por 2 horas.',
                    operationId: 'login',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/UsuarioLogin' },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'Autenticação realizada com sucesso.',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/TokenResponse' },
                                },
                            },
                        },
                        '400': {
                            ...validationResponse('Corpo da requisição inválido.', {
                                invalidEmail: {
                                    summary: 'Email inválido',
                                    value: {
                                        errors: {
                                            email: [{
                                                origin: 'string',
                                                code: 'invalid_format',
                                                format: 'email',
                                                pattern: "/^(?:[A-Za-z0-9_'+\\-]+\\.)*[A-Za-z0-9_'+\\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\\-]*\\.)+[A-Za-z]{2,}$/",
                                                path: ['email'],
                                                message: 'Invalid email address',
                                            }],
                                        },
                                    },
                                },
                            }),
                        },
                        '401': {
                            ...errorResponse('Email ou senha incorretos.', {
                                invalidCredentials: {
                                    summary: 'Credenciais inválidas',
                                    code: 'UNAUTHORIZED',
                                    message: 'Email ou senha incorretos.',
                                },
                            }),
                        },
                        '500': {
                            ...errorResponse('Erro inesperado no servidor.', internalServerError),
                        },
                    },
                },
            },
            '/api/usuarios/comum': {
                post: {
                    tags: ['Usuários'],
                    summary: 'Cadastrar usuário comum',
                    operationId: 'createComum',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/CreateUsuario' },
                            },
                        },
                    },
                    responses: {
                        '201': {
                            description: 'Usuário criado.',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/UsuarioResponse' },
                                },
                            },
                        },
                        '400': {
                            ...validationResponse('Corpo da requisição inválido.', {
                                invalidName: {
                                    summary: 'Nome vazio',
                                    value: {
                                        errors: {
                                            nome: [{
                                                origin: 'string',
                                                code: 'too_small',
                                                minimum: 1,
                                                inclusive: true,
                                                path: ['nome'],
                                                message: 'Too small: expected string to have >=1 characters',
                                            }],
                                        },
                                    },
                                },
                            }),
                        },
                        '422': {
                            ...errorResponse('Já existe um usuário com esse email.', {
                                duplicateEmail: {
                                    summary: 'Email já cadastrado',
                                    code: 'UNPROCESSABLE_ENTITY',
                                    message: 'Já existe um usuário com esse email.',
                                },
                            }),
                        },
                        '500': {
                            ...errorResponse('Erro inesperado no servidor.', internalServerError),
                        },
                    },
                },
            },
            '/api/usuarios/admin': {
                post: {
                    tags: ['Usuários'],
                    summary: 'Cadastrar administrador',
                    description: 'Cria um usuário com privilégios de administrador. Requer autenticação de administrador.',
                    operationId: 'createAdmin',
                    security: [{ bearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/CreateUsuario' },
                            },
                        },
                    },
                    responses: {
                        '201': {
                            description: 'Administrador criado.',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/UsuarioResponse' },
                                },
                            },
                        },
                        '400': {
                            ...validationResponse('Corpo da requisição inválido.', {
                                invalidName: {
                                    summary: 'Nome vazio',
                                    value: {
                                        errors: {
                                            nome: [{
                                                origin: 'string',
                                                code: 'too_small',
                                                minimum: 1,
                                                inclusive: true,
                                                path: ['nome'],
                                                message: 'Too small: expected string to have >=1 characters',
                                            }],
                                        },
                                    },
                                },
                            }),
                        },
                        '401': {
                            ...errorResponse('Autenticação ausente ou token inválido/expirado.', {
                                invalidToken: {
                                    summary: 'Token inválido ou expirado',
                                    code: 'UNAUTHORIZED',
                                    message: 'Token inválido ou expirado.',
                                },
                            }),
                        },
                        '403': {
                            ...errorResponse('O usuário autenticado não é administrador.', {
                                adminRequired: {
                                    summary: 'Acesso restrito a administradores',
                                    code: 'FORBIDDEN',
                                    message: 'Requer privilégios de administrador.',
                                },
                            }),
                        },
                        '422': {
                            ...errorResponse('Já existe um usuário com esse email.', {
                                duplicateEmail: {
                                    summary: 'Email já cadastrado',
                                    code: 'UNPROCESSABLE_ENTITY',
                                    message: 'Já existe um usuário com esse email.',
                                },
                            }),
                        },
                        '500': {
                            ...errorResponse('Erro inesperado no servidor.', internalServerError),
                        },
                    },
                },
            },
            '/api/usuarios': {
                get: {
                    tags: ['Usuários'],
                    summary: 'Listar usuários',
                    description: 'Retorna todos os usuários. Requer autenticação de administrador.',
                    operationId: 'getAllUsuarios',
                    security: [{ bearerAuth: [] }],
                    responses: {
                        '200': {
                            description: 'Lista de usuários.',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: { $ref: '#/components/schemas/UsuarioResponse' },
                                    },
                                },
                            },
                        },
                        '401': {
                            ...errorResponse('Autenticação ausente ou token inválido/expirado.', {
                                invalidToken: {
                                    summary: 'Token inválido ou expirado',
                                    code: 'UNAUTHORIZED',
                                    message: 'Token inválido ou expirado.',
                                },
                            }),
                        },
                        '403': {
                            ...errorResponse('O usuário autenticado não é administrador.', {
                                adminRequired: {
                                    summary: 'Acesso restrito a administradores',
                                    code: 'FORBIDDEN',
                                    message: 'Requer privilégios de administrador.',
                                },
                            }),
                        },
                        '500': {
                            ...errorResponse('Erro inesperado no servidor.', internalServerError),
                        },
                    },
                },
            },
            '/api/usuarios/me': {
                get: {
                    tags: ['Usuários'],
                    summary: 'Consultar usuário autenticado',
                    operationId: 'getMe',
                    security: [{ bearerAuth: [] }],
                    responses: {
                        '200': {
                            description: 'Dados do usuário autenticado.',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/UsuarioResponse' },
                                },
                            },
                        },
                        '401': {
                            ...errorResponse('Autenticação ausente ou token inválido/expirado.', {
                                invalidToken: {
                                    summary: 'Token inválido ou expirado',
                                    code: 'UNAUTHORIZED',
                                    message: 'Token inválido ou expirado.',
                                },
                            }),
                        },
                        '404': {
                            ...errorResponse('Usuário do token não encontrado.', {
                                userNotFound: {
                                    summary: 'Usuário não encontrado',
                                    code: 'NOT_FOUND',
                                    message: 'Usuário não encontrado.',
                                },
                            }),
                        },
                        '500': {
                            ...errorResponse('Erro inesperado no servidor.', internalServerError),
                        },
                    },
                },
                patch: {
                    tags: ['Usuários'],
                    summary: 'Atualizar nome do usuário autenticado',
                    operationId: 'updateUsuario',
                    security: [{ bearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/UpdateNomeUsuario' },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'Nome atualizado.',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/UsuarioResponse' },
                                },
                            },
                        },
                        '400': {
                            ...validationResponse('Corpo da requisição inválido.', {
                                invalidName: {
                                    summary: 'Nome vazio',
                                    value: {
                                        errors: {
                                            nome: [{
                                                origin: 'string',
                                                code: 'too_small',
                                                minimum: 1,
                                                inclusive: true,
                                                path: ['nome'],
                                                message: 'Too small: expected string to have >=1 characters',
                                            }],
                                        },
                                    },
                                },
                            }),
                        },
                        '401': {
                            ...errorResponse('Autenticação ausente ou token inválido/expirado.', {
                                invalidToken: {
                                    summary: 'Token inválido ou expirado',
                                    code: 'UNAUTHORIZED',
                                    message: 'Token inválido ou expirado.',
                                },
                            }),
                        },
                        '404': {
                            ...errorResponse('Usuário do token não encontrado.', {
                                userNotFound: {
                                    summary: 'Usuário não encontrado',
                                    code: 'NOT_FOUND',
                                    message: 'Usuário não encontrado.',
                                },
                            }),
                        },
                        '500': {
                            ...errorResponse('Erro inesperado no servidor.', internalServerError),
                        },
                    },
                },
            },
            '/api/usuarios/{id}': {
                get: {
                    tags: ['Usuários'],
                    summary: 'Consultar usuário por ID',
                    description: 'Requer autenticação de administrador.',
                    operationId: 'getUsuarioById',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            required: true,
                            description: 'ID inteiro do usuário.',
                            schema: { type: 'integer', minimum: 1 },
                        },
                    ],
                    responses: {
                        '200': {
                            description: 'Usuário encontrado.',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/UsuarioResponse' },
                                },
                            },
                        },
                        '400': {
                            ...validationResponse('ID inválido.', {
                                invalidId: {
                                    summary: 'ID não numérico',
                                    value: {},
                                },
                            }),
                        },
                        '401': {
                            ...errorResponse('Autenticação ausente ou token inválido/expirado.', {
                                invalidToken: {
                                    summary: 'Token inválido ou expirado',
                                    code: 'UNAUTHORIZED',
                                    message: 'Token inválido ou expirado.',
                                },
                            }),
                        },
                        '403': {
                            ...errorResponse('O usuário autenticado não é administrador.', {
                                adminRequired: {
                                    summary: 'Acesso restrito a administradores',
                                    code: 'FORBIDDEN',
                                    message: 'Requer privilégios de administrador.',
                                },
                            }),
                        },
                        '404': {
                            ...errorResponse('Usuário não encontrado.', {
                                userNotFound: {
                                    summary: 'Usuário não encontrado',
                                    code: 'NOT_FOUND',
                                    message: 'Usuário não encontrado.',
                                },
                            }),
                        },
                        '500': {
                            ...errorResponse('Erro inesperado no servidor.', internalServerError),
                        },
                    },
                },
                delete: {
                    tags: ['Usuários'],
                    summary: 'Remover usuário',
                    description: 'Requer autenticação de administrador. Administradores não podem ser removidos.',
                    operationId: 'removeUsuario',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            required: true,
                            description: 'ID inteiro do usuário.',
                            schema: { type: 'integer', minimum: 1 },
                        },
                    ],
                    responses: {
                        '204': { description: 'Usuário removido.' },
                        '400': {
                            ...validationResponse('ID inválido.', {
                                invalidId: {
                                    summary: 'ID não numérico',
                                    value: {},
                                },
                            }),
                        },
                        '401': {
                            ...errorResponse('Autenticação ausente ou token inválido/expirado.', {
                                invalidToken: {
                                    summary: 'Token inválido ou expirado',
                                    code: 'UNAUTHORIZED',
                                    message: 'Token inválido ou expirado.',
                                },
                            }),
                        },
                        '403': {
                            ...errorResponse(
                                'Usuário autenticado sem privilégios de administrador ou tentativa de remover um administrador.',
                                {
                                    adminRequired: {
                                        summary: 'Acesso restrito a administradores',
                                        code: 'FORBIDDEN',
                                        message: 'Requer privilégios de administrador.',
                                    },
                                    adminCannotBeRemoved: {
                                        summary: 'Não é permitido remover um administrador',
                                        code: 'FORBIDDEN',
                                        message: 'Não é possível deletar usuário administrador.',
                                    },
                                },
                            ),
                        },
                        '404': {
                            ...errorResponse('Usuário não encontrado.', {
                                userNotFound: {
                                    summary: 'Usuário não encontrado',
                                    code: 'NOT_FOUND',
                                    message: 'Usuário não encontrado.',
                                },
                            }),
                        },
                        '500': {
                            ...errorResponse('Erro inesperado no servidor.', internalServerError),
                        },
                    },
                },
            },
            '/api/usuarios/me/senha': {
                put: {
                    tags: ['Usuários'],
                    summary: 'Alterar senha do usuário autenticado',
                    operationId: 'updateUsuarioSenha',
                    security: [{ bearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/UpdateSenhaUsuario' },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'Senha atualizada. A resposta contém somente os dados públicos do usuário.',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/UsuarioResponse' },
                                },
                            },
                        },
                        '400': {
                            ...validationResponse('Corpo da requisição inválido.', {
                                weakPassword: {
                                    summary: 'Nova senha menor que 8 caracteres',
                                    value: {
                                        errors: {
                                            senhaNova: [{
                                                origin: 'string',
                                                code: 'too_small',
                                                minimum: 8,
                                                inclusive: true,
                                                path: ['senhaNova'],
                                                message: 'Too small: expected string to have >=8 characters',
                                            }],
                                        },
                                    },
                                },
                            }),
                        },
                        '401': {
                            ...errorResponse(
                                'Autenticação ausente, token inválido/expirado ou senha antiga incorreta.',
                                {
                                    invalidToken: {
                                        summary: 'Token inválido ou expirado',
                                        code: 'UNAUTHORIZED',
                                        message: 'Token inválido ou expirado.',
                                    },
                                    wrongCurrentPassword: {
                                        summary: 'Senha antiga incorreta',
                                        code: 'UNAUTHORIZED',
                                        message: 'Senha incorreta.',
                                    },
                                },
                            ),
                        },
                        '404': {
                            ...errorResponse('Usuário do token não encontrado.', {
                                userNotFound: {
                                    summary: 'Usuário não encontrado',
                                    code: 'NOT_FOUND',
                                    message: 'Usuário não encontrado.',
                                },
                            }),
                        },
                        '500': {
                            ...errorResponse('Erro inesperado no servidor.', internalServerError),
                        },
                    },
                },
            },
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'No botão Authorize do Swagger, informe o token JWT retornado por /api/auth/login. O Swagger envia o token no formato Bearer; cole somente o token, sem o prefixo.',
                },
            },
            schemas: {
                UsuarioLogin: {
                    type: 'object',
                    required: ['email', 'senha'],
                    properties: {
                        email: {
                            type: 'string',
                            format: 'email',
                            example: 'usuario@example.com',
                        },
                        senha: {
                            type: 'string',
                            example: 'minha-senha',
                        },
                    },
                },
                CreateUsuario: {
                    type: 'object',
                    required: ['nome', 'email', 'senha'],
                    properties: {
                        nome: {
                            type: 'string',
                            minLength: 1,
                            maxLength: 150,
                            example: 'Maria Silva',
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            maxLength: 350,
                            example: 'maria@example.com',
                        },
                        senha: {
                            type: 'string',
                            minLength: 8,
                            example: 'senha-segura',
                        },
                    },
                },
                UpdateNomeUsuario: {
                    type: 'object',
                    required: ['nome'],
                    properties: {
                        nome: {
                            type: 'string',
                            minLength: 1,
                            maxLength: 150,
                            example: 'Maria Silva',
                        },
                    },
                },
                UpdateSenhaUsuario: {
                    type: 'object',
                    required: ['senhaAntiga', 'senhaNova'],
                    properties: {
                        senhaAntiga: {
                            type: 'string',
                            example: 'senha-atual',
                        },
                        senhaNova: {
                            type: 'string',
                            minLength: 8,
                            example: 'nova-senha-segura',
                        },
                    },
                },
                UsuarioResponse: {
                    type: 'object',
                    required: ['id', 'nome', 'email', 'flag_administrador', 'criado_em'],
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1,
                        },
                        nome: {
                            type: 'string',
                            minLength: 1,
                            maxLength: 150,
                            example: 'Maria Silva',
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            maxLength: 350,
                            example: 'maria@example.com',
                        },
                        flag_administrador: {
                            type: 'boolean',
                            example: false,
                        },
                        criado_em: {
                            type: 'string',
                            format: 'date-time',
                            example: '2026-10-30T12:00:00.000Z',
                        },
                    },
                },
                TokenResponse: {
                    type: 'object',
                    required: ['token'],
                    properties: {
                        token: {
                            type: 'string',
                            description: 'JWT com os dados do usuário, válido por 2 horas.',
                        },
                    },
                },
                ErrorResponse: {
                    type: 'object',
                    required: ['error'],
                    properties: {
                        error: {
                            type: 'object',
                            required: ['code', 'message'],
                            properties: {
                                code: { type: 'string' },
                                message: { type: 'string' },
                            },
                        },
                    },
                },
                ValidationError: {
                    type: 'object',
                    properties: {
                        errors: {
                            type: 'object',
                            description: 'Erros de validação agrupados pelo campo inválido.',
                            additionalProperties: {
                                type: 'array',
                                items: { $ref: '#/components/schemas/ValidationIssue' },
                            },
                        },
                    },
                },
                ValidationIssue: {
                    type: 'object',
                    required: ['code', 'path', 'message'],
                    properties: {
                        origin: { type: 'string' },
                        code: { type: 'string' },
                        format: { type: 'string' },
                        pattern: { type: 'string' },
                        minimum: { type: 'number' },
                        inclusive: { type: 'boolean' },
                        path: {
                            type: 'array',
                            items: { type: 'string' },
                        },
                        message: { type: 'string' },
                    },
                    additionalProperties: true,
                },
            },
        },
    },
    apis: ['./src/**/*.routes.ts', './src/**/*.controllers.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);
