import { Children, ReactNode } from 'react';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

type Props = {
  children: ReactNode;
  session: Session | null;
};

const Provider = (props: Props) => {
  return (
    <SessionProvider session={props.session}>
      {props.children}
    </SessionProvider>
  )
}

export default Provider