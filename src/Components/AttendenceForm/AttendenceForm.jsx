import React, { useState, useEffect } from "react";
import moment from "moment";
import "./AttendenceForm.css";
import CountUp from "react-countup";

const AttendenceForm = () => {
  const storedAttendance = JSON.parse(localStorage.getItem("attendance"));
  const [attendance, setAttendance] = useState(
    storedAttendance || Array(31).fill({ status: 4, time: "" })
  ); // Default value is (Absent)
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("attendance", JSON.stringify(attendance));
  }, [attendance]);

  const handleChange = (index, value) => {
    const updatedAttendance = [...attendance];
    const currentTime = new Date();
    const selectedTime = formatTime(currentTime);

    updatedAttendance[index] = {
      status: value,
      time: value === 2 ? selectedTime : "",
    };
    setAttendance(updatedAttendance);
  };

  const formatTime = (time) => {
    const hour = time.getHours() % 12 || 12;
    const minute = time.getMinutes().toString().padStart(2, "0");
    const second = time.getSeconds().toString().padStart(2, "0");
    const ampm = time.getHours() >= 12 ? "PM" : "AM";
    return `${hour}:${minute}:${second} ${ampm}`;
  };

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const month = moment.months()[currentTime.getMonth()]; // Get the current month
  const totalDays = moment(currentTime).daysInMonth(); // Get the total number of days in the current month

  const presentDays = attendance.filter((item) => item.status === 2).length;
  const absentDays = attendance.filter((item) => item.status === 1).length;
  const vacationDays = attendance.filter((item) => item.status === 3).length;

  const getStatusBackgroundColor = (status) => {
    switch (status) {
      case 2: // Present
        return "rgba(0, 128, 0, 0.5)"; // Green with 60% opacity
      case 1: // Absent
        return "rgba(255, 0, 0, 0.4)"; // Red with 60% opacity
      case 3: // Vacation
        return "rgba(255, 165, 0, 0.5)"; // Orange with 60% opacity
      case 4: // Vacation
        return "rgba(255, 255, 255, 0.3)"; // White with 60% opacity
      default:
        return ""; // White with 60% opacity
    }
  };

  const handleReset = () => {
    localStorage.removeItem("attendance");
    setAttendance(Array(31).fill({ status: 4, time: "" }));
  };

  return (
    <div className="office-background pb-56">
      <div className="w-1/2 mx-auto mt-5 shadow-2xl shadow-black p-5 pb-20 pt-6">
        <div>
          {/* clock ui here */}
          <div className="flex justify-between">
            <div className="mb-10 flex flex-col justify-start items-start ms-11 text-white">
              <div className="text-6xl font-bold">
                {formatTime(currentTime)}
              </div>
              <div className="text-2xl font-bold mt-3">
                {formatDate(currentTime)}
              </div>
            </div>
            <div>
              <p className="text-white text-lg font-bold">Employe Name:</p>
              <p className="text-white text-lg font-bold">Employe ID:</p>
            </div>
          </div>
          <div className="pb-5 mb-4 text-rose-200">
            <p className="text-4xl font-bold text-white border-text2 mb-2">
              Running Month {month}
            </p>
            <p className="text-3xl font-bold text-white border-text2 mb-2">
              Total days: {totalDays}
            </p>
            <div>
              <div className="text-2xl font-extrabold flex justify-center gap-10 mb-2 text-white border-text2">
                <p>Present: {presentDays}</p>
                <p>Absent: {absentDays}</p>
                <p>Vacation: {vacationDays}</p>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gridGap: "25px",
            justifyContent: "center",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          {attendance.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: getStatusBackgroundColor(item.status),
                color: "white",
                position: "relative",
                borderRadius: "5px", // Rounded corners
                fontWeight: "bold", // Bold font
                height: "70px",
                width: "130px",
              }}
            >
              {index + 1}
              <select
                value={item.status}
                onChange={(e) =>
                  handleChange(index, parseInt(e.target.value))
                }
                style={{
                  position: "absolute",
                  top: "50%",
                  right: 0,
                  transform: "translateY(-50%)",
                  zIndex: 1,
                  backgroundColor: "transparent",
                  color: "transparent",
                  appearance: "none",
                  cursor: "pointer",
                  border: "none",
                }}
              >
                <option
                  value={1}
                  style={{ backgroundColor: "red", color: "black" }}
                >
                  Absent
                </option>
                <option
                  value={2}
                  style={{ backgroundColor: "green", color: "black" }}
                >
                  Present
                </option>
                <option
                  value={3}
                  style={{ backgroundColor: "orange", color: "black" }}
                >
                  Vacation
                </option>
              </select>
              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                }}
              >
                &#9662;
              </span>
              {item.status === 2 && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "-15px",
                    fontSize: "10px",
                    color: "white",
                  }}
                >
                  {item.time}
                </div>
              )}
            </div>
          ))}
        </div>
        <button className="btn btn-outline text-white hover:bg-transparent hover:text-gray-500" onClick={handleReset}>Reset Data</button>
      </div>
    </div>
  );
};

export default AttendenceForm;
