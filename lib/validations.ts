import { z } from "zod";
import vi from "./i18n/vi";

const t = vi.validation;

export const wishSchema = z.object({
  name: z
    .string()
    .min(1, t.nameRequired)
    .max(100, t.nameTooLong)
    .trim(),
  content: z
    .string()
    .min(1, t.wishRequired)
    .max(1000, t.wishTooLong)
    .trim(),
});

export type WishFormData = z.infer<typeof wishSchema>;

export const rsvpSchema = z.object({
  name: z
    .string()
    .min(1, t.nameRequired)
    .max(100, t.nameTooLong)
    .trim(),
  phone: z
    .string()
    .optional()
    .or(z.literal("")),
  isAttending: z.boolean({
    message: t.attendanceRequired,
  }),
  guestsCount: z
    .number()
    .int()
    .min(0)
    .max(10)
    .default(1),
  note: z
    .string()
    .max(500, t.noteTooLong)
    .optional()
    .or(z.literal("")),
});

export type RSVPFormData = z.infer<typeof rsvpSchema>;
