import React, { useEffect } from "react";

export const EmployeeAnalysis = ({ fileData }) => {
  useEffect(() => {
    analyzeEmployeeData(fileData);
  }, [fileData]);

  const analyzeEmployeeData = (data) => {
    // Function to calculate the consecutive days worked
    const getConsecutiveDaysWorked = (employeeData) => {
      let consecutiveDays = 0;

      for (let i = 1; i < employeeData.length; i++) {
        const currentDay = employeeData[i][2];
        const previousDay = employeeData[i - 1][2];

        if (currentDay - previousDay === 1) {
          consecutiveDays++;
        } else {
          consecutiveDays = 0;
        }

        if (consecutiveDays === 6) {
          console.log(
            `Employee ${employeeData[i][7]} worked for 7 consecutive days.`
          );
        }
      }
    };

    // Function to find employees with less than 10 hours between shifts
    const getLessThan10HoursBetweenShifts = (employeeData) => {
      for (let i = 1; i < employeeData.length; i++) {
        const currentDay = employeeData[i][2];
        const previousDay = employeeData[i - 1][3];

        const timeDifference = currentDay - previousDay;

        if (timeDifference > 1 && timeDifference < 10) {
          console.log(
            `Employee ${employeeData[i][7]} has less than 10 hours between shifts.`
          );
        }
      }
    };

    // Function to find employees who worked more than 14 hours in a single shift
    const getMoreThan14HoursInSingleShift = (employeeData) => {
      for (let i = 0; i < employeeData.length; i++) {
        const timecardHours = parseFloat(employeeData[i][4].split(":")[0]);
      

        if (timecardHours > 14) {
          console.log(
            `Employee ${employeeData[i][7]} worked more than 14 hours in a single shift.`
          );
        }
      }
    };

    // Group data by EmployeeName
    const groupedData = {};
    data.forEach((entry) => {
      const employeeName = entry.EmployeeName;
      if (!groupedData[employeeName]) {
        groupedData[employeeName] = [];
      }
      groupedData[employeeName].push(entry);
    });

    // Analyze each employee's data
    Object.values(groupedData).forEach((employeeData) => {
      getConsecutiveDaysWorked(employeeData);
      getLessThan10HoursBetweenShifts(employeeData);
      getMoreThan14HoursInSingleShift(employeeData);
    });
  };

  return <div>Employee Analysis Console</div>;
};


