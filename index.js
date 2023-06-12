// Your code here
function createEmployeeRecord(data){
    return{
        firstName: data[0],
        familyName: data[1],
        title : data[2],
        payPerHour : data[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}
function createEmployeeRecords(Data){
return Data.map(employee => createEmployeeRecord(employee))

}
function createTimeInEvent(employeeData, time){
let [date, hour] = time.split(" ")
employeeData.timeInEvents.push({
    type : "TimeIn",
    date : date,
    hour: parseInt(hour,10)
})
 return employeeData   
}
function createTimeOutEvent(employeeData,time){
    let[date,hour] = time.split(" ")
    employeeData.timeOutEvents.push({
        type : "TimeOut",
        date : date,
        hour : parseInt(hour,10)
    }) 
    return employeeData
}
function hoursWorkedOnDate(employee, date){
    const timeInEvent = employee.timeInEvents.find(e => e.date === date)
    const timeOutEvent = employee.timeOutEvents.find(e => e.date === date)

    const startedHour = timeInEvent.hour
    const endedHour = timeOutEvent.hour
    return (endedHour - startedHour)/100
}
function allWagesFor(employee) {
    const wages = employee.timeInEvents.map((timeInEvent) => {
        const timeOutEvent = employee.timeOutEvents.find(
            (event) => event.date === timeInEvent.date
        );

        const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
        return hoursWorked * employee.payPerHour;
    });

    return wages.reduce((total, wage) => total + wage, 0);
}
function wagesEarnedOnDate(employee,date){
    const hoursWorked = hoursWorkedOnDate(employee, date)
    const payRate = employee.payPerHour
    const wagesEarned = hoursWorked * payRate
    return wagesEarned
}