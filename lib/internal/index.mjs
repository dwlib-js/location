import {
  RequireIntrinsic,
  UncurryThisIntrinsic
} from '#intrinsic';
import {
  IsArray,
  IsObject,
  ToDecimal,
  ToString
} from '#type';
import {
  GetInternalSlot,
  HasInternalSlot,
  RequireInternalSlot,
  SetInternalSlot
} from '#internal-slot';

const MathPI = RequireIntrinsic('Math.PI');
const MathAbs = RequireIntrinsic('Math.abs');
const MathAsin = RequireIntrinsic('Math.asin');
const MathCos = RequireIntrinsic('Math.cos');
const MathFloor = RequireIntrinsic('Math.floor');
const MathSin = RequireIntrinsic('Math.sin');
const MathSqrt = RequireIntrinsic('Math.sqrt');
const ObjectDefineProperties = RequireIntrinsic('Object.defineProperties');
const ReflectDefineProperty = RequireIntrinsic('Reflect.defineProperty');
const StringMatch = UncurryThisIntrinsic('String.prototype.match');
const Symbol = RequireIntrinsic('Symbol');
const SymbolHasInstance = RequireIntrinsic('@@hasInstance');
const SymbolToPrimitive = RequireIntrinsic('@@toPrimitive');
const SymbolToStringTag = RequireIntrinsic('@@toStringTag');
const TypeError = RequireIntrinsic('TypeError');

const $Latitude = Symbol('[[Latitude]]');
const $Longitude = Symbol('[[Longitude]]');

const DegreesToRadians = degrees => degrees * MathPI / 180;

const GetApproximateDistance = (latitude1, longitude1, latitude2, longitude2) => {
  const lat1 = DegreesToRadians(latitude1);
  const lat2 = DegreesToRadians(latitude2);
  const deltaLat = DegreesToRadians(latitude2 - latitude1);
  const deltaLon = DegreesToRadians(longitude2 - longitude1);
  const latSin = MathSin(deltaLat / 2);
  const lonSin = MathSin(deltaLon / 2);
  const haversine = (
    (latSin * latSin) + MathCos(lat1) * MathCos(lat2) * (lonSin * lonSin)
  );
  return MathAsin(MathSqrt(haversine)) * 12742e3;
}

const NormalizeCoordinates = (latitude, longitude) => {
  const quadrant = MathFloor(MathAbs(latitude) / 90) % 4;
  const pole = latitude > 0 ? 90 : -90;
  const offset = latitude % 90;
  switch (quadrant) {
    case 0: {
      latitude = offset;
      break;
    }
    case 1: {
      latitude = pole - offset;
      longitude += 180;
      break;
    }
    case 2: {
      latitude = -offset;
      longitude += 180;
      break;
    }
    case 3: {
      latitude = -pole + offset;
      break;
    }
  }
  if (longitude < -180 || longitude > 180) {
    longitude -= MathFloor((longitude + 180) / 360) * 360;
  }
  return [latitude, longitude];
}

const IsLocation = argument => (
  IsObject(argument) && HasInternalSlot(argument, $Latitude)
);

const LocationCoordinates = location => {
  const latitude = RequireInternalSlot(location, $Latitude);
  const longitude = GetInternalSlot(location, $Longitude);
  return [latitude, longitude];
}

const LocationDistanceTo = (location, destination) => {
  const latitude = RequireInternalSlot(location, $Latitude);
  const longitude = GetInternalSlot(location, $Longitude);
  if (!IsLocation(destination)) {
    throw new TypeError('destination is not an instance of Location');
  }
  const destinationLat = GetInternalSlot(destination, $Latitude);
  const destinationLon = GetInternalSlot(destination, $Longitude);
  return GetApproximateDistance(
    latitude, longitude, destinationLat, destinationLon
  );
}

const LocationLatitude = location => RequireInternalSlot(location, $Latitude);

const LocationLongitude = location => RequireInternalSlot(location, $Longitude);

const LocationToJSON = location => {
  const latitude = RequireInternalSlot(location, $Latitude);
  const longitude = GetInternalSlot(location, $Longitude);
  return {
    latitude,
    longitude
  };
}

const LocationToString = location => {
  const latitude = RequireInternalSlot(location, $Latitude);
  const longitude = GetInternalSlot(location, $Longitude);
  return `${latitude},${longitude}`;
}

class Location {
  static distanceBetween(latitude1, longitude1, latitude2, longitude2) {
    latitude1 = ToDecimal(latitude1);
    longitude1 = ToDecimal(longitude1);
    latitude2 = ToDecimal(latitude2);
    longitude2 = ToDecimal(longitude2);
    const location = NormalizeCoordinates(latitude1, longitude1);
    const destination = NormalizeCoordinates(latitude2, longitude2);
    return GetApproximateDistance(
      location[0], location[1], destination[0], destination[1]
    );
  }

  static from(input) {
    if (IsArray(input)) {
      return new Location(input[0], input[1]);
    }
    if (IsObject(input)) {
      return new Location(input.latitude, input.longitude);
    }
    input = ToString(input);
    const match = StringMatch(input, /^(\d+(?:\.\d+)?),(\d+(?:\.\d+)?)$/);
    if (!match) {
      throw new TypeError('Invalid location');
    }
    return new Location(match[1], match[2]);
  }

  constructor(latitude, longitude) {
    latitude = ToDecimal(latitude);
    longitude = ToDecimal(longitude);
    const location = NormalizeCoordinates(latitude, longitude);
    SetInternalSlot(this, $Latitude, location[0]);
    SetInternalSlot(this, $Longitude, location[1]);
  }

  get latitude() {
    return LocationLatitude(this);
  }

  get longitude() {
    return LocationLongitude(this);
  }

  coordinates() {
    return LocationCoordinates(this);
  }

  distanceTo(destination) {
    return LocationDistanceTo(this, destination);
  }

  toJSON() {
    return LocationToJSON(this);
  }

  toString() {
    return LocationToString(this);
  }
}
ObjectDefineProperties(Location, {
  MAX_LATITUDE: {
    value: 90
  },
  MAX_LONGITUDE: {
    value: 180
  },
  MIN_LATITUDE: {
    value: -90
  },
  MIN_LONGITUDE: {
    value: -180
  }
});
ReflectDefineProperty(Location, SymbolHasInstance, {
  value: IsLocation
});

const LocationDistanceBetween = Location.distanceBetween;
const LocationFrom = Location.from;
const LocationPrototype = Location.prototype;
const LocationPrototypeToString = LocationPrototype.toString;
ReflectDefineProperty(LocationPrototype, SymbolToPrimitive, {
  value: LocationPrototypeToString
});
ReflectDefineProperty(LocationPrototype, SymbolToStringTag, {
  value: 'Location'
});

export {
  IsLocation,
  Location,
  LocationCoordinates,
  LocationDistanceBetween,
  LocationDistanceTo,
  LocationFrom,
  LocationLatitude,
  LocationLongitude,
  LocationToJSON,
  LocationToString
};
