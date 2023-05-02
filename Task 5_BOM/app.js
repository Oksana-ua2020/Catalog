const root = document.getElementById('root');

const elements = {
    tweetItems: document.getElementById('tweetItems'),
    modifyItem: document.getElementById('modifyItem'),
    modifyItemHeader: document.getElementById('modifyItemHeader'),
    addTweetButton: document.getElementsByClassName('addTweet')[0],
    cancelModification: document.getElementById('cancelModification'),
    saveModifiedItem: document.getElementById('saveModifiedItem'),
    modifyItemInput: document.getElementById('modifyItemInput'),
    list: document.getElementById('list')
}

const mainPageHash = ''
const addPageHash = '#/add'
const editPageHash = '#/edit/:'
const likedPageHash = '#/liked'
const storageKey = 'payload'

const getStorage = () => JSON.parse(localStorage.getItem(storageKey)) || {
    latestId: 0,
    tweetList: []
}

const setStorage = (payload) => localStorage.setItem(storageKey, JSON.stringify(payload));

const putTweetToStorage = (tweet) => {
    const prevPayload = getStorage()
    const {
        latestId,
        tweetList
    } = prevPayload;
    const isTweetTextExist = !!tweetList.find((storedTweet) => storedTweet.text === tweet.text)
    const isTweetTextEmpty = !tweet.text.length
    if (isTweetTextExist || isTweetTextEmpty) {
        return false
    }
    const tweetId = latestId + 1;
    tweet.id = tweetId;
    tweetList.push(tweet)
    const nextPayload = {
        latestId: tweetId,
        tweetList
    }
    setStorage(nextPayload);
    return true
}

const modifyTweetInStorage = (tweet) => {
    const {
        id,
        text,
        isLiked
    } = tweet
    const prevPayload = getStorage()
    const {
        latestId,
        tweetList
    } = prevPayload;

    const nextTweetList = tweetList.map((tweet) => {
        return tweet.id === id ? {
                id,
                text,
                isLiked
            } :
            tweet
    })
    const nextPayload = {
        latestId,
        tweetList: nextTweetList
    }
    setStorage(nextPayload);
}

const getTweetFromStorage = (tweetID) => {
    const prevPayload = getStorage()
    const {
        tweetList = []
    } = prevPayload
    const nextList = tweetList.filter((tweet) => tweet.id === +tweetID)
    return nextList[0] || {}
}

const removeTwitFromStorage = (tweetID) => {
    const prevPayload = getStorage()
    const {
        latestId,
        tweetList = []
    } = prevPayload
    const nextList = tweetList.filter((tweet) => tweet.id !== tweetID)
    const nextPayload = {
        latestId,
        tweetList: nextList
    }
    setStorage(nextPayload);
}

const renderErrorMessage = () => {
    const errorElement = document.createElement('div');
    errorElement.innerText = `Error! You can't tweet about that`;
    errorElement.className = 'error';
    const removeTime = 2000;
    elements.modifyItem.append(errorElement)
    setTimeout(() => {
        errorElement.remove()
    }, removeTime)
}

const renderLikeMessage = (tweet) => {
    const {
        id,
        isLiked
    } = tweet
    const likeMessageElement = document.createElement('div');
    const likeMessage = isLiked ?
        `Hooray! You liked tweet with id ${id}!` :
        `Sorry you no longer like tweet with id ${id}`
    likeMessageElement.innerText = likeMessage;
    likeMessageElement.className = 'error';
    const removeTime = 2000;
    elements.tweetItems.append(likeMessageElement)
    setTimeout(() => {
        likeMessageElement.remove()
    }, removeTime)
}

const renderMainPage = () => {
    const {
        tweetItems,
        modifyItem,
        list
    } = elements
    tweetItems.className = ''
    list.innerHTML = ''
    modifyItem.className = 'hidden'

    const {
        tweetList = []
    } = getStorage()
    tweetList.forEach(tweet => list.append(renderTweet(tweet)))
    // const tweetElement = renderTweet(idSave, modifyItemInput.value)
    // list.append(tweetElement);
}

