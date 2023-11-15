import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GoalForm from "../../components/goal-form/GoalForm";
import Spinner from "../../components/spinner/Spinner";
import { getGoals, reset } from "../../features/goals/goalSlice";
import GoalItem from "../../components/goal-item/GoalItem";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector((state) => state.goals);

  useEffect(() => {
    if(isError) {
      console.log(message);
      toast.error(message)
    }

    if (!user) {
      navigate("/login");
      return; // this is the bug where if i logout my app crash (already fixed)
    }

    dispatch(getGoals());

    return () => {
      dispatch(reset());
    }
  }, [user, navigate, dispatch, isError, message]);

  if (isLoading) {
      return <Spinner />
  }

  return (
    <div className="container px-4 mx-auto h-auto w-screen pt-28 pb-28">

      <section className="mb-10">
        <h1 className="flex items-center gap-x-2 w-max mx-auto mb-6 text-3xl font-bold">Welcome {user && user.name}</h1>
        <p className="text-center mb-2 color-[gray]">Goals Dashboard</p>
      </section>

      <GoalForm />

      <section className="w-full md:w-[90%] md:mx-auto">
        <h2 className="text-2xl font-bold mb-4">Goals</h2>
        {goals.length > 0 ? (
          <div className="grid grid-cols-1 w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (<h3>You have not set any goals</h3>) }
      </section>

    </div>
  );
};

export default Dashboard;