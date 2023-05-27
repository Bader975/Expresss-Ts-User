"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = exports.connectDB = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    log: ["query"],
    errorFormat: "minimal",
});
exports.prisma = prisma;
const connectDB = () => {
    try {
        prisma.$connect();
        console.log("database connection !");
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
