import '../form/form.css';
import DatePicker from "react-datepicker";
import { useState} from "react";
import {useForm, Controller} from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import {MAXIMUM_DATE, MINIMUM_DATE, PERFORMANCE_RATE, TITLES} from "../constants/constant";
import Icon from "./Icon";
import ReactTooltip from "react-tooltip";
// import DobDatePicker from "./DobDatePicker";

function Form() {
    const { register, handleSubmit, control, formState: {errors} } = useForm();

    const [userData, setUserData] = useState()
    const [workerPerformance, setWorkerPerformance] = useState({})
    const [tooltip, showTooltip] = useState(true);

    const createDobObject = (data) => {
        const day = data.day.getDate();
        const month = data.month.getMonth() +1;
        const year = data.year.getFullYear();
        let DOB = {
            day : day,
            month : month,
            year : year
        }
        delete (data.day)
        delete (data.month)
        delete (data.year)
        return DOB
    }

    const submitForm = (data) => {
        let DOB = {}
        console.log("data", data)
        if(data.day && data.month && data.year) {
            DOB = createDobObject(data)
        }
        setUserData(JSON.stringify({ ...data,...workerPerformance, DOB}))
    }

    return (
        <div className="form center">
            <h1 className="form-title">Front-end Dev Assignment</h1>
            <form className="form-wrapper" onSubmit={handleSubmit((data)=> submitForm(data))}>
                <div className="row">
                    <div className="col-12">
                        <label htmlFor="">Title</label>
                        <select
                            {...register("title")}
                            className="select"
                            id="select">
                            {TITLES.map((value, index) => {
                                return <option key={`title${index}`} value={value}>{value}</option>
                            })}
                        </select>
                    </div>
                    <div className="col-12">
                        <h3>Date of Birth
                            {" "}
                           <Icon showMessage={"Your Date of birth is required to accurately calculate your health age."}
                                 showTooltip={showTooltip}
                           />
                        </h3>

                        <div className="row">
                            <div className="col-4">
                                <label htmlFor="date">Day</label>
                                <Controller
                                    control={control}
                                    name="day"
                                    render={({ field }) => (
                                        <DatePicker
                                            placeholderText="Select date"
                                            dateFormat="dd"
                                            minDate={new Date(MINIMUM_DATE)}
                                            maxDate={new Date(MAXIMUM_DATE)}
                                            onChange={(date) => field.onChange(date)}
                                            selected={field.value}
                                        />
                                    )}
                                />
                                {/*<DobDatePicker dateFormat="dd" name="day" />*/}
                            </div>
                            <div className="col-4">
                                <label htmlFor="month">Month</label>
                                <Controller
                                    control={control}
                                    name="month"
                                    render={({ field }) => (
                                        <DatePicker
                                            placeholderText="Select month"
                                            dateFormat="MM"
                                            minDate={new Date(MINIMUM_DATE)}
                                            maxDate={new Date(MAXIMUM_DATE)}
                                            onChange={(date) => field.onChange(date)}
                                            selected={field.value}
                                        />
                                    )}
                                />
                            </div>
                            <div className="col-4">
                                <label htmlFor="year">Year</label>
                                <Controller
                                    control={control}
                                    name="year"
                                    render={({ field }) => (
                                        <DatePicker
                                            placeholderText="Select year"
                                            dateFormat="yyyy"
                                            minDate={new Date(MINIMUM_DATE)}
                                            maxDate={new Date(MAXIMUM_DATE)}
                                            onChange={(date) => {
                                                field.onChange(date)
                                            }}
                                            selected={field.value}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <h3>On a scale of 1-10, with 10 being the highest, how would you rate  the following?</h3>
                        <h3>The usual performance of most other workers in a job similar to yours</h3>
                        <div className="flex-performance">
                            {PERFORMANCE_RATE.map((value, key) => {
                                return <div key={`work${key}`}>
                                    <button className={workerPerformance.workerPerformance === String(value) ? "selected-button" : ""}
                                          onClick={(e) =>
                                              setWorkerPerformance({"workerPerformance": e.currentTarget.innerText})}
                                          >
                                        {value}
                                    </button>
                                </div>
                            })}
                        </div>
                    </div>
                    <div className="col-12">
                        <h3>Are there any other sources of  stress not mentioned here that effect you ?
                            {" "}
                            <Icon showMessage={"Knowing other work or non- work drivers of stress may help\n" +
                                              "your organization implement practices to counter these factors."}
                                  showTooltip={showTooltip}
                            />
                            {tooltip && <ReactTooltip place="right" effect="solid" />}
                        </h3>
                        <label htmlFor="textarea">Please enter upto 250 characters below</label>
                        <textarea
                                 {...register("stressSource", { maxLength: 256 })}
                                 id="textarea"
                                  className="textarea"
                                  rows="7"
                                  cols="60"
                        >
                        </textarea>
                        {errors.stressSource && <p className="error">Stress Source cannot be longer than 256 characters</p>}
                    </div>
                    <div className="col-12">
                        <h3>How would you describe the balance between your work and non-work activities? </h3>
                        <ul className="activities">
                            <li><input {...register("workBalance")} type="radio" value="ideal" id="1" /><label htmlFor="1"><span>A</span>Ideal</label></li>
                            <li><input {...register("workBalance")} type="radio" value="satisfactory" id="2" /><label htmlFor="2"><span>B</span>Satisfactory</label></li>
                            <li><input {...register("workBalance")} type="radio" value="challenging" id="3" /><label htmlFor="3"><span>C</span>Challenging</label></li>
                            <li><input {...register("workBalance")} type="radio" value="extremely-challenging" id="4" /><label htmlFor="4"><span>D</span>Extremely Challenging</label></li>
                            <li><input {...register("workBalance")} type="radio" value="unmanageable" id="5" /><label htmlFor="5"><span>E</span>Unmanageable</label></li>
                        </ul>
                    </div>
                    <div className="col-12">
                        <button type="submit" className="submit-btn"> Submit </button>
                    </div>
                </div>
            </form>
            <p>{userData}</p>
        </div>
    );
}

export default Form;