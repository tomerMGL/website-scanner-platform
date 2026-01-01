import { v4 as uuidv4 } from "uuid";


export const sessions = new Map();

export function createSession(data) {
    const sessionId = uuidv4();
    storeSession(sessionId, data);
    return sessionId;
}
function storeSession(sessionId, data) {
 sessions.set(sessionId, data);
 setTimeout(() => sessions.delete(sessionId), 5 * 60 * 1000);
}

export function getSession(sessionId) {
 return sessions.get(sessionId);
}

export function deleteSession(sessionId) {
 sessions.delete(sessionId);
}