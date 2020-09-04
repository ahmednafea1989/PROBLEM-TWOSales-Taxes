var input = [
    '1 Book at 12.49',
    '1 Book at 12.49',
    '1 Music CD at 14.99',
    '1 Chocolate bar at 0.85'
];



function getReceipt(basket){

    var items = {};

    for(var i = 0; i<basket.length; i++){
        var currentItem = basket[i];
        var temp = currentItem.split(' ');

        var itemName = extractItemName(currentItem);

        // assume that item name is one word
        var item = {
            quantity: parseInt(temp[0]), // converting the quantity to a number
            itemName: itemName,
            itemPrice: temp[temp.length-1],
            isImported: currentItem.indexOf('Imported') !== -1,
            isSalesTaxExempt: isSalesTaxExempt(itemName)
        }
        if(items[itemName] !== undefined) {
            // if item is already added, increase its quantity
            items[itemName].quantity += item.quantity;
        } else {
            items[itemName] = item;
        }
    }

    var results = printReceipt(items);

    return results;

}

function extractItemName(basketItem) {
    var temp = basketItem.split(' ');

    var itemName = '';

    for(var i = 1; i<temp.length-2; i++) {
        itemName += temp[i] + ' ';
    }

    return itemName.trim();
}


/*
    Assume the store has a list of all item names that tax exempt
    @Input itemName string describing the item
    @output boolean if true, it means this item is sales tax free
*/
function isSalesTaxExempt(itemName) {

    var exemptItemNames = {
        'chocolate bar': true,
        'book': true,
        'imported box of chocolates': true,
        'packet of headache pills': true
    }

    return exemptItemNames[itemName.toLocaleLowerCase()] !== undefined;
}


function printReceipt(basketItems){
    var results = [];
    var basketItemValues = Object.values(basketItems);
    var totalSalesTax = 0;
    var totalSalesPricePreTax = 0;
    var itemDesc="";
    for(var i = 0; i< basketItemValues.length; i++) {

        var currentItem = basketItemValues[i];
        var itemPriceAfterTax = getItemAfterTaxes(currentItem);
        var totalItemPriceAfterTax = itemPriceAfterTax * currentItem.quantity;
        console.log('ahmad', currentItem);
        totalSalesTax += currentItem.itemPrice * currentItem.tax;
        totalSalesPricePreTax+= currentItem.itemPrice * currentItem.quantity;
        if (currentItem.quantity>1){
            itemDesc = currentItem.itemName+': ' + totalItemPriceAfterTax + "(" + currentItem.quantity + "@" + currentItem.itemPrice + ")";


         }else {
              itemDesc = currentItem.itemName+': ' + totalItemPriceAfterTax;

         }

        
        results.push(itemDesc);
    }

    results.push('Sales Taxes: ' + totalSalesTax);
    results.push('Total: ' + (totalSalesTax + totalSalesPricePreTax).toFixed(2));

    return results;
}

function getItemAfterTaxes(item) {
    var salesPrice = item.itemPrice;
    item.tax = 0;
    if(item.isImported && !item.isSalesTaxExempt) {
        item.tax = 0.15;
        salesPrice *= 1.15;
    } else if (item.isImported && item.isSalesTaxExempt){
        item.tax = 0.05;
        salesPrice *= 1.05;
    } else if (!item.isImported && !item.isSalesTaxExempt){
        item.tax = 0.1;
        salesPrice *= 1.1;
    }
    return salesPrice;
}


// 1. round to nearest 5 cents
// 2. show quantity
// 3. Convert everything to Typescript

console.log(getReceipt(input));