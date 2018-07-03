export class GeoPosition {
    latitude;
    longitude;

    constructor() {}

    setLatitude(value){
        this.latitude = value;
    }

    getLatitude(){
        return this.latitude;
    }

    setLongitude(value){
        this.longitude = value;
    }

    getLongitude(){
        return this.longitude;
    }
}