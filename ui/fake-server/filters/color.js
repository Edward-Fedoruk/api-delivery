import AbstractFilterBuilder from './abstract';
import productsData from '../database/products';

const colors = [
    { slug: 'white', color: '#fff' },
    { slug: 'silver', color: '#d9d9d9' },
    { slug: 'light-gray', color: '#b3b3b3' },
    { slug: 'gray', color: '#808080' },
    { slug: 'dark-gray', color: '#666' },
    { slug: 'coal', color: '#4d4d4d' },
    { slug: 'black', color: '#262626' },
    { slug: 'red', color: '#ff4040' },
    { slug: 'orange', color: '#ff8126' },
    { slug: 'yellow', color: '#ffd333' },
    { slug: 'pear-green', color: '#becc1f' },
    { slug: 'green', color: '#8fcc14' },
    { slug: 'emerald', color: '#47cc5e' },
    { slug: 'shamrock', color: '#47cca0' },
    { slug: 'shakespeare', color: '#47cccc' },
    { slug: 'blue', color: '#40bfff' },
    { slug: 'dark-blue', color: '#3d6dcc' },
    { slug: 'violet', color: '#7766cc' },
    { slug: 'purple', color: '#b852cc' },
    { slug: 'cerise', color: '#e53981' },
];

export default class ColorFilterBuilder extends AbstractFilterBuilder {
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
                (isMatched, filter) => isMatched && (filter === this || filter.test(product)),
                true,
            ),
        );

        this.items = this.items.map((item) => {
            const count = products.reduce((acc, product) => {
                const match = this.extractItems(product).map((x) => x.slug).includes(item.slug);

                return acc + (match ? 1 : 0);
            }, 0);

            return { ...item, count };
        }).sort((a, b) => (
            colors.findIndex((x) => x.slug === a.slug) - colors.findIndex((x) => x.slug === b.slug)
        ));
    }

    build() {
        return {
            type: 'color',
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
        const attribute = product.attributes.find((x) => x.slug === this.slug);

        if (!attribute) {
            return [];
        }

        return attribute.values.map((value) => ({
            slug: value.slug,
            name: value.name,
            color: this.getColorCode(value.slug),
            count: 0,
        }));
    }

    // eslint-disable-next-line class-methods-use-this
    getColorCode(slug) {
        const result = colors.find((x) => x.slug === slug);

        return result ? result.color : '#000';
    }
}
