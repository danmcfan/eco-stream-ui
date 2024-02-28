import PocketBase from 'pocketbase';
import { env } from '$env/dynamic/public';
import { writable } from 'svelte/store';

export const pb = new PocketBase(env.PUBLIC_POCKETBASE_URL);

export const loggedIn = writable(null);