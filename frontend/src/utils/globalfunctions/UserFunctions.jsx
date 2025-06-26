

async function getIDToken() {
  try {
    const session = await fetchAuthSession({ forceRefresh: true });
    localStorage.setItem("jwtToken", session.tokens.idToken.toString());
  } catch (error) {
    console.error("Error retrieving JWT token:", error);
  }
}

async function getUserInfos() {
  try {
    const currentUser = await getCurrentUser();
    const session = await fetchAuthSession();
    const userAttributes = session.tokens.idToken.payload;
    window.userInfos = {
      username: currentUser.username,
      attributes: userAttributes,
    };
    return window.userInfos;
  } catch (error) {
    console.error("Error getting user information:", error);
    return null;
  }
}

export async function handleSignOut() {
  try {
    await signOut();
  } catch (error) {
    console.log("error signing out: ", error);
  }
}

export function isUserFunc() {
  const session = fetchAuthSession();

  const isUser =
    session?.tokens?.idToken?.payload?.["custom:user_type"] === "user";
  return isUser;
}

window.isUserFunc = isUserFunc;
window.getIDToken = getIDToken;
window.handleSignOut = handleSignOut;
window.getUserInfos = getUserInfos;
