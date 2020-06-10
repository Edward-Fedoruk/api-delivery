import { categoriesTreeData, categoriesListData, prepareCategory } from '../database/categories';

export function getCategories(options = {}) {
    return Promise.resolve(
        categoriesTreeData.map((x) => prepareCategory(x, options.depth)),
    );
}

export function getCategoryBySlug(slug, options = {}) {
    const category = categoriesListData.find((x) => x.slug === slug);

    return category ? Promise.resolve(prepareCategory(category, options.depth)) : Promise.reject();
}
