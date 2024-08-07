import React, { useState } from "react";
import {
    Input,
    Popover,
    PopoverHandler,
    PopoverContent,
    Typography
} from "@material-tailwind/react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { es } from "date-fns/locale";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

const YearDropdown = ({ selectedYear, onChange }) => {
    const currentYear = new Date().getFullYear();
    const startYear = 1940;
    const years = Array.from(new Array(currentYear - startYear + 1), (_, index) => currentYear - index);

    return (
        <select
            className="border border-gray-300 rounded-md p-1 bg-tremor-background"
            value={selectedYear}
            onChange={(e) => onChange(Number(e.target.value))}
        >
            {years.map((year) => (
                <option key={year} value={year}>
                    {year}
                </option>
            ))}
        </select>
    );
};

const DatePicker = ({ label, onChange, name, error, value = "" }) => {
    const [date, setDate] = useState(value);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date());

    const handleDateChange = (newDate) => {
        setDate(newDate);
        onChange({ target: { name, value: newDate ? format(newDate, "PPP", { locale: es }) : "" } });
    };

    const handleYearChange = (year) => {
        setSelectedYear(year);
        setMonth(new Date(year, month.getMonth()));
    };

    const handleMonthChange = (newMonth) => {
        setMonth(newMonth);
    };

    return (
        <div className={value !== "" ? 'grid grid-cols-3 items-center px-2' : ''}>
            {value && (
                <Typography
                   variant="small"
                   color="blue-gray"
                   className="font-normal w-52"
                >
                    Fecha de nacimiento:
                </Typography>
            )}
            <Popover placement="bottom">
                <PopoverHandler>
                    <Input
                        label={label}
                        value={date ? format(date, "PPP", { locale: es }) : ""}
                        disabled={value != ""}
                        error={error}
                        required={value == ""}
                        readOnly                
                        className={`bg-tremor-background ${value != "" ? 'col-span-2' : ''}`}      
                    />
                </PopoverHandler>
                <PopoverContent>
                    <div className="p-2">
                        <YearDropdown selectedYear={selectedYear} onChange={handleYearChange} />
                    </div>
                    <DayPicker
                        mode="single"
                        required
                        selected={date}
                        onSelect={handleDateChange}
                        showOutsideDays
                        locale={es}
                        month={month}
                        onMonthChange={handleMonthChange}
                        className="border-0"
                        classNames={{
                            caption: "flex justify-center py-2 mb-4 relative items-center",
                            caption_label: "text-sm font-semibold text-gray-900",
                            nav: "flex items-center",
                            nav_button:
                                "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                            nav_button_previous: "absolute left-1.5",
                            nav_button_next: "absolute right-1.5",
                            table: "w-full border-collapse",
                            head_row: "flex font-medium text-gray-900",
                            head_cell: "m-0.5 w-9 font-normal text-sm",
                            row: "flex w-full mt-2",
                            cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                            day: "h-9 w-9 p-0 font-normal",
                            day_range_end: "day-range-end",
                            day_selected:
                                "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                            day_today: "rounded-md bg-gray-200 text-gray-900",
                            day_outside:
                                "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                            day_disabled: "text-gray-500 opacity-50",
                            day_hidden: "invisible",
                        }}
                        components={{
                            IconLeft: ({ ...props }) => (
                                <FontAwesomeIcon {...props} icon={faChevronLeft} />
                            ),
                            IconRight: ({ ...props }) => (
                                <FontAwesomeIcon {...props} icon={faChevronRight} />
                            ),
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default DatePicker;
