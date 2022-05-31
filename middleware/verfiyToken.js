import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res
      .status(401)
      .json({ error: { message: '로그인을 먼저 해주세요.' } });
  }
  jwt.verify(authorization, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(419).json({
          error: { message: '토큰이 만료되었습니다. 다시 시도해주세요.' },
        });
      }
      return res.status(401).json({
        error: { message: '토큰 정보가 잘못되었습니다. 다시 시도해주세요.' },
      });
    }
    console.log(decoded);
    req.decoded = decoded;
    next();
  });
};

export default verifyToken;
