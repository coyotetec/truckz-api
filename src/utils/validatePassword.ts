import bcrypt from 'bcrypt';

export async function validatePassword(
  password: string,
  hashedPassword: string,
) {
  const samePassword = await bcrypt.compare(password, hashedPassword);

  return samePassword;
}
