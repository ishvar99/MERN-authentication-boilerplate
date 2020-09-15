const redis = require("redis")
const mongoose = require("mongoose")
const util = require("util")

const redisUrl =
  "redis://redis-19065.c232.us-east-1-2.ec2.cloud.redislabs.com:19065"
const client = redis.createClient({
  port: 19065,
  host: "redis-19065.c232.us-east-1-2.ec2.cloud.redislabs.com",
  password: "nMIPvueeljOLErB3kpwmCOVYZaCeuZSj",
})
client.on("connect", function () {
  console.log("Connected to Redis Server".cyan.bold.underline)
})
client.on("error", function (err) {
  console.log(`Redis Error: ${err}`.red)
})
client.hget = util.promisify(client.hget)
const exec = mongoose.Query.prototype.exec

mongoose.Query.prototype.cache = function (options = {}) {
  this._cache = true
  this._hashKey = JSON.stringify(options.key || "")
  return this
}
mongoose.Query.prototype.exec = async function () {
  if (!this._cache) return exec.apply(this, arguments)
  const key = JSON.stringify(
    Object.assign({}, this.getFilter(), {
      collection: this.mongooseCollection.name,
    })
  )

  const cacheValue = await client.hget(this._hashKey, key)
  // console.log(cacheValue)
  if (cacheValue) {
    console.log("Serving cached data...")
    const doc = new this.model(JSON.parse(cacheValue))
    return Array.isArray(doc)
      ? doc.map((d) => new this.model(d))
      : new this.model(doc)
  }

  const result = await exec.apply(this, arguments)
  client.hmset(this._hashKey, key, JSON.stringify(result), "EX", 100)
  return result
}
module.exports = {
  clearHash(hashKey) {
    client.del(JSON.stringify(hashKey))
  },
}
