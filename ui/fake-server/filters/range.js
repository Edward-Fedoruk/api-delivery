import AbstractFilterBuilder from './abstract';
import productsData from '../database/products';

export default class RadioFilterBuilder extends AbstractFilterBuilder {
    items = [];

    value = null;

    test(product) {
        return this.extractItems(product).map((x) => x.slug).includes(this.value);
    }

    makeItems(products, value) {
        products.forEach((product) => this.extractItems(product).forEach((item) => {
            if (!this.items.find((x) => x.slug === item.slug)) {
                this.items.push(item);
            }
        }));

        this.value = value || this.items[0].slug;
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
        });
    }

    build() {
        return {
            type: 'radio',
            slug: this.slug,
            name: this.name,
            items: this.items,
            value: this.value,
        };
    }

    extractItems(product) {
        if (this.slug === 'discount') {
            const items = [
                { slug: 'any', name: 'Any', count: 0 },
            ];

            if (product.compareAtPrice) {
                items.push({ slug: 'yes', name: 'Yes', count: 0 });
            } else {
                items.push({ slug: 'no', name: 'No', count: 0 });
            }

            return items;
        }

        throw Error();
    }
}
