/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vh43sqcx3wkpism")

  collection.listRule = "@request.auth.id != \"\" && user.id ?= @request.auth.id"
  collection.viewRule = "@request.auth.id != \"\" && user.id ?= @request.auth.id"
  collection.createRule = "@request.auth.id != \"\" && user.id ?= @request.auth.id"
  collection.updateRule = "@request.auth.id != \"\" && user.id ?= @request.auth.id"
  collection.deleteRule = "@request.auth.id != \"\" && user.id ?= @request.auth.id"

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pnkhrkdf",
    "name": "user",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vh43sqcx3wkpism")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  // remove
  collection.schema.removeField("pnkhrkdf")

  return dao.saveCollection(collection)
})
