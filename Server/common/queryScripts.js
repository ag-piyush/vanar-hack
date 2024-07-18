const selectUserByEmail = "SELECT * FROM dementia_users WHERE email=$1";
const createUser =
  "INSERT INTO dementia_users (email, password_hash, has_dementia, created_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING id";

const selectAllTokens = "SELECT expo_token FROM user_expo_tokens";
const addExpoTokenUponLogin = "INSERT INTO user_expo_tokens (email, expo_token) VALUES ($1, $2)";
const deleteExpoTokenByToken = "DELETE FROM user_expo_tokens WHERE expo_token=$1";
const deleteExpoTokenByUserAndToken = "DELETE FROM user_expo_tokens WHERE email=$1 AND expo_token=$2";

module.exports = {
  selectUserByEmail,
  createUser,

  selectAllTokens,
  addExpoTokenUponLogin,
  deleteExpoTokenByToken,
  deleteExpoTokenByUserAndToken,
};
