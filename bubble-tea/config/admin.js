module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'd7866925e4e5642b9be8308a2b4784ea'),
  },
});
