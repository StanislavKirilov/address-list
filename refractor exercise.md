# Refractor exercise

The following code creates a funciton which returns an array with 6 months which returns the following month together with 3 months after it and 2 months before

### Errors found and code optimisation

*  On Line 16 we declare mnth_index which points to the month of interest and it can be used in the statemets bellow instead of calling it every time since we have the variable declared.
*  On Line 28 in the for loop the condition should be changed to k >= 3, otherwise in throws only 5 months for March instead of 6
*  On Line 41 there was a typo, the function should have been month_arr.indexOf(selected_month)
*  On Line 42 Instead of mon.push(mon[0]) should be mon.push(month_arr[0])
