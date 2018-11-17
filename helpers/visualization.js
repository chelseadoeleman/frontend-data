const files = ("../data/obaMovieData.json").then(function(data) {
console.log(files)





})
// const filterAllData = Promise.all(files.map(url => d3.csv(url))).then(
//     values => {
//         const debtPerCountry = d3
//             .nest()
//             .key(d => d.TIME)
//             .rollup(v =>
//                 v.map(data => ({
//                     country: data.GEO,
//                     value: data.Value,
//                     unit: data.UNIT
//                 }))
//             )
//             .entries(values[0])
//             .filter(year => year.key > 2015);

//         console.log(debtPerCountry);
//     }
// )