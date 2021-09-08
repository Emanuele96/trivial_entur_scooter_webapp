import gql from 'graphql-tag';

export const getScooterQuery = gql`
    query vehicles($lat: Float!, $lon:Float!, $range: Int!, $count: Int) {
    vehicles(lat :$lat, lon : $lon, range: $range,count: $count){
        lat
        lon
        isReserved
        isDisabled
        currentRangeMeters
        system {
        name {
            translation {
            language value 
            }
        }
        }
    }
}
`;

