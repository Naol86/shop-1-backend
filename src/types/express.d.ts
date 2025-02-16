// src/types/express.d.ts
import { User } from "@prisma/client"; // Import Prisma user type or the type you're using

declare global {
  namespace Express {
    interface Request {
      user?: User; // Attach the user to the Request interface
      uploadDir?: string; // Attach the uploadDir to the Request interface
    }
  }
}
