trigger SalaryDeductionTrigger on Employee__c (before insert,before update) {
    Map<Id, Employee__c> employeesToUpdate = new Map<Id, Employee__c>();

    for (Employee__c employee : Trigger.new) {
        if (employee.Leave_Type__c == 'Hourly') {
            Decimal leaveDuration = employee.Leave_in_Hours__c;  // Assuming 8 hours per day
            Decimal hourlyRate = employee.Salary__c / 30 / 8;  // Assuming 30 working days in a month and 8 hours per day
            Decimal deduction = leaveDuration * hourlyRate;

            employee.Salary_Deduction__c = deduction;
        } else if (employee.Leave_Type__c == 'Daily') {
            Decimal deduction = employee.Leave_Days__c * (employee.Salary__c / 30);

            employee.Salary_Deduction__c = deduction;
        }

        employeesToUpdate.put(employee.Id, employee);
    }

}