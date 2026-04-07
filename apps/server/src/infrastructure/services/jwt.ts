// // src/infrastructure/services/jwt.ts (ou onde preferir na sua estrutura)
// import jwt from "jsonwebtoken";

// export interface TokenPayload {
//   userId: string;
//   role?: string;
//   // adicione outras propriedades que você coloca no token
// }

// export function verifyToken(token: string): TokenPayload | null {
//   try {
//     // Remove o "Bearer " do header, caso o front-end envie assim
//     const cleanToken = token.replace("Bearer ", "");
    
//     // Certifique-se de ter o JWT_SECRET no seu .env
//     const secret = process.env.JWT_SECRET || "seu_segredo_super_seguro"; 
    
//     const decoded = jwt.verify(cleanToken, secret) as TokenPayload;
//     return decoded;
//   } catch (error) {
//     // Se o token for inválido, expirado, ou malformado, retorna null
//     return null;
//   }
// }