import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGoal } from "../../features/goals/goalSlice";

const GoalForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        desc: "",
        age: ""
    });

    const dispatch = useDispatch();

    const { title, desc, age } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const goalData = {
            title,
            desc,
            age
        };
        
        dispatch(createGoal(goalData));
        setFormData({title: "", desc: "", age: ""});
    };

    return (
        <section className="w-full border border-[#333] p-4 md:w-[400px] mx-auto mb-20">
            <form className="flex flex-col gap-y-4" onSubmit={onSubmit}>

                <div>
                    <input 
                        type="text" 
                        placeholder="Enter goal" 
                        className="border border-[#333] p-2 w-full"
                        name="title"
                        value={title}
                        onChange={onChange}
                        required
                    />
                </div>

                <div>
                    <input 
                        type="text" 
                        placeholder="Enter description" 
                        className="border border-[#333] p-2 w-full"
                        name="desc"
                        value={desc}
                        onChange={onChange}
                        required
                    />
                </div>

                <div>
                    <input 
                        type="number" 
                        placeholder="Enter target age" 
                        className="border border-[#333] p-2 w-full"
                        name="age"
                        value={age}
                        onChange={onChange}
                        required
                    />
                </div>

                <div>
                    <button className="border border-[#333] bg-[#333] text-[#fff] w-full p-2 hover:opacity-70 transition" type="submit">Submit</button>
                </div>

            </form>
        </section>
    );
};

export default GoalForm;