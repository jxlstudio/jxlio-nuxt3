export default function () {
    if (process.env.NODE_ENV === 'development') {
        return 'development'
    } else {
        return 'production'
    }
}