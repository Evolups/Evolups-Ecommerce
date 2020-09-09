// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:56890/api',
  keyLoginLocalStorage: 'e-commerce',

  tipoLogueo: {
    Facebok: 1,
    Google: 2,
    User: 3
  },
  currentUser: JSON.parse(localStorage.getItem('e-commerce')) // Debe tener el mismo valor que la variable keyLoginLocalStorage
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
