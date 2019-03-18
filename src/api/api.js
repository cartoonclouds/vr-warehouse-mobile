
const _products = {
    '234334': {"id": 234334, barcode: '7056324419747',  "name": "Cards Against Humanity", "location": "CC-01-12", "SOH": 74, "stock_required": 3},
    '466564': {"id": 466564, barcode: '9780123456786', "name": "F*ck This Game", "location": "CC-12-07", "SOH": 145, "stock_required": 7},
    '2356754': {"id": 2356754, barcode: '97712344567003', "name": "Whatcha Meme", "location": "BA-09-02", "SOH": 302, "stock_required": 19},
};

const _products2 = {
    '2345255': {"id": 2345255, barcode: '1012345647890119',  "name": "Taboo", "location": "FE-21-12", "SOH": 74, "stock_required": 3},
    '2352345': {"id": 2352345, barcode: '231234344322', "name": "Books", "location": "CA-32-07", "SOH": 145, "stock_required": 7},
    '6667896': {"id": 6667896, barcode: '3441234124343', "name": "TableTop Game", "location": "DC-09302", "SOH": 302, "stock_required": 19},
};

const _products3 = {
    '64564545': {"id": 64564545, barcode: '235423452',  "name": "Scrabble", "location": "CC-01-23", "SOH": 74, "stock_required": 3},
    '45676323': {"id": 45676323, barcode: '23567452322', "name": "Cards", "location": "AE-12-45", "SOH": 145, "stock_required": 7},
    '23554543': {"id": 23554543, barcode: '344574674343', "name": "Dice", "location": "AA-76-02", "SOH": 302, "stock_required": 19},
};


export const _pickingOrders = {
    '244322': {id: 244322, store_id: 24422, products: _products, estimated_time: 9061000}, // 2 hours, 31 minutes and 1 seconds
    '345345': {id: 345345, store_id: 345345, products: _products2, estimated_time: 2411000}, // 40 minutes and 11 seconds
    '125345': {id: 125345, store_id: 23423, products: _products3, estimated_time: 8492000} // 2 hours, 21 minutes and 32 seconds
};



export const _stores = [
    {id: 24422, store_name: 'Chris Tudhope\'s Store', address: { state: 'SA', postcode: 5000 }, order_count: 2},
    {id: 345345, store_name: 'John\'s Store', address: { state: 'SA', postcode: 5000 }, order_count: 1},
    {id: 23423, store_name: 'Joe\'s Store', address: { state: 'SA', postcode: 5000 }, order_count: 5},
];