const renderAddPage = (tweetId) => {
    const {
        tweetItems,
        modifyItem,
        modifyItemHeader,
        saveModifiedItem,
        modifyItemInput,
        cancelModification
    } = elements
    const tweet = getTweetFromStorage(tweetId)
    const {
        id,
        text
    } = tweet
    tweetItems.className = 'hidden'
    modifyItemInput.maxLength = '140';
    modifyItem.className = ''
    modifyItemHeader.innerText = id ? 'Edit tweet' : 'Add tweet';
    modifyItemInput.value = text || '';

    const saveModifiedItemEvent = () => {
        const tweet = {
            text: modifyItemInput.value,
            isLiked: false
        }
        const shouldThrowError = !putTweetToStorage(tweet);
        if (shouldThrowError) {
            renderErrorMessage()
            return
        }
        modifyItemInput.value = '';
        location.hash = mainPageHash
        saveModifiedItem.removeEventListener('click', saveModifiedItemEvent)
    }

    const cancelModificationEvent = () => {
        location.hash = mainPageHash
        modifyItemInput.value = '';
        cancelModification.removeEventListener('click', cancelModificationEvent)
        saveModifiedItem.removeEventListener('click', saveModifiedItemEvent)
    }
    cancelModification.addEventListener('click', cancelModificationEvent)

    saveModifiedItem.addEventListener('click', saveModifiedItemEvent);
}

const renderEditPage = () => {
    const {
        tweetItems,
        modifyItem,
        modifyItemHeader
    } = elements
    tweetItems.className = 'hidden'
    modifyItem.className = ''
    modifyItemHeader.innerText = 'Edit tweet'
}

// const renderLikedPage = () => {

// }

const renderTweet = (tweet) => {
    const {
        id,
        text,
        isLiked
    } = tweet
    const tweetElement = document.createElement('li');
    const tweetText = document.createElement('div');
    const tweetButtonsBlock = document.createElement('div')
    const tweetRemoveButton = document.createElement('button');
    const tweetLikeButton = document.createElement('button');

    tweetElement.id = id;
    tweetElement.className = 'tweet w-500';
    tweetText.innerText = text;
    tweetText.className = 'tweet-text'
    tweetButtonsBlock.className = 'tweet w-170';
    tweetRemoveButton.className = 'w-button';
    tweetRemoveButton.innerText = 'remove';
    tweetLikeButton.className = 'w-button';
    tweetLikeButton.innerText = isLiked ? 'unlike' : 'like';

    const removeButtonEvent = () => {
        removeTwitFromStorage(id);
        tweetElement.remove();
    }

    const likeButtonEvent = () => {
        const likedTweet = {
            id,
            text,
            isLiked: !isLiked
        }
        modifyTweetInStorage(likedTweet)
        renderLikeMessage(likedTweet)
        tweetElement.replaceWith(renderTweet(likedTweet))
    }

    const tweetTextClickEvent = () => {
        location.hash = editPageHash + id;
    }

    tweetRemoveButton.addEventListener('click', removeButtonEvent);
    tweetLikeButton.addEventListener('click', likeButtonEvent);
    tweetText.addEventListener('click', tweetTextClickEvent);
    tweetElement.append(tweetText, tweetButtonsBlock);
    tweetButtonsBlock.append(tweetRemoveButton, tweetLikeButton);
    return tweetElement
}

const routes = {
    [mainPageHash]: renderMainPage,
    [addPageHash]: renderAddPage,
    [editPageHash]: renderAddPage
    // [likedPageHash]: renderLikedPage
}

elements.addTweetButton.addEventListener('click', () => {
    location.hash = addPageHash;
})

const getLocationHash = (hash) => {
    const splitedHash = hash.split(':');
    const locationHash = splitedHash[0];
    const resultHash = locationHash === `#/edit/` ? editPageHash : locationHash
    const id = splitedHash[1];
    routes[resultHash](id);
}

window.addEventListener('popstate', () => {
    getLocationHash(location.hash)
});

getLocationHash(location.hash)