import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

export default function PublicRoute({ children }: any) {
  const sessionToken = useSelector(
    (state: RootState) => state.auth.sessionToken,
  );

  if (sessionToken) {
    return <Navigate to="/" />;
  }

  return children;
}
