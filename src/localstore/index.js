import Datastore from 'lowdb' //数据库
import LodashId from 'lodash-id'  //操作数据库中基于id的数据
import LocalStorage from 'lowdb/adapters/LocalStorage'

const adapter = new LocalStorage('db')
const db = Datastore(adapter)
db._.mixin(LodashId)

function setValue (key,value) {
  db.set(key,value).write();
}

function getValue(key) {
  return db.get(key).value();
}

function insert(table,item) {
  db.get(table).push(item).write();
}
function list(table,query) {
  return db.get(table).find(query).value();
}

export default {setValue,getValue};
