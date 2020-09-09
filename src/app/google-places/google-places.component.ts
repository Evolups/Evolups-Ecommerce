 
import { Component, OnInit, ViewChild, ElementRef, NgZone  } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MapsAPILoader, MouseEvent } from '@agm/core';
/* import {} from '@types/googlemaps'; */
declare var google: any;




@Component({
  selector: 'app-google-places',
  templateUrl: './google-places.component.html',
  styleUrls: ['./google-places.component.css']
})
export class GooglePlacesComponent implements OnInit {

  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  distancia:number;
  tiempo:number;
  zoom: number;
  address: string;
  private geoCoder;

        // parque simon bolivar
  origin:any= { lat: 18.50581169 , lng:  -69.98095703 };
        // Parque la 93
  destination:any=  { lat:  18.5159988, lng: -69.8280204};
      
        
  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }


  ngOnInit(): void {
   

     //load Places Autocomplete
     this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

 /*      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);

       */

      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement,
        {
            componentRestrictions: { country: 'do' }
     
        });
      autocomplete.addListener("place_changed", () => {

        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          
  
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });


 this.getDistancia(this.origin,this.destination);

  }

  
  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }



  
  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }


   calculateRoute() {
    console.log("localizacion");

    google.maps.DirectionsService().route({

      origin: this.origin,
      destination: this.destination,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (response, status)  => {
      if (status === google.maps.DirectionsStatus.OK) {
        google.maps.DirectionsService().setDirections(response);
      } else {
        alert('no ento');
      }
    });
    }


    public getDistancia(origen: string, destino: string) {
      return new google.maps.DistanceMatrixService().getDistanceMatrix({
      'origins': [origen], 
      'destinations': [destino], 
      travelMode: 'DRIVING'}, 
      (results: any) => {
          console.log('resultados distancia (mts) -- ', results.rows[0].elements[0].distance.text);
          console.log('tiempo-- ', results.rows[0].elements[0].duration.text);
          console.log('resultados -- ', results.rows[0]);
          this.distancia=results.rows[0].elements[0].distance.text;
          this.tiempo=results.rows[0].elements[0].duration.text;
      });
  }



}
