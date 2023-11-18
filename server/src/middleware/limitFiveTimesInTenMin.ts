import rateLimit from "express-rate-limit";

export const limitFiveTimesInTenMin = rateLimit({
  windowMs: 10 * 60 * 1000, //10 minute
  max: 5,
  message: { success: false, error: "To many attempts." },
});
