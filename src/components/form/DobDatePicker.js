import DatePicker from "react-datepicker";
import {MAXIMUM_DATE, MINIMUM_DATE} from "../constants/constant";
import {Controller, useForm} from "react-hook-form";

function DobDatePicker({dateFormat, name}) {
    const {control } = useForm();

    return (
        <>
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <DatePicker
                        placeholderText="Select date"
                        dateFormat={dateFormat}
                        minDate={new Date(MINIMUM_DATE)}
                        maxDate={new Date(MAXIMUM_DATE)}
                        onChange={(date) => field.onChange(date)}
                        selected={field.value}
                    />
                )}
            />
        </>
    );
}

export default DobDatePicker;
