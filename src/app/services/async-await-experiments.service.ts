// // Alternatieve manier: gaan we nu niet gebruiken
// initialize() {
//   console.log( 'Initializing app data ... with apiUrl: ' + this.apiUrl);
//   this.getSettingsBasedOnEnvironment()
//     .then(data => {
//       this.apiEindcontroleStatusUrl = data.eindcontroleStatusUrl;
//       console.log( 'Initializing app data ... DONE!' + this.apiEindcontroleStatusUrl);
//     })
//     .catch(error => {
//       console.log('Error: cannot retrieve the settings: ', error.message);
//     });
//   console.log( 'Initializing ENDING app data ... with apiUrl: ' + this.apiUrl);
// }
//
// // Method 1 - zonder async/await
// load() :Promise<any>  {
//   const promise = this.httpClient.get<Settings>(this.apiUrl + '/settings')
//     .toPromise()
//     .then(data => {
//       Object.assign(this, data);
//       console.log( 'setting the eindcontrolestatus: ' + data.eindcontroleStatusUrl);
//       this.apiEindcontroleStatusUrl = data.eindcontroleStatusUrl;
//       return data;
//     });
//   return promise;
// }
//
// // Method 2 - met async/await
// load2() :Promise<any> {
//   const promise = this.getSettingsBasedOnEnvironment()
//     .then(data => {
//       Object.assign(this, data);
//       console.log( 'setting the eindcontrolestatus: ' + data.eindcontroleStatusUrl);
//       this.apiEindcontroleStatusUrl = data.eindcontroleStatusUrl;
//       return data;
//     });
//   return promise;
// }
