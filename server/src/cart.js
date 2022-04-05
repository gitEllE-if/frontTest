let add = (cart, req) => {
    cart.push(req.body);
    return JSON.stringify(cart, null, 4);
};
let change = (cart, req) => {
    const idx = cart.findIndex(item => item.id === req.params.id);
    if (idx !== -1) {
        cart[idx].amount += req.body.amount;
    }
    return JSON.stringify(cart, null, 4);
};
let del = (cart, req) => {
    const idx = cart.findIndex(item => item.id === req.params.id);
    if (idx !== -1) {
        if (cart[idx].amount > 1) {
            cart[idx].amount -= 1;
        }
        else if (cart[idx].amount === 1) {
            cart.splice(idx, 1);
        }
    }
    return JSON.stringify(cart, null, 4);
};

module.exports = {
    add,
    change,
    del
};