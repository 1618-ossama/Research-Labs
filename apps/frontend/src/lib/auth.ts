

export const checkLoginStatus = async () => {
  try {

    const mockLoggedIn = localStorage.getItem("isLoggedIn") === "true"

    if (mockLoggedIn) {
      const storedUserData = localStorage.getItem("userData")
      const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null

      setIsLoggedIn(true)
      setUserData(
        parsedUserData || {
          name: "John Doe",
          email: "john@example.com",
        },
      )
    } else {
      setIsLoggedIn(false)
      setUserData(null)
    }
  } catch (error) {
    console.error("Error checking login status:", error)
    setIsLoggedIn(false)
    setUserData(null)
  }
}


