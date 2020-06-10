export default class AbstractFilterBuilder {
    slug;

    name;

    constructor(slug, name) {
        this.slug = slug;
        this.name = name;
    }

    // eslint-disable-next-line no-unused-vars,class-methods-use-this
    test(product) {}

    // eslint-disable-next-line no-unused-vars,class-methods-use-this
    makeItems(products, value) {}

    // eslint-disable-next-line no-unused-vars,class-methods-use-this
    calc(filters) {}

    // eslint-disable-next-line class-methods-use-this
    build() {}
}
