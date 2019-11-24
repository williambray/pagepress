function isAdmin(user) {
  const admin = user.permissions.includes("ADMIN");
  if (!admin) {
    throw new Error(
      `Sorry, it looks like you're not an admin. If you think this is wrong, please speak to an admin`
    );
  }
}
