import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

export default function SignIn({ setUser }) {
  const handleSignIn = async () => {
      try {
            const result = await signInWithPopup(auth, provider);
                  setUser(result.user);
                      } catch (error) {
                            console.error("Sign-in error:", error);
                                }
                                  };

                                    return (
                                        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                                              <div className="bg-white/10 backdrop-blur p-8 rounded-lg text-center">
                                                      <h2 className="text-3xl font-bold mb-4">Welcome to Elite Budget Tracker</h2>
                                                              <button
                                                                        onClick={handleSignIn}
                                                                                  className="bg-blue-600 px-6 py-2 rounded text-white font-semibold hover:bg-blue-700"
                                                                                          >
                                                                                                    Sign in with Google
                                                                                                            </button>
                                                                                                                  </div>
                                                                                                                      </div>
                                                                                                                        );
                                                                                                                        }