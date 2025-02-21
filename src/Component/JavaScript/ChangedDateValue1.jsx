const ChangedDateValue = (dateInput) => {
    const date = new Date(dateInput);

    const options = {  month: 'long' ,year: 'numeric'};
    const formattedDate = date.toLocaleDateString('default', options);

    return formattedDate;
}
export default ChangedDateValue ;