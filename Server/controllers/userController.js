const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Expo } = require("expo-server-sdk");
const {
  selectUserByEmail,
  createUser,
  selectAllTokens,
  deleteExpoTokenByToken,
  addExpoTokenUponLogin,
  deleteExpoTokenByUserAndToken,
  getFamilyUsers,
} = require("../common/queryScripts");
const { sendChunkMessages } = require("../common/expoNotifications");

module.exports.loginUser = async (req, res, pool) => {
  const client = await pool.connect();
  try {
    var { email, password } = req.body;

    // Existing user check
    const existingUser = await client.query(selectUserByEmail, [email]);
    if (existingUser.rowCount !== 1) {
      return res.status(403).json({
        msg: "user does not exist",
      });
    }

    // Valid password check
    const isMatch = await bcrypt.compare(password, existingUser.rows[0].password_hash);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    // Generate response token
    const token = jwt.sign(
      {
        sub: existingUser.rows[0].id,
        email: existingUser.rows[0].email,
        access_level: existingUser.rows[0].access_level,
      },
      process.env.JWT_SECRET
    );
    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: err.detail });
  } finally {
    client.release();
  }
};

module.exports.getFamilyById = async (req, res, pool) => {
  const client = await pool.connect();
  try {
    const famId = req.query.fam_id;
    const rows = await client.query(getFamilyUsers, [famId]);
    res.status(200).json(rows.rows);
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: err.detail });
  } finally {
    client.release();
  }
};

module.exports.logoutUser = async (req, res, pool) => {
  const client = await pool.connect();
  try {
    var { expoPushToken } = req.body;

    // Delete expo token
    if (!Expo.isExpoPushToken(expoPushToken)) {
      console.error(`Push token ${expoPushToken} is not a valid Expo push token`);
    } else {
      const token = req.headers.authorization;
      const decoded = jwt.decode(token, { complete: true });
      await client.query(deleteExpoTokenByUserAndToken, [decoded.payload.email, expoPushToken]);
    }

    res.status(200).json({ msg: "OK" });
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: err.detail });
  } finally {
    client.release();
  }
};

module.exports.signupUser = async (req, res, pool) => {
  const client = await pool.connect();
  try {
    var { email, password, expoPushToken } = req.body;

    email = email.trim();
    password = password.trim();
    if (!email || !password) return res.status(400).json({ msg: "Please enter valid values" });

    // Check existing user
    const existingUser = await client.query(selectUserByEmail, [email]);
    if (existingUser.rowCount > 0)
      return res.status(403).json({
        msg: "email already exists",
      });

    // TODO: SET ACCESS LEVELS
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const values = [email, passwordHash, false];

    const result = await client.query(createUser, values);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: err.detail });
  } finally {
    client.release();
  }
};

module.exports.expoNotifications = async (req, res, pool) => {
  console.log("[POST NOTIF]");
  const client = await pool.connect();
  try {
    const result = await client.query(selectAllTokens);
    const expoTokens = result.rows.map((item) => item.expo_token);
    sendChunkMessages(expoTokens);
    res.status(200).json("Notification Posted!!");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    client.release();
  }
};
