import Datastore from 'nedb-promises'
const datastore = Datastore.create('/database/db.db')

export default datastore;