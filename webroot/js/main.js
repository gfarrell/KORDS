/*
    KORDS - King's Online Room Database System
    ------------------------------------------

    @author    Gideon Farrell <me@gideonfarrell.co.uk>
    @url       http://github.com/gfarrell/KORDS
    @license   GNU General Public License v3.0 http://opensource.org/licenses/GPL-3.0

    Copyright (C) 2012 Gideon Farrell

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
 */



// Basic configuration
require.config({
    baseUrl: '/js',
    paths: {
        'Backbone':   'Lib/Backbone',
        'backbone':   'Lib/Backbone/backbone',
        'underscore': 'Lib/underscore',
        'jquery':     'Lib/jQuery/jquery-1.8.0',
        'bootstrap':  'Lib/Bootstrap',
        'mootools':   'Lib/Mootools',
        'text':       'Lib/Require/text'
    }
});

// Initialise application