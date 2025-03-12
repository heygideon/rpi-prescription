import { authProcedure, router } from "../lib/trpc";

const authRouter = router({
  me: authProcedure.query(async ({ ctx }) => {
    const { user } = ctx;
    await new Promise((r) => setTimeout(r, 500));

    return {
      id: user.id,
      title: user.title,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
      email: user.email,
      phoneNumber: user.phoneNumber,
    };
  }),
});
export default authRouter;
