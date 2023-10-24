import User from "../model/userModel";

const deleteSessionToken = async (sessionToken: string) => {
  return await User.findOneAndUpdate(
    { "authentication.token": sessionToken },
    { $pull: { authentication: { token: sessionToken } } }
  );
};

export default deleteSessionToken;
