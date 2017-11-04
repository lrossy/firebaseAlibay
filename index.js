const assert = require('assert');

/*
Before implementing the login functionality, use this function to generate a new UID every time.
It will decrease your iteration time.
*/
function genUID() {
    return Math.floor(Math.random() * 100000000)
}

/* No global state. Everything is done through firebase */

/*
initializeUserIfNeeded adds the UID to our database unless it's already there
parameter: [uid] the UID of the user.
returns: A promise
*/
function initializeUserIfNeeded(uid) {
}

/* 
createListing adds a new listing to our global state.
    parameters: 
      [sellerID] The ID of the seller
      [price] The price of the item
      [blurb] A blurb describing the item
    returns: A promise containing the ID of the new listing
*/
function createListing(sellerID, price, blurb) {
    let r = database.ref('listings/').push(); // create a new firebase reference
    let p = r.set({/* the price and blurb properties */ });
    return new Promise(resolve => p.then(() => resolve(r.key)));
}

/* 
getItemDescription returns the description of a listing
    parameter: [listingID] The ID of the listing
    returns: A promise that contains an object containing the price and blurb properties.
*/
function getItemDescription(listingID) {

}

/* 
buy changes the global state.
Another buyer will not be able to purchase that listing
The listing will no longer appear in search results
The buyer will see the listing in his history of purchases
The seller will see the listing in his history of items sold
    parameters: 
     [buyerID] The ID of buyer
     [sellerID] The ID of seller
     [listingID] The ID of listing
    returns: a promise
*/
function buy(buyerID, sellerID, listingID) {

}


/* 
allItemsSold returns the IDs of all the items sold by a seller
    parameter: [sellerID] The ID of the seller
    returns: a promise containing an array of listing IDs
*/
function allItemsSold(sellerID) {

}

/*
allItemsBought returns the IDs of all the items bought by a buyer
    parameter: [buyerID] The ID of the buyer
    returns: a promise containing an array of listing IDs
*/
function allItemsBought(buyerID) {

}

/*
allListings returns the IDs of all the listings currently on the market
Once an item is sold, it will not be returned by allListings
    returns: a promise containing an array of listing IDs
*/
function allListings() {

}

/*
searchForListings returns the IDs of all the listings currently on the market
Once an item is sold, it will not be returned by searchForListings
    parameter: [searchTerm] The search string matching listing descriptions
    returns: a promise containing an array of listing IDs
*/
function searchForListings(searchTerm) {

}


// The tests
async function test() {
    let sellerID = genUID();
    let buyerID = genUID();
    await initializeUserIfNeeded(sellerID)
    await initializeUserIfNeeded(buyerID)
    let listing1ID = await createListing(sellerID, 500000, "A very nice boat")
    let listing2ID = await createListing(sellerID, 1000, "Faux fur gloves")
    let listing3ID = await createListing(sellerID, 100, "Running shoes")
    let product2Description = await getItemDescription(listing2ID)

    await buy(buyerID, sellerID, listing2ID)
    await buy(buyerID, sellerID, listing3ID)

    let allSold = await allItemsSold(sellerID)
    let soldDescriptions = await allSold.map(getItemDescription)

    let allBought = await allItemsBought(buyerID)
    let allBoughtDescriptions = await allBought.map(getItemDescription)

    let listings = await allListings()
    let boatListings = await searchForListings("boat")
    let shoeListings = await searchForListings("shoes")

    let boatDescription = await getItemDescription(listings[0])
    let boatBlurb = boatDescription.blurb;
    let boatPrice = boatDescription.price;

    assert(allSold.length == 2); // The seller has sold 2 items
    assert(allBought.length == 2); // The buyer has bought 2 items
    assert(listings.length == 1); // Only the boat is still on sale
    assert(boatListings.length == 1); // The boat hasn't been sold yet
    assert(shoeListings.length == 0); // The shoes have been sold
    assert(boatBlurb == "A very nice boat");
    assert(boatPrice == 500000);
}
