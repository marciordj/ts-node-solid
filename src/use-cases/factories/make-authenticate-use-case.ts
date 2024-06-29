import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { Authenticate } from "../authenticate";

export function makeAuthenticateUseCase() {
  const userRepository = new PrismaUsersRepository();
  const authenticateUseCase = new Authenticate(userRepository);

  return authenticateUseCase
}