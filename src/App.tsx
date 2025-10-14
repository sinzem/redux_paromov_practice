import { Counter } from './modules/counters/counters';
import { UsersList } from './modules/users/users-list';

export default function App() {
  return (
    <>
      <div className="flex gap-10 w-fit mx-auto my-12">
          <Counter counterId='first'/>
          <Counter counterId='second'/>
      </div>
      
      <UsersList />
      <UsersList />
    </>
  )
}



