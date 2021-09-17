const User = require('./User');
const County = require('./county');
const Museum = require('./museum');
const Park = require('./park');

County.hasMany(Museum, {
    as: 'county_museum',
    constraints: false,
    allownull: true,
    defaultvalue: null
});

County.hasMany(Park, {
    as: 'county_park',
    constraints: false,
    allownull: true,
    defaultvalue: null
});
Museum.belongsTo(County, {
    foreignKey: 'museum_county'
});
Park.belongsTo(County, {
    foreignKey: 'park_county'
});



module.exports = { User, Park, Museum, County };