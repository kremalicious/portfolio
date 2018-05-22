/* eslint-disable no-unused-vars */

/**
 * vCard
 * @constructor
 * @return {vCard}
 */
function vCard() {
  if (!(this instanceof vCard)) return new vCard()

  /** @type {String} Version number */
  this.version = vCard.versions[vCard.versions.length - 1]
  /** @type {Object} Card data */
  this.data = {}
}

/**
 * vCard MIME type
 * @type {String}
 */
vCard.mimeType = 'text/vcard'

/**
 * vCard file extension
 * @type {String}
 */
vCard.extension = '.vcf'

/**
 * vCard versions
 * @type {Array}
 */
vCard.versions = ['2.1', '3.0', '4.0']

/**
 * Folds a long line according to the RFC 5322.
 * @see http://tools.ietf.org/html/rfc5322#section-2.1.1
 * @param  {String}  input
 * @param  {Number}  maxLength
 * @param  {Boolean} hardWrap
 * @return {String}
 */
vCard.foldLine = require('foldline')

/**
 * Normalizes input (cast to string, line folding, whitespace)
 * @param  {String} input
 * @return {String}
 */
vCard.normalize = function(input) {
  return (
    (input + '')
      // Trim whitespace
      .replace(/^[\s\r\n]+|[\s\r\n]+$/g, '')
      // Trim blank lines
      .replace(/(\r?\n)\s*(\r?\n)|$/g, '$1')
      // Unfold folded lines
      .replace(/\r?\n[\x20\x09]+/g, '') // eslint-disable-line no-control-regex
  )
}

/**
 * Check whether a given version is supported
 * @param  {String} version
 * @return {Boolean}
 */
vCard.isSupported = function(version) {
  return /^\d\.\d$/.test(version) && vCard.versions.indexOf(version) !== -1
}

/**
 * Parses a string or buffer into a vCard object
 * @param  {String|Buffer} value
 * @return {Array<vCard>}
 */
vCard.parse = function(value) {
  var objects = (value + '').split(/(?=BEGIN\:VCARD)/gi) // eslint-disable-line no-useless-escape
  var cards = []

  for (var i = 0; i < objects.length; i++) {
    cards.push(new vCard().parse(objects[i]))
  }

  return cards
}

/**
 * Parse an array of vcf formatted lines
 * @internal used by `vCard#parse()`
 * @type {Function}
 */
vCard.parseLines = require('./parse-lines')

/**
 * Constructs a vCard from jCard data
 * @param  {Array} jcard
 * @return {vCard}
 */
vCard.fromJSON = function(jcard) {
  jcard = typeof jcard === 'string' ? JSON.parse(jcard) : jcard

  if (jcard == null || !Array.isArray(jcard)) return new vCard()

  if (!/vcard/i.test(jcard[0])) throw new Error('Object not in jCard format')

  var card = new vCard()

  jcard[1].forEach(function(prop) {
    card.addProperty(vCard.Property.fromJSON(prop))
  })

  return card
}

/**
 * Format a card object according to the given version
 * @param  {vCard}  card
 * @param  {String} version
 * @return {String}
 */
vCard.format = function(card, version) {
  version = version || card.version || vCard.versions[vCard.versions.length - 1]

  if (!vCard.isSupported(version))
    throw new Error('Unsupported vCard version "' + version + '"')

  var vcf = []

  vcf.push('BEGIN:VCARD')
  vcf.push('VERSION:' + version)

  var props = Object.keys(card.data)
  var prop = ''

  for (var i = 0; i < props.length; i++) {
    if (props[i] === 'version') continue
    prop = card.data[props[i]]
    if (Array.isArray(prop)) {
      for (var k = 0; k < prop.length; k++) {
        if (prop[k].isEmpty()) continue
        vcf.push(vCard.foldLine(prop[k].toString(version), 75))
      }
    } else if (!prop.isEmpty()) {
      vcf.push(vCard.foldLine(prop.toString(version), 75))
    }
  }

  vcf.push('END:VCARD')

  return vcf.join('\n')
}

