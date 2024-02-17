import { writable, derived } from 'svelte/store';
import type { Writable } from 'svelte/store';

/** Store for your data. 
This assumes the data you're pulling back will be an array.
If it's going to be an object, default this to an empty object.
**/

// Add type for the data
export type User = {
    id: string;
    username: string;
};

export const users: Writable<User[]> = writable([]);

/** Data transformation.
For our use case, we only care about the drink names, not the other information.
Here, we'll create a derived store to hold the drink names.
**/
export const IDs = derived(users, ($users) => {
    if ($users) {
        return $users.map(user => user.id);
    }
    return [];
});