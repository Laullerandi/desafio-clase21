import bcrypt from "bcrypt";

export const createHashValue = async (val) => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hashSync(val, salt);
};

// Modificar para que sea una función agnóstica:
export const isValidPwd = async (pwd, encryptedPwd) => {
  const validValue = await bcrypt.compareSync(pwd, encryptedPwd);
  return validValue;
};
