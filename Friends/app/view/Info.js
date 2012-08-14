/*
 * File: app/view/Info.js
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

Ext.define('Friends.view.Info', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.info',

    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    title: 'Info',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    height: 151,
                    layout: {
                        align: 'stretch',
                        type: 'hbox'
                    },
                    items: [
                        {
                            xtype: 'image',
                            id: 'profilePic',
                            maxWidth: 200
                        },
                        {
                            xtype: 'container',
                            flex: 3,
                            margins: '0 0 0 200px',
                            height: 60,
                            id: 'info',
                            tpl: [
                                '<h1>{name}</h1>',
                                '<h2>Mutual friends: {mutual_friends_count}</h2>'
                            ],
                            width: 140
                        }
                    ]
                },
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    id: 'statusesPanel',
                    title: 'Recent status updates',
                    hideHeaders: true,
                    store: 'Statuses',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'message',
                            flex: 1,
                            text: 'String'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    updateImage: function(src) {
        this.queryById('profilePic').setSrc(src);
    },

    updateInfo: function(friend) {
        this.queryById('info').update(friend.getData());
    }

});