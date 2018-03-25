const raffleElements = (flashCardsIds = [], raffleAmount = 0) => {

    if (flashCardsIds === [] || raffleAmount === 0)
        return [];

    const flashCardsIdsToRemove = [...flashCardsIds];
    const listLength = flashCardsIds.length;
    const raffledFlashCards = [];

    let itemsRaffled = 0;
    while (raffleAmount > itemsRaffled && listLength > itemsRaffled) {
        let raffledItem = findAndRemoveRandomElement(flashCardsIdsToRemove);
        raffledFlashCards.push(raffledItem);
        itemsRaffled += 1;
    }

    return raffledFlashCards;

}

const findAndRemoveRandomElement = (array) => {
    const randomPosition = Math.floor(Math.random() * array.length);
    const randomElement = array[randomPosition];
    array.splice(randomPosition, 1);
    return randomElement;
}

module.exports = {
    raffleElements
};