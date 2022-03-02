export type Session = {
  logged: boolean;
  jwt: string;
  email: string;
};

export type SessionContextType = {
  session: Session;
  _setSession: (session: Session) => void;
  resetSession: () => void;
};
