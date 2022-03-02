import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Session, SessionContextType } from "../models/session.model";

const initialSession: SessionContextType = {
  session: {
    logged: false,
    jwt: "",
    email: "",
  },
  _setSession: (_value: Session) => {
    return;
  },
  resetSession: () => {
    return;
  },
};

export const SessionContext = createContext<SessionContextType>(initialSession);

export const SessionProvider = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const [session, _setSession] = useState(initialSession.session);

  const resetSession = useCallback(
    () => _setSession(initialSession.session),
    [_setSession]
  );

  return (
    <SessionContext.Provider value={{ session, _setSession, resetSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);

  if (context === undefined)
    throw new Error("useContextSession must be used within a SessionProvider");

  return context;
};
