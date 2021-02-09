export interface IMoreFlattenedStore {
    [key: string]: Array<string> | string | number | null
}

export const moreFlattenedStoreExample: IMoreFlattenedStore = {
    'users:9101fd32-f2d5-484e-9109-ad19318f3d04': 'Kate',
    'users:34c4f8c8-43e1-41b6-9569-5b357dd5237b': 'John',
    'users:0d53548d-2331-4de2-947c-a6ce126b4591': 'Lola',
    'users:cb0151d2-c30a-4e11-a56a-96ac54be64ed': 'Helen',
    'users:bb4862a9-6951-474b-825b-ee092af6c466': 'Bob',
    'currentUserUUID': 'bb4862a9-6951-474b-825b-ee092af6c466',
    'subscriptions:9101fd32-f2d5-484e-9109-ad19318f3d04': [],
    'subscriptions:34c4f8c8-43e1-41b6-9569-5b357dd5237b': [],
    'subscriptions:0d53548d-2331-4de2-947c-a6ce126b4591': ['cb0151d2-c30a-4e11-a56a-96ac54be64ed'],
    'subscriptions:cb0151d2-c30a-4e11-a56a-96ac54be64ed': [],
    'subscriptions:bb4862a9-6951-474b-825b-ee092af6c466': [],
    'postAuthors:1ef764cf-726c-45d2-927d-b888a0255169': '9101fd32-f2d5-484e-9109-ad19318f3d04',
    'postAuthors:78de02ef-babc-4408-ab36-5266e3a79f1d': '34c4f8c8-43e1-41b6-9569-5b357dd5237b',
    'postAuthors:d304ee44-d2dd-4c7f-a994-f4e6a8922a45': '0d53548d-2331-4de2-947c-a6ce126b4591',
    'postTexts:1ef764cf-726c-45d2-927d-b888a0255169': 'Hello',
    'postTexts:78de02ef-babc-4408-ab36-5266e3a79f1d': 'Guten Tag',
    'postTexts:d304ee44-d2dd-4c7f-a994-f4e6a8922a45': 'Chao',
    'postLiked:1ef764cf-726c-45d2-927d-b888a0255169': [
        '9101fd32-f2d5-484e-9109-ad19318f3d04',
        '0d53548d-2331-4de2-947c-a6ce126b4591'
    ],
    'postLiked:78de02ef-babc-4408-ab36-5266e3a79f1d': [
        '0d53548d-2331-4de2-947c-a6ce126b4591',
        'cb0151d2-c30a-4e11-a56a-96ac54be64ed'
    ],
    'postLiked:d304ee44-d2dd-4c7f-a994-f4e6a8922a45': [],
    'postTimeStamps:1ef764cf-726c-45d2-927d-b888a0255169': 1612820896199,
    'postTimeStamps:78de02ef-babc-4408-ab36-5266e3a79f1d': 1612821234430,
    'postTimeStamps:d304ee44-d2dd-4c7f-a994-f4e6a8922a45': 1612830431830
}
