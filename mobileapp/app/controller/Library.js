﻿Ext.define('App.controller.Library', {
    extend: 'Ext.app.Controller',
    requires: ['Ext.Panel'],

    config: {
        refs: {
            nav: {
                selector: '[xtype="nav"]'
            },
            booksList: {
                xtype: 'librarybooks',
                selector: 'librarybooks[action="library"]'
            }
        },
        control: {
            booksList: {
                activate: 'onBooksShow'
            }
            //map: {
            //    centerchange: 'onMapPan',
            //    activate: 'onMapActivate',
            //    maprender: 'onMapRender',
            //    zoomchange: 'onMapZoomChange',
            //    painted: 'initMap'
            //},           
            //bookButton: {
            //    tap: 'onBookButtonTap'
            //},
            //locateButton: {
            //    tap: 'locateUser'
            //},          
            //nav: {
            //}
        }
    },

    onBooksShow: function () {
        var library = this.library;
        //this.getBooksList().setLoading();
        App.Api.getBooksByLatLng(library.Library_Geolocation__c.latitude, library.Library_Geolocation__c.longitude, this.onBooksLoaded, Ext.emptyFn, this);
    },

    onBooksLoaded: function (response) {
        var devices = response.devices;
        var store = Ext.getStore("Book");
        store.removeAll();
        for (i = 0; i < devices.length; i++) {

            var book = Util.parseM2XBook(devices[i])
            store.add(book);
        }
        console.log(store);
    },
    showLibrary: function (library) {
        var nav = this.getApplication().getController('Navigation');
        this.library = library;
        nav.push(Ext.create('App.view.LibraryTabs', {
            record: library
        }));
    }
});