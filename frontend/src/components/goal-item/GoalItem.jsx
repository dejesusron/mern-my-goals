import { FaTrashCan } from 'react-icons/fa6';
import { useDispatch } from "react-redux";
import { deleteGoal } from "../../features/goals/goalSlice";

const GoalItem = ({goal}) => {
  const dispatch = useDispatch();

  return (
    <div className="border border-[#333] w-full p-4 bg-[#f1f3f4] relative">
        <div>
            {new Date(goal.createdAt).toLocaleString("en-US")}  
        </div>
        <h2 className="font-semibold text-lg">Goal: <span className="font-normal text-[sm]">{goal.title}</span></h2>
        <p className="font-semibold text-lg">Description: <span className="font-normal text-[sm]">{goal.desc}</span></p>
        <p className="font-semibold text-lg">Target age:  <span className="font-normal text-[sm]">{goal.age}</span></p>

        <button onClick={() => dispatch(deleteGoal(goal._id))} className="absolute top-4 right-4 hover:opacity-70"><FaTrashCan className="h-[20px] w-[20px]" /></button>
    </div>
  );
};

export default GoalItem;