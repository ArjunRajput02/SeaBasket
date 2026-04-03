import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import type { RouteProps } from "react-router-dom";


export default function PublicRoute({ children }: RouteProps) {
  const sessionToken = useSelector(
    (state: RootState) => state.auth.sessionToken,
  );

  if (sessionToken) {
    return <Navigate to="/" />;
  }

  return children;
}
