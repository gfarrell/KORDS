/*
    Model:TenantType
    ----------

    @file     TenantType.js
    @package  Kords/Model
    @author   Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['Backbone/relational'],
    function(Backbone) {
        var TenantType = Backbone.RelationalModel.extend({
            url: '/json/tenant_types'
        });

        return TenantType;
    }
);