// vCard Property constructor
vCard.Property = require('./property')

/**
 * vCard prototype
 * @type {Object}
 */
vCard.prototype = {
  constructor: vCard,

  /**
   * Get a vCard property
   * @param  {String} key
   * @return {Object|Array}
   */
  get: function(key) {
    if (this.data[key] == null) {
      return this.data[key]
    }

    if (Array.isArray(this.data[key])) {
      return this.data[key].map(function(prop) {
        return prop.clone()
      })
    } else {
      return this.data[key].clone()
    }
  },

  /**
   * Set a vCard property
   * @param {String} key
   * @param {String} value
   * @param {Object} params
   */
  set: function(key, value, params) {
    return this.setProperty(new vCard.Property(key, value, params))
  },

  /**
   * Add a vCard property
   * @param {String} key
   * @param {String} value
   * @param {Object} params
   */
  add: function(key, value, params) {
    var prop = new vCard.Property(key, value, params)
    this.addProperty(prop)
    return this
  },

  /**
   * Set a vCard property from an already
   * constructed vCard.Property
   * @param {vCard.Property} prop
   */
  setProperty: function(prop) {
    this.data[prop._field] = prop
    return this
  },

  /**
   * Add a vCard property from an already
   * constructed vCard.Property
   * @param {vCard.Property} prop
   */
  addProperty: function(prop) {
    var key = prop._field

    if (Array.isArray(this.data[key])) {
      this.data[key].push(prop)
    } else if (this.data[key] != null) {
      this.data[key] = [this.data[key], prop]
    } else {
      this.data[key] = prop
    }

    return this
  },

  /**
   * Parse a vcf formatted vCard
   * @param  {String} value
   * @return {vCard}
   */
  parse: function(value) {
    // Normalize & split
    var lines = vCard.normalize(value).split(/\r?\n/g)

    // Keep begin and end markers
    // for eventual error messages
    var begin = lines[0]
    var version = lines[1]
    var end = lines[lines.length - 1]

    if (!/BEGIN:VCARD/i.test(begin))
      throw new SyntaxError(
        'Invalid vCard: Expected "BEGIN:VCARD" but found "' + begin + '"'
      )

    if (!/END:VCARD/i.test(end))
      throw new SyntaxError(
        'Invalid vCard: Expected "END:VCARD" but found "' + end + '"'
      )

    // TODO: For version 2.1, the VERSION can be anywhere between BEGIN & END
    if (!/VERSION:\d\.\d/i.test(version))
      throw new SyntaxError(
        'Invalid vCard: Expected "VERSION:\\d.\\d" but found "' + version + '"'
      )

    this.version = version.substring(8, 11)

    if (!vCard.isSupported(this.version))
      throw new Error('Unsupported version "' + this.version + '"')

    this.data = vCard.parseLines(lines)

    return this
  },

  /**
   * Format the vCard as vcf with given version
   * @param  {String} version
   * @param  {String} charset
   * @return {String}
   */
  toString: function(version, charset) {
    version = version || this.version
    return vCard.format(this, version)
  },

  /**
   * Format the card as jCard
   * @param {String} version='4.0'
   * @return {Array} jCard
   */
  toJCard: function(version) {
    version = version || '4.0'

    var keys = Object.keys(this.data)
    var data = [['version', {}, 'text', version]]
    var prop = null

    for (var i = 0; i < keys.length; i++) {
      if (keys[i] === 'version') continue
      prop = this.data[keys[i]]
      if (Array.isArray(prop)) {
        for (var k = 0; k < prop.length; k++) {
          data.push(prop[k].toJSON())
        }
      } else {
        data.push(prop.toJSON())
      }
    }

    return ['vcard', data]
  },

  /**
   * Format the card as jCard
   * @return {Array} jCard
   */
  toJSON: function() {
    return this.toJCard(this.version)
  }
}

// Exports
module.exports = vCard
