export function makeIdGenerator() {
    let lastId = 0;

    return () => {
        lastId += 1;

        return lastId;
    };
}

export function nameToSlug(name) {
    return name.toLowerCase().replace(/[^a-z0-9]/, '-').replace(/-+/, '-');
}
