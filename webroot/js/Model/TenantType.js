/*
    Model:TenantType
    ----------

    @file     TenantType.js
    @package  Kords/Model
    @author   Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['Backbone/relational', 'Model/AppModel'],
    function(Backbone, AppModel) {
        var TenantType = AppModel.extend({
            name: 'TenantType',
            url: '/json/tenant_types'
        });

        return TenantType;
    }
);