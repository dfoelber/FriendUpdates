/*
 * File: app/controller/Friends.js
 *
 * This file was generated by Sencha Architect version 2.0.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Friends.controller.Friends', {
    extend: 'Ext.app.Controller',

    models: [
        'Friend'
    ],
    stores: [
        'Friends',
        'Statuses'
    ],
    views: [
        'Friends',
        'Info'
    ],

    refs: [
        {
            ref: 'infoPanel',
            selector: '#infoPanel'
        },
        {
            ref: 'friendsPanel',
            selector: '#friendsPanel'
        },
        {
            ref: 'statusesPanel',
            selector: '#statusesPanel'
        }
    ],

    onSearchFieldChange: function(field, newValue, oldValue, options) {
        var me = this,
            friends = me.getFriendsStore();

        if (Ext.isEmpty(newValue)) { 
            friends.clearFilter();
        } else {
            friends.filterBy(function(friend) {
                return friend.get('name').toLowerCase().search(newValue.toLowerCase()) > -1;
            });
        }
    },

    onFriendsPanelSelectionChange: function(tablepanel, selections, options) {
        var me = this,
            statuses = me.getStatusesStore(),
            friend;


        if (selections.length === 0) {
            return;
        }

        friend = selections[0];
        friend.getAll();
        this.updateInfoPanel(friend);

        me.getStatusesPanel().setLoading('Loading statuses');

        statuses.on('load', function() {
            me.getStatusesPanel().setLoading(false);
        }, me, {single: true});


            statuses.setUserId(friend.get('id'));
            statuses.load();


    },

    loadStore: function() {
        // This function is called only when the Facebook API is ready

        var me = this,
            friends = me.getFriendsStore();

        friends.on('load', function() {
            me.getFriendsPanel().setLoading(false);
        }, me, {single: true});

            friends.load();


    },

    init: function(application) {
        this.getFriendsStore().on({
            update: {
                fn: this.onFriendUpdate,
                scope: this
            }
        });

        this.control({
            "#search": {
                change: this.onSearchFieldChange
            },
            "#friendsPanel": {
                selectionchange: this.onFriendsPanelSelectionChange
            }
        });

        application.on({
            'fb:ready': {
                fn: this.loadStore,
                scope: this
            }
        });
    },

    onFriendUpdate: function(store, record, operation, modifiedFieldNames) {
        // This function is called when a model in the store is updated. 
        // We're doing this because Facebook API calls are asynchronous.

        var me = this;

        me.updateInfoPanel(record, modifiedFieldNames);

    },

    updateInfoPanel: function(friend, fields) {
        var me = this,
            infoPanel = me.getInfoPanel(),
            map = {
                'picture_url': function() {
                    infoPanel.updateImage(friend.get('picture_url'));
            },
            'name': function() {
                infoPanel.updateInfo(friend);
            },
            'mutual_friends_count': function(){
                infoPanel.updateInfo(friend);
            }
        };


        if (Ext.isArray(fields)) {
            Ext.Array.each(fields, function(field) {
                if (Ext.isFunction(map[field])) {
                    map[field].call(this);
                }
            });
        } else {
            Ext.Object.each(map, function(field, fn) {
                fn.call(this);
            });
        }

    }

});
