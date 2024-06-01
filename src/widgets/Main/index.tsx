import { useSessionStore } from '@/stores/session';
import Signup from '../Signup';
import Result from '../Result';
import Game from '../Game';

function Main() {
  const user = useSessionStore((state) => state.user);
  const items = useSessionStore((state) => state.items);
  const isFinishedAnswering =
    items?.length > 0 ? items.every((item) => item.answer.length > 0) : false;

  return (
    <main>
      {!user ? <Signup /> : isFinishedAnswering ? <Result /> : <Game />}
    </main>
  );
}

export default Main;
