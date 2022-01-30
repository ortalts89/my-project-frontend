export function formatDate(isoDate){
    let date = new Date(isoDate);
    date = date.toDateString();
    return date;
}