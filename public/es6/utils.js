
const sum = (...ans) => {
    let a = 0;
    for (let i of ans) {
        a += i;
    }
    return a;
}
export { sum };