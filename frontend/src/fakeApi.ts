// fakeApi.ts
export function getProducts() {
return Promise.resolve([
    { id: 1, name: "Laptop" },
    { id: 2, name: "Phone" }
]);
}
