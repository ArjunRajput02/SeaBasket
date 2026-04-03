import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import type { RouteProps } from "@/utils/types";

export default function PrivateRoute({ children }: RouteProps) {
  const sessionToken = useSelector(
    (state: RootState) => state.auth.sessionToken,
  );

  if (!sessionToken) {
    return <Navigate to="/login" />;
  }

  return children;
}
