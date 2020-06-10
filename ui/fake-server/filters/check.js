import AbstractFilterBuilder from './abstract';
import productsData from '../database/products';


export default class CheckFilterBuilder extends AbstractFilterBuilder {
    items = [];

    value = [];

    test(product) {
        if (this.value.length === 0) {
            return true;
        }

        return this.value.reduce((result, value) => (
            result || this.extractItems(product).map((x) => x.slug).includes(value)
        ), false);
    }

    makeItems(products, value) {
        products.forEach((product) => this.extractItems(product).forEach((item) => {
            if (!this.items.find((x) => x.slug === item.slug)) {
                this.items.push(item);
            }
        }));

        this.value = this.parseValue(value);
    }

    calc(filters) {
        const products = productsData.filter(
            (product) => filters.reduce(
                (isMatched, filter) => (
                    isMatched && (filter === this || filter.test(product))
                ),
                true,
            ),
        );

        this.items = this.items.map((item) => {
            const count = products.reduce((acc, product) => (
                acc + (this.extractItems(product).map((x) => x.slug).includes(item.slug) ? 1 : 0)
            ), 0);

            return { ...item, count };
        });
    }

    build() {
        return {
            type: 'check',
            slug: this.slug,
            name: this.name,
            items: this.items,
            value: this.value,
        };
    }

    // eslint-disable-next-line class-methods-use-this
    parseValue(value) {
        return value ? value.split(',') : [];
    }

    extractItems(product) {
        if (this.slug === 'brand') {
            return product.brand ? [{
                slug: product.brand.slug,
                name: product.brand.name,
                count: 0,
            }] : null;
        }

        throw Error();
    }
}
