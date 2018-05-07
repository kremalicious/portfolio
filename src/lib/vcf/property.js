/**
 * vCard Property
 * @constructor
 * @memberOf vCard
 * @param {String} field
 * @param {String} value
 * @param {Object} params
 * @return {Property}
 */
function Property(field, value, params) {
  if (!(this instanceof Property)) return new Property(value)

  if (params != null) Object.assign(this, params)

  this._field = field
  this._data = value

  Object.defineProperty(this, '_field', { enumerable: false })
  Object.defineProperty(this, '_data', { enumerable: false })
}

/**
 * Constructs a vCard.Property from jCard data
 * @param  {Array} data
 * @return {Property}
 */
Property.fromJSON = function(data) {
  var field = data[0]
  var params = data[1]

  if (!/text/i.test(data[2])) params.value = data[2]

  var value = Array.isArray(data[3]) ? data[3].join(';') : data[3]

  return new Property(field, value, params)
}

/**
 * Turn a string into capitalized dash-case
 * @internal used by `Property#toString()`
 * @param  {String} value
 * @return {String}
 * @ignore
 */
function capitalDashCase(value) {
  return value.replace(/([A-Z])/g, '-$1').toUpperCase()
}

/**
 * Property prototype
 * @type {Object}
 */
Property.prototype = {
  constructor: Property,

  /**
   * Check whether the property is of a given type
   * @param  {String}  type
   * @return {Boolean}
   */
  is: function(type) {
    type = (type + '').toLowerCase()
    return Array.isArray(this.type)
      ? this.type.indexOf(type)
      : this.type === type
  },

  /**
   * Check whether the property is empty
   * @return {Boolean}
   */
  isEmpty: function() {
    return this._data == null && Object.keys(this).length === 0
  },

  /**
   * Clone the property
   * @return {Property}
   */
  clone: function() {
    return new Property(this._field, this._data, this)
  },

  /**
   * Format the property as vcf with given version
   * @param  {String} version
   * @return {String}
   */
  toString: function(version) { // eslint-disable-line no-unused-vars

    var propName =
      (this.group ? this.group + '.' : '') + capitalDashCase(this._field)
    var keys = Object.keys(this)
    var params = []

    for (var i = 0; i < keys.length; i++) {
      if (keys[i] === 'group') continue
      params.push(capitalDashCase(keys[i]) + '=' + this[keys[i]])
    }

    return (
      propName +
      (params.length ? ';' + params.join(';') : params) +
      ':' +
      (Array.isArray(this._data) ? this._data.join(';') : this._data)
    )
  },

  /**
   * Get the property's value
   * @return {String}
   */
  valueOf: function() {
    return this._data
  },

  /**
   * Format the property as jCard data
   * @return {Array}
   */
  toJSON: function() {
    var params = Object.assign({}, this)

    if (params.value === 'text') {
      params.value = void 0
      delete params.value
    }

    var data = [this._field, params, this.value || 'text']

    switch (this._field) {
      default:
        data.push(this._data)
        break
      case 'adr':
      case 'n':
        data.push(this._data.split(';'))
    }

    return data
  },
}

// Exports
module.exports = Property
