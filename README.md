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
import LocationFrom from '@dwlib/location/LocationFrom';
import LocationLatitude from '@dwlib/location/LocationLatitude';
import LocationLongitude from '@dwlib/location/LocationLongitude';
import LocationToJSON from '@dwlib/location/LocationToJSON';
import LocationToString from '@dwlib/location/LocationToString';
```

## API
- *class* Location
  - *static* MAX_LATITUDE
  - *static* MAX_LONGITUDE
  - *static* MIN_LATITUDE
  - *static* MIN_LONGITUDE
  - *static* distanceBetween(latitude1, longitude1, latitude2, longitude2)
  - *static* from(input)
  - constructor(latitude, longitude)
  - *get* latitude
  - *get* longitude
  - coordinates()
  - distanceTo(destination)
  - toJSON()
  - toString()

### Builtins
- IsLocation(argument)
- LocationCoordinates(location)
- LocationDistanceBetween(latitude1, longitude1, latitude2, longitude2)
- LocationDistanceTo(location, destination)
- LocationFrom(input)
- LocationLatitude(location)
- LocationLongitude(location)
- LocationToJSON(location)
- LocationToString(location)
