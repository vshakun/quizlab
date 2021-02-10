interface IUser {
    name: string,
}

interface IPost {
    author: string,
    text: string,
    timeStamp: number
}

interface ILike {
    what: string,
    who: string,
}

interface ISubscription {
    who: string,
    whom: string,
}

export interface StoreDesign {
    users: {
        [key: string]: IUser;
    };
    currentUserUUID: string | null; // string if logged in, null otherwise
    posts: {
        [key: string]: IPost;
    };
    likes: {
        [key: string]: ILike;
    }
    subscriptions: {
        [key: string]: ISubscription;
    }
}

export const storeDesign4Example: StoreDesign = {
    users: {
        '9101fd32-f2d5-484e-9109-ad19318f3d04': {
            name: 'Kate',
        },
        '34c4f8c8-43e1-41b6-9569-5b357dd5237b': {
            name: 'John',
        },
        '0d53548d-2331-4de2-947c-a6ce126b4591': {
            name: 'Lola',
        },
        'cb0151d2-c30a-4e11-a56a-96ac54be64ed': {
            name: 'Helen',
        },
        'bb4862a9-6951-474b-825b-ee092af6c466': {
            name: 'Bob',
        }
    },
    subscriptions: {
        'd9666998-d154-4b13-a40c-80dbfcbb51e5': {
            who: '0d53548d-2331-4de2-947c-a6ce126b4591',
            whom: 'cb0151d2-c30a-4e11-a56a-96ac54be64ed'
        }
    },
    currentUserUUID: '0d53548d-2331-4de2-947c-a6ce126b4591',
    likes: {
        'e9cde2d7-598e-49c8-83ad-df57ad21da81': {
            what: '1ef764cf-726c-45d2-927d-b888a0255169',
            who: '9101fd32-f2d5-484e-9109-ad19318f3d04',
        },
        'b0557f25-3015-4dc1-92f1-1d445e9a3d22': {
            what: '1ef764cf-726c-45d2-927d-b888a0255169',
            who: '0d53548d-2331-4de2-947c-a6ce126b4591',
        },
        '92b8c0eb-b484-4fba-b239-3622784c0ce8': {
            what: '78de02ef-babc-4408-ab36-5266e3a79f1d',
            who: '0d53548d-2331-4de2-947c-a6ce126b4591',
        },
        '96e10e8c-761a-43a6-8c87-8d20d803e0fe': {
            what: '78de02ef-babc-4408-ab36-5266e3a79f1d',
            who: 'cb0151d2-c30a-4e11-a56a-96ac54be64ed',
        },

    },
    posts: {
        '1ef764cf-726c-45d2-927d-b888a0255169': {
            author: '9101fd32-f2d5-484e-9109-ad19318f3d04',
            text: 'Hello',
            timeStamp: 1612820896199
        },
        '78de02ef-babc-4408-ab36-5266e3a79f1d': {
            author: '34c4f8c8-43e1-41b6-9569-5b357dd5237b',
            text: 'Guten Tag',
            timeStamp: 1612821234430
        },
        'fd1b6836-cb0f-4e82-93d9-fb30bbd15e1f': {
            author: '0d53548d-2331-4de2-947c-a6ce126b4591',
            text: 'Ciao',
            timeStamp: 1612909764268
        }
    }
}
