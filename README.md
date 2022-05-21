# Location API

## Abstract
The module for implementing location representation based on latitude and
longitude coordinates.

## Install
`npm i --save @dwlib/location`

## Usage
```javascript
// CJS
const Location = require('@dwlib/location');
const IsLocation = require('@dwlib/location/IsLocation');
const LocationCoordinates = require('@dwlib/location/LocationCoordinates');
const LocationDistanceBetween = require('@dwlib/location/LocationDistanceBetween');
const LocationDistanceTo = require('@dwlib/location/LocationDistanceTo');
const LocationEquals = require('@dwlib/location/LocationEquals');
const LocationFrom = require('@dwlib/location/LocationFrom');
const LocationLatitude = require('@dwlib/location/LocationLatitude');
const LocationLongitude = require('@dwlib/location/LocationLongitude');
const LocationToJSON = require('@dwlib/location/LocationToJSON');
const LocationToString = require('@dwlib/location/LocationToString');
// ESM
import Location, {
  IsLocation,
  LocationCoordinates,
  LocationDistanceBetween,
  LocationDistanceTo,
  LocationEquals,
  LocationFrom,
  LocationLatitude,
  LocationLongitude,
  LocationToJSON,
  LocationToString
} from '@dwlib/location';
import IsLocation from '@dwlib/location/IsLocation';
import LocationCoordinates from '@dwlib/location/LocationCoordinates';
import LocationDistanceBetween from '@dwlib/location/LocationDistanceBetween';
import LocationDistanceTo from '@dwlib/location/LocationDistanceTo';
import LocationEquals from '@dwlib/location/LocationEquals';
import LocationFrom from '@dwlib/location/LocationFrom';
import LocationLatitude from '@dwlib/location/LocationLatitude';
import LocationLongitude from '@dwlib/location/LocationLongitude';
import LocationToJSON from '@dwlib/location/LocationToJSON';
import LocationToString from '@dwlib/location/LocationToString';
```

## API
- `class Location`
  - `static MAX_LATITUDE = 90`
  - `static MAX_LONGITUDE = 180`
  - `static MIN_LATITUDE = -90`
  - `static MIN_LONGITUDE = -180`
  - `static distanceBetween(latitude1: number, longitude1: number, latitude2: number, longitude2: number) => number`
  - `static from(input: string | Array<latitude: number, longitude: number> | {
      latitude: number,
      longitude: number
    }) => Location`
  - `constructor(latitude: number, longitude: number)`
  - `get latitude => number`
  - `get longitude => number`
  - `coordinates() => Array<latitude: number, longitude: number>`
  - `distanceTo(destination: Location) => number`
  - `equals(other: any) => boolean`
  - `toJSON() => {
      latitude: number,
      longitude: number
    }`
  - `toString() => string`

### Builtins
- `IsLocation(argument: any) => boolean`
- `LocationCoordinates(location: Location) => Array<latitude: number, longitude: number>`
- `LocationDistanceBetween(latitude1: number, longitude1: number, latitude2: number, longitude2: number) => number`
- `LocationDistanceTo(location: Location, destination: Location) => number`
- `LocationEquals(location: Location, other: any) => boolean`
- `LocationFrom(nput: string | Array<latitude: number, longitude: number> | {
    latitude: number,
    longitude: number
  }) => Location`
- `LocationLatitude(location: Location) => number`
- `LocationLongitude(location: Location) => number`
- `LocationToJSON(location: Location) => {
    latitude: number,
    longitude: number
  }`
- `LocationToString(location: Location) => string`
