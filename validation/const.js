
const defaultPermissions = [
    {
        products: {
            create: true,
            read: true,
            update: true,
            delete: true
        },
        users: {
            create: true,
            read: true,
            update: true,
            delete: true
        }
    }
]


module.exports = { defaultPermissions }