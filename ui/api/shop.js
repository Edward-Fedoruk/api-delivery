/* eslint-disable arrow-body-style */
// eslint-disable-next-line no-unused-vars
import qs from 'query-string';
import { getCategories, getCategoryBySlug } from '../fake-server/endpoints/categories';
import {
    getDiscountedProducts,
    getFeaturedProducts,
    getLatestProducts,
    getPopularProducts,
    getProductBySlug,
    getProductsList,
    getRelatedProducts,
    getSuggestions, getTopRatedProducts,
} from '../fake-server/endpoints/products';

const shopApi = {
    /**
     * Returns array of categories.
     *
     * @param {object?} options
     * @param {number?} options.depth
     *
     * @return {Promise<Array<object>>}
     * shopApi.getCategories({ depth: 1 }).then((categories) => {})
     */
    getCategories: async (options = {}) => {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/categories.json?depth=2
         *
         * where:
         * - 2 = options.depth
         */
        // return fetch(`https://example.com/api/categories.json?${qs.stringify(options)}`)
        //     .then((response) => response.json());

        // This is for demonstration purposes only. Remove it and use the code above.
        return getCategories(options);
    },
    /**
     * Returns category by slug.
     *
     * @param {string} slug
     * @param {object?} options
     * @param {number?} options.depth
     *
     * @return {Promise<object>}
     * request = shopApi.getCategoryBySlug(categorySlug);
     */
    getCategoryBySlug: (slug, options = {}) => {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/categories/power-tools.json?depth=2
         *
         * where:
         * - power-tools = slug
         * - 2           = options.depth
         */
        // return fetch(`https://example.com/api/categories/${slug}.json?${qs.stringify(options)}`)
        //     .then((response) => response.json());

        // This is for demonstration purposes only. Remove it and use the code above.
        return getCategoryBySlug(slug, options);
    },
    /**
     * Returns product.
     *
     * @param {string} slug
     *
     * @return {Promise<object>}
     * shopApi.getProductBySlug(productSlug).then((product) => {}
     */
    getProductBySlug: (slug) => {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/products/screwdriver-a2017.json
         *
         * where:
         * - screwdriver-a2017 = slug
         */
        // return fetch(`https://example.com/api/products/${slug}.json`)
        //     .then((response) => response.json());

        // This is for demonstration purposes only. Remove it and use the code above.
        return getProductBySlug(slug);
    },
    /**
     * Returns array of related products.
     *
     * @param {string}  slug
     * @param {object?} options
     * @param {number?} options.limit
     *
     * @return {Promise<Array<object>>}
     * shopApi.getRelatedProducts(productSlug, { limit: 8 }).then((products) => {})
     */
    getRelatedProducts: (slug, options = {}) => {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/products/screwdriver-a2017/related.json&limit=3
         *
         * where:
         * - screwdriver-a2017 = slug
         * - limit             = options.limit
         */
        // return fetch(`https://example.com/api/products/${slug}/related.json?${qs.stringify(options)}`)
        //     .then((response) => response.json());

        // This is for demonstration purposes only. Remove it and use the code above.
        return getRelatedProducts(slug, options);
    },
    /**
     * Return products list.
     *
     * @param {object?} options
     * @param {number?} options.page
     * @param {number?} options.limit
     * @param {string?} options.sort
     * @param {Object.<string, string>?} filters
     *
     * @return {Promise<object>}
     * shopApi.getProductsList(state.options, { ...state.filters, category: categorySlug }, ).then((productsList) => {})
     */
    getProductsList: (options = {}, filters = {}) => {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/products.json?page=2&limit=12&sort=name_desc&filter_category=screwdriwers&filter_price=500-1000
         *
         * where:
         * - page            = options.page
         * - limit           = options.limit
         * - sort            = options.sort
         * - filter_category = filters.category
         * - filter_price    = filters.price
         */
        // const params = { ...options };
        //
        // Object.keys(filters).forEach((slug) => {
        //     params[`filter_${slug}`] = filters[slug];
        // });
        //
        // return fetch(`https://example.com/api/products.json?${qs.stringify(params)}`)
        //     .then((response) => response.json());

        // This is for demonstration purposes only. Remove it and use the code above.
        return getProductsList(options, filters);
    },
    /**
     * Returns array of featured products.
     *
     * @param {object?} options
     * @param {number?} options.limit
     * @param {string?} options.category
     *
     * @return {Promise<Array<object>>}
     */
    getFeaturedProducts: (options = {}) => {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/featured-products.json?limit=3&category=power-tools
         *
         * where:
         * - 3           = options.limit
         * - power-tools = options.category
         */
        // return fetch(`https://example.com/api/featured-products.json?${qs.stringify(options)}`)
        //     .then((response) => response.json());

        // This is for demonstration purposes only. Remove it and use the code above.
        return getFeaturedProducts(options);
    },
    /**
     * Returns array of latest products.
     *
     * @param {object?} options
     * @param {number?} options.limit
     * @param {string?} options.category
     *
     * @return {Promise<Array<object>>}
     * shopApi.getLatestProducts({ limit: 8, category: tab.categorySlug })
     */
    getLatestProducts: (options = {}) => {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/latest-products.json?limit=3&category=power-tools
         *
         * where:
         * - 3           = options.limit
         * - power-tools = options.category
         */
        // return fetch(`https://example.com/api/latest-products.json?${qs.stringify(options)}`)
        //     .then((response) => response.json());

        // This is for demonstration purposes only. Remove it and use the code above.
        return getLatestProducts(options);
    },
    /**
     * Returns an array of top rated products.
     *
     * @param {object?} options
     * @param {number?} options.limit
     * @param {string?} options.category
     *
     * @return {Promise<Array<object>>}
     * shopApi.getTopRatedProducts({ limit: 3 })
     */
    getTopRatedProducts: (options = {}) => {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/top-rated-products.json?limit=3&category=power-tools
         *
         * where:
         * - 3           = options.limit
         * - power-tools = options.category
         */
        // return fetch(`https://example.com/api/top-rated-products.json?${qs.stringify(options)}`)
        //     .then((response) => response.json());

        // This is for demonstration purposes only. Remove it and use the code above.
        return getTopRatedProducts(options);
    },
    /**
     * Returns an array of discounted products.
     *
     * @param {object?} options
     * @param {number?} options.limit
     * @param {string?} options.category
     *
     * @return {Promise<Array<object>>}
     * shopApi.getDiscountedProducts({ limit: 3 })
     */
    getDiscountedProducts: (options = {}) => {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/discounted-products.json?limit=3&category=power-tools
         *
         * where:
         * - 3           = options.limit
         * - power-tools = options.category
         */
        // return fetch(`https://example.com/api/discounted-products.json?${qs.stringify(options)}`)
        //     .then((response) => response.json());

        // This is for demonstration purposes only. Remove it and use the code above.
        return getDiscountedProducts(options);
    },
    /**
     * Returns an array of most popular products.
     *
     * @param {object?} options
     * @param {number?} options.limit
     * @param {string?} options.category
     *
     * @return {Promise<Array<object>>}
     * shopApi.getPopularProducts({ limit: 12, category: tab.categorySlug })
     */
    getPopularProducts: (options = {}) => {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/popular-products.json?limit=3&category=power-tools
         *
         * where:
         * - 3           = options.limit
         * - power-tools = options.category
         */
        // return fetch(`https://example.com/api/popular-products.json?${qs.stringify(options)}`)
        //     .then((response) => response.json());

        // This is for demonstration purposes only. Remove it and use the code above.
        return getPopularProducts(options);
    },
    /**
     * Returns search suggestions.
     *
     * @param {string}  query
     * @param {object?} options
     * @param {number?} options.limit
     * @param {string?} options.category
     *
     * @return {Promise<Array<object>>}
     * shopApi.getSuggestions(query, options).then((products) => {});
     */
    getSuggestions: (query, options = {}) => {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/search/suggestions.json?query=screwdriver&limit=5&category=power-tools
         *
         * where:
         * - query    = query
         * - limit    = options.limit
         * - category = options.category
         */
        // return fetch(`https://example.com/api/search/suggestions.json?${qs.stringify({ ...options, query })}`)
        //     .then((response) => response.json());

        // This is for demonstration purposes only. Remove it and use the code above.
        return getSuggestions(query, options);
    },
};

export default shopApi;
