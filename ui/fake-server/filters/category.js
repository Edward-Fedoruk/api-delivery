import {
    categoriesListData,
    categoriesTreeData,
    prepareCategory,
} from '../database/categories';
import AbstractFilterBuilder from './abstract';


export default class CategoryFilterBuilder extends AbstractFilterBuilder {
    value = null;

    items = [];

    // eslint-disable-next-line class-methods-use-this
    test() {
        return true;
    }

    makeItems(products, value) {
        this.value = value || null;

        const category = categoriesListData.find((x) => x.slug === value);

        if (category) {
            this.items = [prepareCategory(category, 1)];
        } else {
            this.items = categoriesTreeData.map((x) => prepareCategory(x));
        }
    }

    // eslint-disable-next-line class-methods-use-this
    calc() {}

    build() {
        return {
            type: 'category',
            slug: this.slug,
            name: this.name,
            items: this.items,
            value: this.value,
        };
    }
}
