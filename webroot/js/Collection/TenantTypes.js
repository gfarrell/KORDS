/*
    Collection:TenantTypes
    --------------------

    @file       TenantTypes.js
    @package    Kords/Collection
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['Collection/AppCollection', 'Model/TenantType'],
    function(AppCollection, TenantType) {
        var TenantTypesCollection = AppCollection.extend({
            model: TenantType,
            url:   '/json/tenant_types'
        });

        return TenantTypesCollection;
    }
)