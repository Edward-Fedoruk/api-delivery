'use strict';

const { parseNumber } = require('../../utils');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    suggestions: ctx => {
        const { category, query, _limit } = ctx.query;

        return strapi.query('product').find({
            _limit: parseNumber(_limit, 10),
            'categories.slug_contains': category,
            'name_contains': query,
        });
    },

    pagination: async ctx => {
        const { page = 2, _limit = 2, _sort } = ctx.query
        const total = await strapi.services.product.count();
        const pages = Math.ceil(total / _limit);
        const from = (page - 1) * _limit + 1;
        const to = Math.max(Math.min(page * _limit, total), from);
        
        const query = {...ctx.query}
        delete query.page;
        delete query._limit;
        delete query._sort;

        const selectedProducts = await strapi.services.product.find({
            ...query,
            _limit: parseNumber(to, 12),
            _start: from,
        })

        console.log(selectedProducts)
        return { products: selectedProducts, total, pages, from, to};
        
    },

    popular: ctx => {
        const { _limit, category } = ctx.query;

        return strapi.query('product').find({
            _limit: parseNumber(_limit, 10),
            _sort: 'rating:DESC',
            'categories.slug_contains': category,
        });
    },

    discounted: ctx => {
        const { category, _limit } = ctx.query;

        return strapi.query('product').find({
            _limit: parseNumber(_limit, 10),
            'categories.slug_contains': category,
            'badges_eq': 'sale'
        });
    },
    related: async ctx => {
        const { _limit } = ctx.query;
        const product = await strapi.query('product').findOne({
            slug_eq: ctx.params.slug
        });

        const categories = product.categories.map(category => category.slug);

        return strapi.query('product').find({
            slug_ne: product.slug,
            _limit: parseNumber(_limit, 8),
            'categories.slug_in': categories,
        });
    },
    topRated: ctx => {
        const { category, _limit } = ctx.query;

        return strapi.query('product').find({
            _limit: parseNumber(_limit, 10),
            _sort: 'rating:DESC',
            'categories.slug_contains': category,
        });
    },
    latest: ctx => {
        const { category, _limit } = ctx.query;

        return strapi.query('product').find({
            _limit: parseNumber(_limit, 10),
            _sort: 'updated_at:DESC',
            'categories.slug_contains': category,
        });
    },
    featured: ctx => {
        const { category, _limit } = ctx.query;

        return strapi.query('product').find({
            _limit: parseNumber(_limit, 10),
            'categories.slug_contains': category,
        });
    }
};
