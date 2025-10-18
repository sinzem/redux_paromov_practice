import { useDispatch } from "react-redux";
import { useAppSelector } from "../../shared/redux";
import { decrementAction, incrementAction, selectCounter, type CounterId } from "./counters.slice";

export function Counter({counterId}: {counterId: CounterId}) {
  const dispatch = useDispatch();

  const counterState = useAppSelector((state) => selectCounter(state, counterId)); 

  return (
    <div className='flex gap-5 items-center'>
        Counter {counterState?.counter || 0} 
        <button
          className='btn'
          onClick={() => dispatch(incrementAction({counterId}))}
        > 
          increment
        </button>
        <button
          className='btn'
   
          onClick={() => dispatch(decrementAction({counterId}))} 
        >
          decrement
        </button>
    </div>
  )
}