/*
    Collection:Rentbands
    --------------------

    @file       Rentbands.js
    @package    Kords/Collection
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['Collection/AppCollection', 'Model/Rentband'],
    function(AppCollection, Rentband) {
        var RentbandsCollection = AppCollection.extend({
            model: Rentband,
            url: '/json/rent_bands'
        });

        return RentbandsCollection;
    }
)