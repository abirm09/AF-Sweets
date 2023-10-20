import express from "express";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import { clientSideUrl } from "./secret";
import { errorResponse, successResponse } from "./helper/responseHandler";
import userRouter from "./routes/userRoutes";
export const app = express();

// cors config
const corsConfig = {
  origin: clientSideUrl,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

// Middleware
app.use(cors(corsConfig));
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.set("trust proxy", true);

// Default route
app.get(
  "/",
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      return successResponse(res, {
        message: "Server is running successfully.",
      });
    } catch (error) {
      next(error);
    }
  }
);

/*==========API routes starts here=========*/

app.use(userRouter);

/*==========API routes ends here===========*/

// Handle invalid endpoints
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      return errorResponse(res, {
        message: "Route not found.",
        statusCode: 400,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Handle server error
app.use(
  (
    err: { message: string; statusCode: number; stack: string },
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Error=>", new Date().toISOString());
    console.error(err.stack);
    return errorResponse(res, {
      message: "An error occurred. Please try again later or contact support.",
      statusCode: 500,
    });
  }
);
