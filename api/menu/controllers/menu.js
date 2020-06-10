'use strict';

const { generateDepthArray, getModelByNesting } = require('../../utils');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
	find: ctx => {
		const { depth = 0 } = ctx.query;
		return strapi
			.query('menu')
			.find({}, generateDepthArray(parseInt(depth, 10)))
	},

	findOne: ctx => {
		const { depth = 0, nestLevel } = ctx.query;
		const { id } = ctx.params;
		console.log(depth, id, nestLevel)

		return strapi
			.query(getModelByNesting(nestLevel))
			.findOne({ slug: id }, generateDepthArray(parseInt(depth, 10)))
	}
};
