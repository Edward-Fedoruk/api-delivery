'use strict';

const { parseNumber } = require('../../utils');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

 const DEPENDENCY = ['categories', 'product_attributes', 'product_attributes.category'];

function populate(product) {

    console.log(product);

    const attributeCategories = {};

    const filteredObject = product.product_attributes.reduce((acc, element) => {
        if (acc[element.category.slug]) {
            acc[element.category.slug].push(element.slug);
        } else {
            acc[element.category.slug] = [ element.slug ];
        }

        if (!attributeCategories[element.category.slug]) {
            attributeCategories[element.category.slug] = element.category;
        }

        return acc;
    }, {});

    const attributes = [
        product.colors && product.colors.length && { slug: 'color', values: product.colors.map(x => x.name) },
        ...Object.entries(filteredObject)
            .map(([slug, values]) => ({ 
                slug, 
                values: values && values.length === 1 ? values[0] : values,
                featured: attributeCategories[slug].featured
            }))
    ].filter(x => !!x);

    return {
        slug: product.slug,
        name: product.name,
        price: product.price,
        images: product.images,
        rating: product.rating,
        reviews: product.reviews,
        availability: product.availability && product.availability.slug,
        brand: product.brand && product.brand.slug,
        badges: product.bages && product.bages[0] && product.bages[0].slug,
        categories: product.categories ? product.categories.map(x => x.slug) : [],
        attributes: attributes,
    }
}


module.exports = {
    suggestions: ctx => {
        const { category, query, _limit } = ctx.query;

        return strapi.query('product').find({
            _limit: parseNumber(_limit, 10),
            'categories.slug_contains': category,
            'name_contains': query,
        }, DEPENDENCY);
    },

    pagination: async ctx => {
        const { page = 2, _limit = 2 } = ctx.query
        const total = await strapi.services.product.count();
        const pages = Math.ceil(total / _limit);
        const from = (page - 1) * _limit;
        const to = Math.max(Math.min(page * _limit, total), from);
        
        const query = {...ctx.query}
        delete query.page;
        delete query._limit;
        delete query._sort;

        const selectedProducts = await strapi.services.product.find({
            ...query,
            _limit: parseNumber(to, 12),
            _start: from,
        }, DEPENDENCY)
        return { products: selectedProducts.map(populate), total, pages, from, to};
    },

    popular: async ctx => {
        const { _limit, category } = ctx.query;

        return (await strapi.query('product').find({
            _limit: parseNumber(_limit, 10),
            _sort: 'rating:DESC',
            'categories.slug_contains': category,
        }, DEPENDENCY)).map(populate);
    },

    discounted: async ctx => {
        const { category, _limit } = ctx.query;

        return (await strapi.query('product').find({
            _limit: parseNumber(_limit, 10),
            'categories.slug_contains': category,
            'badges_eq': 'sale'
        }, DEPENDENCY)).map(populate);
    },
    related: async ctx => {
        const { _limit } = ctx.query;
        const product = await strapi.query('product').findOne({
            slug_eq: ctx.params.slug
        });

        const categories = product.categories.map(category => category.slug);

        return (await strapi.query('product').find({
            slug_ne: product.slug,
            _limit: parseNumber(_limit, 8),
            'categories.slug_in': categories,
        }, DEPENDENCY)).map(populate);
    },
    topRated: async ctx => {
        const { category, _limit } = ctx.query;

        return (await strapi.query('product').find({
            _limit: parseNumber(_limit, 10),
            _sort: 'rating:DESC',
            'categories.slug_contains': category,
        }, DEPENDENCY)).map(populate);
    },
    latest: async ctx => {
        console.log(ctx);
        const { category, _limit } = ctx.query;

        return (await strapi.query('product').find({
            _limit: parseNumber(_limit, 10),
            _sort: 'updated_at:DESC',
            'categories.slug_contains': category,
        }, DEPENDENCY)).map(populate);
    },
    featured: async ctx => {
        const { category, _limit } = ctx.query;

        return (await strapi.query('product').find({
            _limit: parseNumber(_limit, 10),
            'categories.slug_contains': category,
        }, DEPENDENCY)).map(populate);
    }
};
