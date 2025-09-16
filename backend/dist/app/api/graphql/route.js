"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamic = void 0;
exports.OPTIONS = OPTIONS;
exports.GET = GET;
exports.POST = POST;
const schemas_1 = require("@/schemas");
const resolvers_1 = require("@/resolvers");
const server_1 = require("next/server");
const database_1 = require("@/database");
const server_2 = require("@apollo/server");
const next_1 = require("@as-integrations/next");
(0, database_1.connectDataBase)();
const server = new server_2.ApolloServer({
    resolvers: resolvers_1.resolvers,
    typeDefs: schemas_1.typeDefs,
    introspection: true,
});
const handler = (0, next_1.startServerAndCreateNextHandler)(server, {
    context: async (req) => ({ req }),
});
// Handle CORS preflight requests
async function OPTIONS(request) {
    return new server_1.NextResponse(null, {
        status: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
    });
}
exports.dynamic = "force-dynamic";
async function GET(request) {
    return handler(request);
}
async function POST(request) {
    return handler(request);
}
//# sourceMappingURL=route.js.map