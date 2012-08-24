/*
    Collection:Locations
    --------------------

    @file       Locations.js
    @package    Kords/Collection
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['Collection/AppCollection', 'Model/Location'],
    function(AppCollection, Location) {
        var LocationsCollection = AppCollection.extend({
            model: Location,
            url:   '/json/locations'
        });

        return LocationsCollection;
    }
)