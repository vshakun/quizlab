export interface IFixedFlattenedStore {
    users: {
        [uuid: string]: string
    };
    currentUserUUID: string | null;
    subscriptions: {
        [uuid: string]: string
    };
    postAuthors: {
        [uuid: string]: string
    };
    postTexts: {
        [uuid: string]: string
    };
    postLiked: {
        [uuid: string]: string
    };
    postTimeStamps: {
        [uuid: string]: number
    }
}

export const fixedFlattenedStoreExample: IFixedFlattenedStore = {
    users: {
        '9101fd32-f2d5-484e-9109-ad19318f3d04': 'Kate',
        '34c4f8c8-43e1-41b6-9569-5b357dd5237b': 'John',
        '0d53548d-2331-4de2-947c-a6ce126b4591': 'Lola',
        'cb0151d2-c30a-4e11-a56a-96ac54be64ed': 'Helen',
        'bb4862a9-6951-474b-825b-ee092af6c466': 'Bob',
    },
    currentUserUUID: 'bb4862a9-6951-474b-825b-ee092af6c466',
    subscriptions: {
        '9101fd32-f2d5-484e-9109-ad19318f3d04': '',
        '34c4f8c8-43e1-41b6-9569-5b357dd5237b': '',
        '0d53548d-2331-4de2-947c-a6ce126b4591':
            'cb0151d2-c30a-4e11-a56a-96ac54be64ed:bb4862a9-6951-474b-825b-ee092af6c466',
        'cb0151d2-c30a-4e11-a56a-96ac54be64ed': '',
        'bb4862a9-6951-474b-825b-ee092af6c466': '',
    },
    postAuthors: {
        '1ef764cf-726c-45d2-927d-b888a0255169': '9101fd32-f2d5-484e-9109-ad19318f3d04',
        '78de02ef-babc-4408-ab36-5266e3a79f1d': '34c4f8c8-43e1-41b6-9569-5b357dd5237b',
        'd304ee44-d2dd-4c7f-a994-f4e6a8922a45': '0d53548d-2331-4de2-947c-a6ce126b4591',
    },
    postTexts: {
        '1ef764cf-726c-45d2-927d-b888a0255169': 'Hello',
        '78de02ef-babc-4408-ab36-5266e3a79f1d': 'Guten Tag',
        'd304ee44-d2dd-4c7f-a994-f4e6a8922a45': 'Chao',
    },
    postLiked: {
        '1ef764cf-726c-45d2-927d-b888a0255169':
            '9101fd32-f2d5-484e-9109-ad19318f3d04:0d53548d-2331-4de2-947c-a6ce126b4591',
        '78de02ef-babc-4408-ab36-5266e3a79f1d':
            '0d53548d-2331-4de2-947c-a6ce126b4591:cb0151d2-c30a-4e11-a56a-96ac54be64ed',
        'd304ee44-d2dd-4c7f-a994-f4e6a8922a45': ''
    },
    postTimeStamps: {
        '1ef764cf-726c-45d2-927d-b888a0255169': 1612820896199,
        '78de02ef-babc-4408-ab36-5266e3a79f1d': 1612821234430,
        'd304ee44-d2dd-4c7f-a994-f4e6a8922a45': 1612830431830
    }
}
